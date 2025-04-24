const loginForm = document.querySelector(".form-box.login");
const registerForm = document.querySelector(".form-box.register");
const logregBox = document.querySelector(".logreg-box");

// Button để chuyển sang form đăng ký
const registerLink = document.querySelector(".register-link");
registerLink.addEventListener("click", () => {
    logregBox.classList.add("active");
});

// Button để quay lại form đăng nhập
const loginLink = document.querySelector(".login-link");
loginLink.addEventListener("click", () => {
    logregBox.classList.remove("active");
});
    