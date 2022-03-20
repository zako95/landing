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
import { loadI18nMessages } from '../utils/loadIntlMessages';
import { useIntl } from 'react-intl';

export default function Home({ stats, codeBlockSource }) {
    const intl = useIntl();
    return (
        <>
            <Head>
                <title>{`${intl.formatMessage({
                    defaultMessage: 'BO2, MW3, WaW redefined.',
                })} - Plutonium Project`}</title>
            </Head>

            <Hero stats={stats} />
            <DedServerSection />
            <ModdingSupportSection codeBlock={<MDXRemote {...codeBlockSource} components={mdxComponents} />} />
            <EnhancedClientSection />
            <AdditionalFeatures />
        </>
    );
}

export const getStaticProps = async ({ locale, defaultLocale }) => {
    return {
        props: {
            titles: await getPageTitles(locale, defaultLocale),
            intlMessages: await loadI18nMessages({ locale, defaultLocale }),
            stats: await getStats(),
            codeBlockSource: await serialize(
                await readFile('./src/components/home/CodeBlock.mdx', { encoding: 'utf-8' }),
                { mdxOptions }
            ),
        },
    };
};
