import { basename, dirname, extname, join } from 'path';
import { globby } from 'globby';
import { getTitleFromHtml } from './getTitleFromHtml';
import { readFile } from 'fs/promises';
import remarked from 'remarked';

const PAGES_PREFIX = 'src/pages/';
const EXTENSION_PATTERN = '.{md,mdx}';
const PAGES_PATTERN = join(PAGES_PREFIX, `**/*${EXTENSION_PATTERN}`);

export const pathToURI = (path) => {
    path = path.replace(PAGES_PREFIX, '');
    const base = basename(path, extname(path));
    const dir = dirname(path);
    return base === 'index' ? dir : join(dir, base);
};

export const getPageByParams = async (params) => {
    const { uri } = params;
    const base = join(PAGES_PREFIX, uri.join('/'));
    const paths = await globby([base + EXTENSION_PATTERN, join(base, '/index' + EXTENSION_PATTERN)]);

    if (!paths.length) {
        throw new Error(`No matching pages found for: '${base}' 😢`);
    }

    return paths[0];
};

export const getPagePaths = () => globby(PAGES_PATTERN);

let PAGE_TITLES_CACHE = null;
export const getPageTitles = async () => {
    if (PAGE_TITLES_CACHE) {
        return PAGE_TITLES_CACHE;
    }

    const paths = await getPagePaths();
    const titles = {};
    await Promise.all(
        paths.map(async (path) => {
            const source = await readFile(path, { encoding: 'utf-8' });
            const title = getTitleFromHtml(remarked(source));
            const uri = join('/', pathToURI(path));
            titles[uri] = title;
        })
    );
    PAGE_TITLES_CACHE = titles;
    return titles;
};
