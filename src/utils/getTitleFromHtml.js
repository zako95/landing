import cheerio from 'cheerio';

export const getTitleFromHtml = (content) => {
    const $ = cheerio.load(content);
    const title = $('h1:first-of-type').text();
    return title;
};
