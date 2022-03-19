import Sidebar from '../components/Sidebar';
import ToC from '../components/ToC';
import Head from 'next/head';
import React, { useMemo } from 'react';
import ExternalLinkIcon from '@heroicons/react/solid/ExternalLinkIcon';
import TranslateIcon from '@heroicons/react/solid/TranslateIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { dirname, extname, basename } from 'path-browserify';

const GITHUB_PREFIX = 'https://github.com/plutoniumpw/landing/';

const DocsLayout = ({ children, title, path, anchors, autoTranslated }) => {
    const { asPath, locale } = useRouter();
    const newTranslationUrl = useMemo(
        () =>
            GITHUB_PREFIX +
            'new/develop/' +
            dirname(path) +
            '?filename=' +
            basename(path, extname(path)) +
            `.${locale}` +
            extname(path)
    );
    return (
        <>
            {autoTranslated && (
                <div className="bg-blue-400 text-black px-4">
                    <div className="container mx-auto py-3 flex items-center">
                        <TranslateIcon className="h-5 w-5 md:h-6 md:w-6  min-w-max inline mr-3 text-gray-900" />
                        <div>
                            <p className="text-sm font-serif m-0">
                                This page was machine translated, it may contain some inaccuracies. You can help by{' '}
                                <a className="underline font-semibold" href={newTranslationUrl} target="_blank">
                                    contributing a translation
                                    <ExternalLinkIcon className="h-4 w-4 inline ml-1" />
                                </a>
                                , or you can alternatively switch to{' '}
                                <Link href={asPath} locale="en">
                                    <a className="underline font-semibold">the English version</a>
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <main className="container mx-auto py-6">
                <Head>
                    <title>{`${title} - Plutonium Project`}</title>
                </Head>

                <div className="flex">
                    <Sidebar />
                    <div className="flex-grow px-4 py-2 max-w-full">
                        <div className="prose lg:prose-xl font-serif">{children}</div>

                        <div className="pt-10 pb-8">
                            <a
                                className=" text-sm font-semibold bg-gray-800 text-gray-300 py-3 px-3 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                href={GITHUB_PREFIX + 'edit/develop/' + path}
                                target="_blank"
                            >
                                Edit this page
                                <ExternalLinkIcon className="h-4 w-4 inline ml-2 text-gray-400" />
                            </a>
                        </div>
                    </div>
                    <ToC anchors={anchors} />
                </div>

                <style jsx global>{`
                    .prose h1,
                    .prose h2,
                    .prose h3,
                    .prose h4,
                    .prose h5,
                    .prose h6 {
                        font-family: 'Poppins', serif;
                    }

                    // dirty hack to add nav height to anchor location
                    h2:target::before,
                    h3:target::before,
                    h4:target::before,
                    h5:target::before,
                    h6:target::before {
                        content: '';
                        display: block;
                        height: 110px;
                        margin: -110px 0 0;
                    }

                    .prose code {
                        word-break: break-word;
                    }
                `}</style>
            </main>
        </>
    );
};
export default DocsLayout;
