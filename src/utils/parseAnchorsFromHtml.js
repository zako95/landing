import cheerio from 'cheerio';

export const parseAnchorsFromHtml = (html) => {
    const $ = cheerio.load(html);
    const anchors = [];
    $('h2, h3, h4, h5, h6').each((_, el) => {
        anchors.push({
            url: '#' + cheerio(el).attr('id'),
            depth: parseInt(el.name.replace('h', ''), 0) ?? 0,
            text: cheerio(el).text(),
        });
    });
    return anchors;
};
