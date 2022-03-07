import { createContext, useContext } from 'react';

const context = createContext({});
export const { Provider: TitlesProvider } = context;

// convenience hook
export const useTitles = () => {
    return useContext(context);
};
