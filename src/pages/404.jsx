import { getPageTitles } from '../utils/pages';
import Error from 'next/error';

export default () => <Error statusCode={404} />;

export const getStaticProps = async () => {
    return { props: { titles: await getPageTitles() } };
};
