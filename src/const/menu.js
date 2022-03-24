import { FormattedMessage } from 'react-intl';

export const menuItems = [
    {
        title: <FormattedMessage defaultMessage="Docs" />,
        uri: '/docs',
        key: 'docs',
    },
    {
        title: <FormattedMessage defaultMessage="Stats" />,
        uri: '/stats',
        key: 'stats',
    },
    {
        title: <FormattedMessage defaultMessage="Forum" />,
        href: 'https://forum.plutonium.pw/',
        key: 'forum',
    },
    {
        title: 'Discord',
        href: 'https://discord.gg/plutonium',
        key: 'discord',
    },
    {
        title: <FormattedMessage defaultMessage="Donate" />,
        href: 'https://forum.plutonium.pw/donate',
        key: 'donate',
    },
];
