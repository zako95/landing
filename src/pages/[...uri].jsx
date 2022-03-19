import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { readFile } from 'fs/promises';
import DocsLayout from '../components/DocsLayout';
import { mdxComponents } from '../const/mdxComponents';
import { getTitleFromHtml } from '../utils/getTitleFromHtml';
import remarked from 'remarked';
import { parseAnchorsFromHtml } from '../utils/parseAnchorsFromHtml';
import { mdxOptions } from '../const/mdxOptions';
import { getPageByParams, getPagePaths, getPageTitles, isPageLocalized, pathToURI } from '../utils/pages';
import locales from '../const/locales';
import translate from '../rehype/translate';

export async function getStaticProps({ params, locale }) {
    const path = await getPageByParams(params, locale);
    let source = await readFile(path, { encoding: 'utf-8' });
    const autoTranslated = locale !== 'en' && !isPageLocalized(path);
    const mdxSource = await serialize(source, {
        mdxOptions: {
            ...mdxOptions,
            rehypePlugins: autoTranslated
                ? [
                      [translate, { from: 'en', to: locale, subscriptionKey: process.env.NEXT_TRANSLATION_API_KEY }],
                      ...mdxOptions.rehypePlugins,
                  ]
                : mdxOptions.rehypePlugins,
        },
    });
    const html = remarked(source);
    const title = getTitleFromHtml(html);
    const anchors = parseAnchorsFromHtml(html);

    return { props: { source: mdxSource, title, path, anchors, titles: await getPageTitles(locale), autoTranslated } };
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
