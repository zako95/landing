import { FormattedMessage } from 'react-intl';

export const sections = [
    {
        title: 'Plutonium Project',
        children: [
            {
                title: 'Forum',
                url: 'https://forum.plutonium.pw/',
            },
            {
                title: 'Discord',
                url: 'https://discord.gg/plutonium',
            },
            {
                title: <FormattedMessage defaultMessage="Server Keys" />,
                url: 'https://platform.plutonium.pw/serverkeys/',
            },
            {
                title: <FormattedMessage defaultMessage="Donate" />,
                url: 'https://forum.plutonium.pw/donate',
            },
        ],
    },
    {
        title: <FormattedMessage defaultMessage="Support" />,
        children: [
            {
                uri: '/docs/custom-games',
            },
            {
                uri: '/docs/controllers',
            },
            {
                uri: '/docs/opening-console',
            },
            {
                uri: '/docs/repair',
            },
            {
                uri: '/docs/game-files',
            },
            {
                uri: '/docs/low-fps',
            },
            {
                uri: '/docs/support',
            },
        ],
    },
    {
        title: <FormattedMessage defaultMessage="Top Forum Categories" />,
        children: [
            {
                title: <FormattedMessage defaultMessage="MW3 client support" />,
                url: 'https://forum.plutonium.pw/category/15/mw3-client-support',
            },
            {
                title: <FormattedMessage defaultMessage="MW3 mods" />,
                url: 'https://forum.plutonium.pw/category/27/mw3-modding-releases-resources',
            },
            {
                title: <FormattedMessage defaultMessage="BO2 client support" />,
                url: 'https://forum.plutonium.pw/category/9/bo2-client-support',
            },
            {
                title: <FormattedMessage defaultMessage="BO2 mods" />,
                url: 'https://forum.plutonium.pw/category/23/bo2-modding-releases-resources',
            },
            {
                title: <FormattedMessage defaultMessage="WaW client support" />,
                url: 'https://forum.plutonium.pw/category/37/waw-client-support',
            },
            {
                title: <FormattedMessage defaultMessage="WaW mods" />,
                url: 'https://forum.plutonium.pw/category/40/waw-modding-releases-resources',
            },

            {
                title: <FormattedMessage defaultMessage="Plutonium Launcher Support" />,
                url: 'https://forum.plutonium.pw/category/34/plutonium-launcher-support',
            },
        ],
    },
];
