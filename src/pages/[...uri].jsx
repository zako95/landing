import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { readFile } from 'fs/promises';
import DocsLayout from '../components/DocsLayout';
import { mdxComponents } from '../const/mdxComponents';
import { getTitleFromHtml } from '../utils/getTitleFromHtml';
import remarked from 'remarked';
import { parseAnchorsFromHtml } from '../utils/parseAnchorsFromHtml';
import { mdxOptions } from '../const/mdxOptions';
import { getPageByParams, getPagePaths, getPageTitles, pathToURI } from '../utils/pages';

export async function getStaticProps({ params }) {
    const path = await getPageByParams(params);
    const source = await readFile(path, { encoding: 'utf-8' });
    const mdxSource = await serialize(source, { mdxOptions });
    const html = remarked(source);
    const title = getTitleFromHtml(html);
    const anchors = parseAnchorsFromHtml(html);
    return { props: { source: mdxSource, title, path, anchors, titles: await getPageTitles() } };
}

export async function getStaticPaths() {
    let paths = await getPagePaths();
    paths = paths.map((path) => {
        const uri = pathToURI(path).split('/');
        return { params: { uri } };
    });

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
