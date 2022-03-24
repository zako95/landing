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

        // this is to prevent translation API key from getting rate limited
        // this does mean the non-translated pages build slower, but eh.
        cpus: 1,
        workerThreads: false,
    },
};

export default withPlugins([svgr, [images, { fileExtensions: ['jpg', 'jpeg', 'png', 'gif'] }]], nextConfig);
