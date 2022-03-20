import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { readFile } from 'fs/promises';
import DocsLayout from '../components/DocsLayout';
import { mdxComponents } from '../const/mdxComponents';
import { parseAnchorsFromHtml } from '../utils/parseAnchorsFromHtml';
import { mdxOptions } from '../const/mdxOptions';
import { getPageByParams, getPagePaths, getPageTitles, isPageLocalized, pathToURI } from '../utils/pages';
import locales from '../const/locales';
import translate from '../rehype/translate.mjs';
import { loadI18nMessages } from '../utils/loadIntlMessages';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';

export async function getStaticProps({ params, locale, defaultLocale }) {
    const path = await getPageByParams(params, locale, defaultLocale);
    let source = await readFile(path, { encoding: 'utf-8' });
    const autoTranslated = locale !== defaultLocale && !isPageLocalized(path);
    const translateOpts = { from: defaultLocale, to: locale, subscriptionKey: process.env.NEXT_TRANSLATION_API_KEY };
    const mdxSource = await serialize(source, {
        mdxOptions: {
            ...mdxOptions,
            rehypePlugins: autoTranslated
                ? [[translate, translateOpts], ...mdxOptions.rehypePlugins]
                : mdxOptions.rehypePlugins,
        },
    });

    // mdx basically does all this also, but sadly we can't give mdx a AST tree or something, so we have to parse it ourselves (again...)
    const { value: html } = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(translate, translateOpts)
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(source);
    const anchors = parseAnchorsFromHtml(html);

    return {
        props: {
            source: mdxSource,
            path,
            anchors,
            titles: await getPageTitles(locale),
            intlMessages: await loadI18nMessages({ locale, defaultLocale }),
            autoTranslated,
        },
    };
}

export async function getStaticPaths() {
    let paths = await getPagePaths();
    paths = locales.flatMap((locale) =>
        paths.map((path) => {
            const uri = pathToURI(path).split('/');
            return { params: { uri }, locale };
        })
    );

    return {
        paths,
        fallback: false,
    };
}

const MdxPage = ({ source, ...rest }) => (
    <DocsLayout {...rest}>
        <MDXRemote {...source} components={mdxComponents} />
    </DocsLayout>
);
export default MdxPage;
