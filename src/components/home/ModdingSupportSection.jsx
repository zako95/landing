import Link from 'next/link';
import ArrowRight from '../icons/arrow-right.svg';
import { FormattedMessage } from 'react-intl';

const ModdingSupportSection = ({ codeBlock }) => (
    <div className="px-4 py-16 lg:py-24">
        <div className="container mx-auto flex flex-col xl:flex-row xl:items-center space-y-4 xl:space-y-0">
            <div className="w-full xl:w-auto xl:max-w-2xl">
                <div className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-green-500 mb-3">
                    <FormattedMessage defaultMessage="Modding support" />
                </div>
                <h1 className="font-display font-bold text-3xl lg:text-5xl">Power to the players.</h1>
                <p className="md:text-xl text-md text-gray-400 leading-relaxed mt-3">
                    <FormattedMessage
                        defaultMessage="GSC scripting is supported in every game we have clients for.{br}Even if the steam version did not."
                        values={{
                            br: <br />,
                        }}
                    />
                </p>
                <Link href="/docs/modding">
                    <a className="text-green-500 font-semibold text-md md:text-lg block mt-4 hover:underline">
                        <FormattedMessage defaultMessage="Find out how to create your own mod" />{' '}
                        <ArrowRight className="h-4 w-4 inline" />
                    </a>
                </Link>
            </div>

            <div className="flex-1" />

            <div className="prose">{codeBlock}</div>
        </div>
    </div>
);

export default ModdingSupportSection;
