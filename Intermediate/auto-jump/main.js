const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    const inputOrder = Number(input.getAttribute("data-order"));
    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value.length === 0) {
            const prevInput = inputs[inputOrder - 1];
            if (prevInput) {
                prevInput.focus();
            }
        } else if (e.key !== "Backspace" && input.value.length >= 4) {
            const prevInput = inputs[inputOrder + 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    });

    input.addEventListener('input', (e) => {
        const value = input.value.trim();

        if (value.length === 0 && e.inputType === "deleteContentBackward") {
            const prevInput = inputs[inputOrder - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }

        if (value.length >= 4) {
            const nextInput = inputs[inputOrder + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});
