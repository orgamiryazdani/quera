const keyboardMapping = {
    'Backspace': '⟵',
    'Tab': 'Tab',
    'CapsLock': 'Caps Lock',
    'Enter': 'Enter',
    'ShiftLeft': 'L Shift',
    'ShiftRight': 'R Shift',
    'ControlLeft': 'L Ctrl',
    'ControlRight': 'R Ctrl',
    'AltLeft': 'L Alt',
    'AltRight': 'R Alt',
    'Space': '',
    'Backquote': '`',
    'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4',
    'Digit5': '5', 'Digit6': '6', 'Digit7': '7', 'Digit8': '8',
    'Digit9': '9', 'Digit0': '0',
    'Minus': '_', 'Equal': '=',
    'BracketLeft': '[', 'BracketRight': ']', 'Backslash': '\\',
    'Semicolon': ';', 'Quote': '\'',
    'Comma': ',', 'Period': '.', 'Slash': '/',
    'KeyA': 'A', 'KeyB': 'B', 'KeyC': 'C', 'KeyD': 'D', 'KeyE': 'E',
    'KeyF': 'F', 'KeyG': 'G', 'KeyH': 'H', 'KeyI': 'I', 'KeyJ': 'J',
    'KeyK': 'K', 'KeyL': 'L', 'KeyM': 'M', 'KeyN': 'N', 'KeyO': 'O',
    'KeyP': 'P', 'KeyQ': 'Q', 'KeyR': 'R', 'KeyS': 'S', 'KeyT': 'T',
    'KeyU': 'U', 'KeyV': 'V', 'KeyW': 'W', 'KeyX': 'X', 'KeyY': 'Y',
    'KeyZ': 'Z'
};

const skippedKeys = [
    'MetaLeft', 'MetaRight',
    'ContextMenu',
    'Fn'
];

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event) => {
        event.preventDefault();

        if (skippedKeys.includes(event.code)) {
            return;
        }

        const keyElement = findKeyElement(event.code);

        if (keyElement) {
            keyElement.classList.remove('key--selected');
            keyElement.classList.add('key--held');
        }
    });

    document.addEventListener('keyup', (event) => {
        if (skippedKeys.includes(event.code)) {
            return;
        }

        const keyElement = findKeyElement(event.code);

        if (keyElement) {
            keyElement.classList.remove('key--held');
            keyElement.classList.add('key--selected');
        }
    });

    function findKeyElement(keyCode) {
        const keyElements = document.querySelectorAll('.key');
        const keyText = keyboardMapping[keyCode];

        if (!keyText && keyText !== '') {
            return null;
        }

        for (const element of keyElements) {
            if (keyCode === 'Space' && element.textContent.trim() === '') {
                if (element.classList.contains('key--special') &&
                    element.closest('.row:last-of-type')) {
                    return element;
                }
            }
            else if (element.textContent.trim().toUpperCase() === keyText.toUpperCase()) {
                return element;
            }
        }

        return null;
    }
});