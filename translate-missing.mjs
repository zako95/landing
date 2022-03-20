import dotenv from 'dotenv';
import fs from 'fs/promises';
import { nextConfig } from './next.config.mjs';
import locales from './src/const/locales.mjs';
import { fetchTranslations } from './src/rehype/translate.mjs';

dotenv.config();
const { NEXT_TRANSLATION_API_KEY: subscriptionKey } = process.env;
const { defaultLocale } = nextConfig.i18n;
const defaultMessages = JSON.parse(await fs.readFile(`src/lang/${defaultLocale}.json`, { encoding: 'utf-8' }));

for (const locale of locales) {
    if (locale === defaultLocale) {
        continue;
    }

    const messagesPath = `src/lang/${locale}.json`;
    const messages = JSON.parse(await fs.readFile(messagesPath, { encoding: 'utf-8' }));
    let missingMessages = [];
    for (const [key, value] of Object.entries(defaultMessages)) {
        if (!(key in messages)) {
            missingMessages.push([key, value]);
        }
    }

    if (!missingMessages.length) {
        continue;
    }

    console.log(`${missingMessages.length} missing messages found for locale ${locale}, auto translating...`);
    const translated = await fetchTranslations(
        JSON.stringify(missingMessages.map(([, { defaultMessage }]) => ({ text: defaultMessage }))),
        { to: locale, subscriptionKey }
    );
    for (const [index, { translations }] of Object.entries(translated)) {
        const [id] = missingMessages[index];
        if (translations[0]) {
            messages[id] = { defaultMessage: translations[0].text };
        }
    }
    await fs.writeFile(messagesPath, JSON.stringify(messages, undefined, 4));
    console.log(`... wrote to ${messagesPath}`);
}
