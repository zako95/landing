const svgr = require('next-plugin-svgr');
const withPlugins = require('next-compose-plugins');
const cheerio = require('cheerio');
const images = require('next-images');

module.exports = withPlugins([svgr, [images, { fileExtensions: ['jpg', 'jpeg', 'png', 'gif'] }]], {
    trailingSlash: true,
});
