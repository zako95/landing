import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import prism from 'remark-prism';

export const mdxOptions = {
    rehypePlugins: [
        slug,
        [
            autolinkHeadings,
            {
                behavior: 'append',
                properties: {
                    className: 'text-white ml-2 no-underline opacity-70 md-autolink',
                },
                content: {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['text-gray-700'] },
                    children: [{ type: 'text', value: '#' }],
                },
            },
        ],
    ],
    remarkPlugins: [prism],
};
