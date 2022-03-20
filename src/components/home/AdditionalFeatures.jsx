import ArrowRight from '../icons/arrow-right.svg';
import classNames from 'classnames';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const additionalFeatures = [
    <FormattedMessage defaultMessage="Aim Assist" />,
    <FormattedMessage defaultMessage="Ultra Wide Monitor Support" />,
    <FormattedMessage defaultMessage="Theater/Demo System" />,
    <FormattedMessage defaultMessage="Discord Rich Presence" />,
    <FormattedMessage defaultMessage="All DLC unlocked" />,
    <FormattedMessage defaultMessage="Aim Down Sight Sensitivity" />,
    <FormattedMessage defaultMessage="UPNP for custom games" />,
    <>
        <pre className="inline">cg_fovScale</pre> unlocked
    </>,
    <>
        <pre className="inline">com_maxfps</pre> unlocked
    </>,
    <>
        <pre className="inline">clanname</pre> dvar
    </>,
    <>
        <pre className="inline">unlockall</pre>
    </>,
    'Rocket jump',
    <FormattedMessage defaultMessage="Map rotation for ZM servers" />,
    'IW5: `sl_noTrickshot` dvar',
    'IW5: GSC Support',
    'IW5: AK-74u',
    'IW5: Intervention',
    'IW5: Rust',
    <>
        IW5: <FormattedMessage defaultMessage="Forum Avatars as in-game icon" />{' '}
    </>,
    <>
        IW5: <FormattedMessage defaultMessage="Custom card text" />
    </>,
    <>
        IW5: <FormattedMessage defaultMessage="Higher FPS than Steam" />
    </>,
    <>
        T6: <pre className="inline">zombies_minplayers</pre> dvar
    </>,
    <>
        T6: <pre className="inline">sv_allowDof</pre> dvar
    </>,
    <>
        T6: <pre className="inline">g_randomSeed</pre> dvar
    </>,
    'T6: Server side demos',
    <>
        T6: <pre className="inline">sv_sayName</pre> dvar
    </>,
    <>
        T4: <pre className="inline">sp_minplayers</pre>
    </>,
    <>
        T4: <FormattedMessage defaultMessage="Unlocked" /> <pre className="inline">cg_fov</pre>
    </>,
    <>
        T4: <FormattedMessage defaultMessage="Mod downloading" />
    </>,
    'T4: 16x AA',
];

const AdditionalFeatures = () => (
    <div className="bg-gray-900 py-10 lg:py-16">
        <div className="px-4 md:px-6">
            <h1 className="text-xl md:text-4xl font-display font-bold text-center">
                <FormattedMessage defaultMessage="And much, much more..." />{' '}
            </h1>

            <p className="font-display text-md md:text-3xl pt-4 leading-relaxed text-center">
                {additionalFeatures.map((feature, i) => (
                    <span
                        key={i}
                        className={classNames(i % 2 === 0 ? 'text-gray-300' : 'text-gray-500', {
                            'hidden md:inline': i > 10 && i < 15,
                            'hidden lg:inline': i >= 15,
                        })}
                    >
                        {i > 0 && ' • '}

                        {feature}
                    </span>
                ))}
            </p>

            <p className="text-md md:text-lg pt-4 text-center">
                <Link href="/docs/qol-changes">
                    <a className="text-game-t6 font-semibold hover:underline">
                        <FormattedMessage defaultMessage="Read full feature list" />{' '}
                        <ArrowRight className="h-4 w-4 inline" />
                    </a>
                </Link>
            </p>
        </div>
    </div>
);
export default AdditionalFeatures;
