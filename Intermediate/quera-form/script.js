//implement your code here
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    const nameError = form.querySelector('.nameError');
    const emailError = form.querySelector('.emailError');
    const passwordError = form.querySelector('.passwordError');

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(nameInput.value.trim())) {
        nameError.textContent = "نام کامل را به درستی وارد کنید.";
    }

    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "ایمیل را به درستی وارد کنید.";
    }

    if (!passwordRegex.test(passwordInput.value.trim())) {
        passwordError.textContent =
            "رمز عبور باید شامل حداقل 8 کاراکتر باشد و شامل حداقل یک عدد، یک حرف بزرگ و یک حرف کوچک باشد.";
    }

})