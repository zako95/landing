import Link from 'next/link';
import { sections } from '../const/footer';
import { SocialIcon } from 'react-social-icons';
import LogoIcon from './icons/logo-icon.svg';
import { useTitles } from '../hooks/useTitles';
import { FormattedMessage } from 'react-intl';

const socialIconProps = {
    bgColor: '#000',
    className: 'h-9 w-9',
    style: { width: undefined, height: undefined },
    target: '_blank=',
};

const Footer = () => {
    const titles = useTitles();
    return (
        <footer className="bg-white text-gray-800">
            <div className="container mx-auto">
                <div className="py-10 px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {sections.map((section, i) => (
                        <div key={i}>
                            <h1 className="font-display text-xl font-bold mb-4">{section.title}</h1>

                            {section.children.map(({ uri, title, url }, childIndex) => {
                                const anchorProps = url ? { href: url, target: '_blank' } : {};
                                if (uri) {
                                    if (!titles[uri]) {
                                        console.error(
                                            `Unable to get title for URI '${uri}', falling back to displaying uri instead.`
                                        );
                                    }
                                    title = titles[uri] ?? uri;
                                }
                                const anchor = (
                                    <a
                                        key={childIndex}
                                        className="pt-1 transition-colors duration-200 relative underline block hover:text-gray-600 text-gray-700 truncate"
                                        {...anchorProps}
                                    >
                                        {title}
                                    </a>
                                );

                                return uri ? (
                                    <Link key={childIndex} href={uri}>
                                        {anchor}
                                    </Link>
                                ) : (
                                    anchor
                                );
                            })}
                        </div>
                    ))}

                    <div>
                        <h1 className="font-display text-xl font-bold mb-4">
                            <FormattedMessage defaultMessage="Follow us" />
                        </h1>

                        <div className="space-x-4">
                            <SocialIcon url="https://discord.gg/plutonium" {...socialIconProps} />
                            <SocialIcon url="https://twitter.com/PlutoniumMod" {...socialIconProps} />
                            <SocialIcon url="https://youtube.com/PlutoniumProject" {...socialIconProps} />
                            <SocialIcon url="https://tiktok.com/@plutonium.pw" {...socialIconProps} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 px-4 border-t border-gray-100 text-gray-400">
                <div className="container flex mx-auto text-xs flex-col lg:flex-row">
                    <div className="flex space-x-3 items-center">
                        <LogoIcon className="w-10 h-10" />
                        <p>Copyright Plutonium 2017-{new Date().getFullYear()}</p>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center lg:text-right mt-4 lg:mt-0">
                        <FormattedMessage defaultMessage="Trademarks used are owned by their respective owners." />
                        <br />
                        <FormattedMessage
                            defaultMessage="This mod is not endorsed by or affiliated with the copyright holders of the base game in any
                        form."
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
