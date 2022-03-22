import { MDXRemote } from 'next-mdx-remote';
import { readFile } from 'fs/promises';
import DocsLayout from '../components/DocsLayout';
import { mdxComponents } from '../const/mdxComponents';
import { mdxOptions } from '../const/mdxOptions';
import { getPageByParams, getPagePaths, getPageTitles, isPageLocalized, pathToURI } from '../utils/pages';
import locales from '../const/locales';
import translate from '../rehype/translate.mjs';
import { loadI18nMessages } from '../utils/loadIntlMessages';
import { serialize } from 'next-mdx-remote/serialize';
import collectAnchors from '../rehype/collect-anchors';

export async function getStaticProps({ params, locale, defaultLocale }) {
    const path = await getPageByParams(params, locale, defaultLocale);
    const source = await readFile(path, { encoding: 'utf-8' });
    const autoTranslated = locale !== defaultLocale && !isPageLocalized(path);
    const translateOpts = { from: defaultLocale, to: locale, subscriptionKey: process.env.NEXT_TRANSLATION_API_KEY };
    const anchors = [];
    const rehypePlugins = [...mdxOptions.rehypePlugins];
    const [autolinkPlugin] = rehypePlugins.splice(rehypePlugins.length - 1, 1);
    if (autoTranslated) {
        rehypePlugins.push([translate, translateOpts]);
    }
    rehypePlugins.push([collectAnchors, { anchors }]);
    rehypePlugins.push(autolinkPlugin);

    const serialized = await serialize(source, { mdxOptions: { ...mdxOptions, rehypePlugins } });

    return {
        props: {
            source: serialized,
            path,
            anchors,
            titles: await getPageTitles(locale, defaultLocale),
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
