import { getPageTitles } from '../utils/pages';
import Error from 'next/error';

export default () => <Error statusCode={500} />;

export const getStaticProps = async ({ locale }) => {
    return { props: { titles: await getPageTitles(locale) } };
};
