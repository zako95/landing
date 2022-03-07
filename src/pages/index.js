import Head from 'next/head';
import Hero from '../components/home/Hero';
import AdditionalFeatures from '../components/home/AdditionalFeatures';
import DedServerSection from '../components/home/DedServerSection';
import ModdingSupportSection from '../components/home/ModdingSupportSection';
import EnhancedClientSection from '../components/home/EnhancedClientSection';
import { getStats } from './api/stats';
import { getPageTitles } from '../utils/pages';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from '../const/mdxComponents';
import { mdxOptions } from '../const/mdxOptions';
import { readFile } from 'fs/promises';

export default function Home({ stats, codeBlockSource }) {
    return (
        <>
            <Head>
                <title>BO2, MW3, WaW redefined. - Plutonium Project</title>
            </Head>

            <Hero stats={stats} />
            <DedServerSection />
            <ModdingSupportSection codeBlock={<MDXRemote {...codeBlockSource} components={mdxComponents} />} />
            <EnhancedClientSection />
            <AdditionalFeatures />
        </>
    );
}

export const getStaticProps = async () => {
    return {
        props: {
            titles: await getPageTitles(),
            stats: await getStats(),
            codeBlockSource: await serialize(
                await readFile('./src/components/home/CodeBlock.mdx', { encoding: 'utf-8' }),
                { mdxOptions }
            ),
        },
    };
};
