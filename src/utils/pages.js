import { basename, dirname, extname, join } from 'path';
import { globby } from 'globby';
import { getTitleFromHtml } from './getTitleFromHtml';
import { readFile } from 'fs/promises';
import remarked from 'remarked';
import keyFileStorage from 'key-file-storage';
import { ensureCache, fetchTranslations } from '../rehype/translate';

const kfs = keyFileStorage('./.cache/rehype-translate/', false);

const PAGES_PREFIX = 'src/pages/';
const EXTENSION_PATTERN = '.{md,mdx}';
const PAGES_PATTERN = join(PAGES_PREFIX, `**/*${EXTENSION_PATTERN}`);

export const pathToURI = (path) => {
    path = path.replace(PAGES_PREFIX, '');
    const base = basename(path, extname(path));
    const dir = dirname(path);
    return base === 'index' ? dir : join(dir, base);
};

export const getPageByParams = async (params, locale) => {
    const { uri } = params;
    const base = join(PAGES_PREFIX, uri.join('/'));
    let patterns = [base + EXTENSION_PATTERN, join(base, '/index' + EXTENSION_PATTERN)];

    if (locale && locale !== 'en') {
        patterns = [
            base + `.${locale}` + EXTENSION_PATTERN,
            join(base, `/index.${locale}` + EXTENSION_PATTERN),
            ...patterns,
        ];
    }
    const paths = await globby(patterns);

    if (!paths.length) {
        throw new Error(`No matching pages found for: '${base}' 😢`);
    }

    return paths[0];
};

export const getPagePaths = (locale) =>
    globby(locale ? [join(PAGES_PREFIX, `**/*.${locale}.${EXTENSION_PATTERN}`), PAGES_PATTERN] : [PAGES_PATTERN]);

export const isPageLocalized = (path) => /\.[a-z]{2}.mdx?$/.test(path);

export const getPageTitles = async (locale) => {
    const shouldTranslate = locale && locale !== 'en';
    if (shouldTranslate) {
        ensureCache(locale);
    }
    const paths = await getPagePaths(locale);
    const titles = {};
    const untranslatedPages = [];
    await Promise.all(
        paths.map(async (path) => {
            const uri = join('/', pathToURI(path));
            if (shouldTranslate) {
                // check for localized version of this page and use it instead
                const localizedPath = join(dirname(path), `${basename(path, extname(path))}.${locale}${extname(path)}`);
                if (paths.includes(localizedPath)) {
                    path = localizedPath;
                } else {
                    untranslatedPages.push([uri, path]);
                }
            }
            const source = await readFile(path, { encoding: 'utf-8' });
            const title = getTitleFromHtml(remarked(source));
            titles[uri] = title;
        })
    );

    if (shouldTranslate) {
        const uncachedTitles = [];
        for (const [uri, path] of untranslatedPages) {
            const title = titles[uri];
            if (!(title in kfs[locale])) {
                uncachedTitles.push([uri, title]);
            } else {
                const translatedTitle = kfs[locale][title];
                titles[uri] = translatedTitle;
            }
        }

        if (uncachedTitles.length) {
            const translated = await fetchTranslations(
                JSON.stringify(uncachedTitles.map(([, title]) => ({ text: title }))),
                { to: locale, subscriptionKey: process.env.NEXT_TRANSLATION_API_KEY }
            );
            if (translated) {
                const newCache = { ...kfs[locale] };
                for (const [index, { translations }] of Object.entries(translated)) {
                    if (translations[0]) {
                        const { text: translatedTitle } = translations[0];
                        const [uri, originalTitle] = uncachedTitles[index];
                        titles[uri] = translatedTitle;
                        newCache[originalTitle] = translatedTitle;
                    }
                }
                kfs[locale] = newCache;
            }
        }
    }

    return titles;
};
