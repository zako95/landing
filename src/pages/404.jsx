import { getPageTitles } from '../utils/pages';
import Error from 'next/error';
import { loadI18nMessages } from '../utils/loadIntlMessages';

export default () => <Error statusCode={404} />;

export const getStaticProps = async ({ locale, defaultLocale }) => {
    return {
        props: {
            titles: await getPageTitles(locale, defaultLocale),
            intlMessages: await loadI18nMessages({ locale, defaultLocale }),
        },
    };
};
