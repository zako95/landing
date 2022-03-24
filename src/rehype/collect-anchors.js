import { visit } from 'unist-util-visit';
import { toText } from 'hast-util-to-text';

const COLLECT_FROM = ['h2', 'h3', 'h4', 'h5', 'h6'];
const collectAnchors =
    ({ anchors = [] }) =>
    (tree) => {
        visit(tree, 'element', (node) => {
            if (COLLECT_FROM.includes(node.tagName) && node.properties.id) {
                anchors.push({
                    depth: parseInt(node.tagName.replace('h', ''), 0) ?? 0,
                    text: toText(node),
                    url: '#' + node.properties.id,
                });
            }
        });
    };

export default collectAnchors;
