import locales from './src/const/locales.mjs';
import svgr from 'next-plugin-svgr';
import withPlugins from 'next-compose-plugins';
import images from 'next-images';

export const nextConfig = {
    trailingSlash: true,
    i18n: {
        locales,
        defaultLocale: 'en',
    },
    experimental: {
        outputStandalone: true,
    },
};
console.log(process.env.NEXT_TRANSLATION_API_KEY);

export default withPlugins([svgr, [images, { fileExtensions: ['jpg', 'jpeg', 'png', 'gif'] }]], nextConfig);
