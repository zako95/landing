import '../global.css';
import 'tailwindcss/tailwind.css';
import 'prism-theme-one-dark/prism-onedark.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { TitlesProvider } from '../hooks/useTitles';

const MyApp = ({ Component, pageProps }) => (
    <TitlesProvider value={pageProps.titles}>
        <div className="text-white bg-gray-900 min-h-screen flex flex-col font-serif">
            <Nav />
            <Component {...pageProps} />
            <div className="flex-grow" />
            <Footer />
        </div>
    </TitlesProvider>
);

export default MyApp;
