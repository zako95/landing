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
};

export default withPlugins([svgr, [images, { fileExtensions: ['jpg', 'jpeg', 'png', 'gif'] }]], nextConfig);
