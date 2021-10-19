import { useEffect, useState } from 'react';
import useKeyboardJs from '../hooks/useKeyboardJs';
import { useKey } from 'react-use';

const useSearchHotkey = () => {
    const [opened, setOpened] = useState(false);
    const [isHotkeyPressed, e] = useKeyboardJs(['command + k', 'ctrl + k']);
    useKey('Escape', () => setOpened(false));
    const [hotkeyLabel, setHotkeyLabel] = useState('Ctrl + K');

    useEffect(() => {
        if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
            setHotkeyLabel('⌘ + K');
        }
    }, []);

    useEffect(() => {
        if (isHotkeyPressed) {
            setOpened(true);
        }
    }, [isHotkeyPressed]);

    return [opened, setOpened, hotkeyLabel];
};

export default useSearchHotkey;
