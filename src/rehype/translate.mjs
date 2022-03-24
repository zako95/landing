import fetch from 'node-fetch';
import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { v4 as uuid } from 'uuid';
import keyFileStorage from 'key-file-storage';
// plugin that collects all text nodes in a rehype AST tree, and translates them through MS cognitive services
// TODO: open source this? feature complete but still needs more configurable options:
//  - cache enable/disable
//  - cache folder option

const kfs = keyFileStorage.default('./.cache/rehype-translate/', false);
const endpoint = 'https://api.cognitive.microsofttranslator.com';

export const fetchTranslations = async (body, { from = 'en', to = 'de', subscriptionKey, location = 'eastus' }) => {
    const params = new URLSearchParams({ from, to, 'api-version': '3.0' });
    const url = endpoint + '/translate?' + params;
    console.log(`fetching... ${url}`, body); // FIXME
    return await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'X-ClientTraceId': uuid().toString(),
        },
        body,
    })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`);
            }
            return res;
        })
        .then((res) => res.json());
};

const translateNodes = async (nodes, opts) => {
    const { to, subscriptionKey } = opts;
    if (!subscriptionKey) {
        console.warn('⚠ rehype-translate: no subscription key passed, unable to do translation and skipping.');
        return;
    }

    if (!nodes.length) {
        return;
    }

    const translated = await fetchTranslations(JSON.stringify(nodes.map((node) => ({ text: node.value }))), opts).catch(
        (ex) => {
            console.warn('⚠ rehype-translate: Translation error, leaving document intact.', ex);
        }
    );

    if (translated) {
        const newCache = { ...kfs[to] };

        for (const [index, { translations }] of Object.entries(translated)) {
            const node = nodes[index];
            if (translations[0]) {
                const { text } = translations[0];

                newCache[node.value] = text;
                node.value = text;
            }
        }

        kfs[to] = newCache;
    }
};

const getUncachedNodes = (nodes, { to }) => {
    const newNodes = [];
    for (const node of nodes) {
        if (node.value in kfs[to]) {
            node.value = kfs[to][node.value];
        } else {
            newNodes.push(node);
        }
    }
    return newNodes;
};

export const ensureCache = (to) => {
    // create cache file if it doesn't exist yet
    if (!(to in kfs)) {
        kfs[to] = {};
        return;
    }
};

const translate = (opts) => async (tree) => {
    const { from = 'en', to = 'de', subscriptionKey, location = 'eastus', ignoredTags = ['code', 'pre'] } = opts;
    const shouldVisitParents = ignoredTags && ignoredTags.length > 0;
    let nodesToTranslate = [];

    const visitor = (node, ancestors) => {
        // does this node have an ancestor that we should ignore?
        if (shouldVisitParents && ancestors.some((ancestor) => ignoredTags.includes(ancestor.tagName))) {
            return;
        }

        // test if text is actually 'word-ish'.
        if (!/\w+/.test(node.value)) {
            return;
        }

        nodesToTranslate.push(node);
    };

    ensureCache(to);

    if (shouldVisitParents) {
        visitParents(tree, 'text', visitor);
    } else {
        // use regular visitor because we're not going to check parents
        visit(tree, 'text', visitor);
    }
    nodesToTranslate = getUncachedNodes(nodesToTranslate, opts);
    await translateNodes(nodesToTranslate, opts);
};

export default translate;
