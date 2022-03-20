import Link from 'next/link';
import ArrowRight from '../icons/arrow-right.svg';
import SecurityShield from '../icons/security-shield.svg';
import AdditionalContent from '../icons/additional-content.svg';
import Controller from '../icons/controller.svg';
import { FormattedMessage } from 'react-intl';

const EnhancedClientSection = () => (
    <div className="px-4 py-16 lg:py-24 bg-black">
        <div className="container mx-auto flex flex-col xl:flex-row items-center">
            <div className="w-full xl:w-auto xl:max-w-2xl">
                <div className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-red-500 mb-3">
                    <FormattedMessage defaultMessage="Enhanced Clients" />
                </div>
                <h1 className="font-display font-bold text-3xl lg:text-5xl">
                    <FormattedMessage defaultMessage="A redefined experience." />{' '}
                </h1>
                <p className="md:text-xl text-md text-gray-400 leading-relaxed mt-3">
                    <FormattedMessage
                        values={{
                            br: <br />,
                        }}
                        defaultMessage="The games you know and love, redefined.{br}With more content, fixes, and improvements."
                    />
                </p>

                <Link href="/docs/qol-changes">
                    <a className="text-red-500 text-md md:text-lg block mt-4 hover:underline font-semibold">
                        <FormattedMessage defaultMessage="See the full list of improvements" />{' '}
                        <ArrowRight className="h-4 w-4 inline" />
                    </a>
                </Link>
            </div>

            <div className="flex-1" />

            <div className="grid grid-cols-1 gap-8 lg:gap-2 lg:grid-cols-3 lg:max-w-3xl mx-auto mt-8 text-center mt-12 xl:mt-0 max-w-sm">
                <div className="flex flex-col items-center">
                    <SecurityShield />
                    <h2 className="font-display font-bold mt-4">
                        <FormattedMessage defaultMessage="Improved Security." />{' '}
                    </h2>
                    <p className="text-gray-400 mt-2">
                        <FormattedMessage defaultMessage="Security vulnerabilities that we have found in the basegames ourselves(!), have been patched." />
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Controller />
                    <h2 className="font-display font-bold mt-4">
                        <FormattedMessage defaultMessage="Controller Support." />{' '}
                    </h2>
                    <p className="text-gray-400 mt-2">
                        <FormattedMessage defaultMessage="Controller support has been added to every game." />{' '}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <AdditionalContent />
                    <h2 className="font-display font-bold mt-4">
                        <FormattedMessage defaultMessage="Additional content." />{' '}
                    </h2>
                    <p className="text-gray-400 mt-2">
                        <FormattedMessage defaultMessage="We've added several additional guns and maps to the games." />{' '}
                    </p>
                </div>
            </div>
        </div>
    </div>
);
export default EnhancedClientSection;
