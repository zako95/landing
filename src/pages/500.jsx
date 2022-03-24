import { getPageTitles } from '../utils/pages';
import Error from 'next/error';
import { loadI18nMessages } from '../utils/loadIntlMessages';

export default () => <Error statusCode={500} />;

export const getStaticProps = async ({ locale, defaultLocale }) => ({
    props: {
        titles: await getPageTitles(locale, defaultLocale),
        intlMessages: await loadI18nMessages({ locale, defaultLocale }),
    },
});
