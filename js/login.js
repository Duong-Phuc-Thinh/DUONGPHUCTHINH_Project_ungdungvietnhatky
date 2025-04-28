const logregBox = document.querySelector(".logreg-box");
const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

// Chuyển đổi giữa Sign In và Sign Up

// Chuyển sang form đăng ký
registerLink.addEventListener("click", () => {
    logregBox.classList.add("active");
});

// Quay lại form đăng nhập
loginLink.addEventListener("click", () => {
    logregBox.classList.remove("active");
});

// Xử lý đăng ký tài khoản

registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn reload trang

    // Lấy dữ liệu từ input
    const name = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();
    const confirmPassword = registerForm.querySelector('#confirm-password').value.trim();

    // Kiểm tra dữ liệu nhập vào
    if (name === "") {
        alert("Vui lòng nhập họ và tên!");
        return;
    }

    if (email === "") {
        alert("Vui lòng nhập email!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Định dạng email không hợp lệ!");
        return;
    }

    if (password === "") {
        alert("Vui lòng nhập mật khẩu!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    if (confirmPassword === "") {
        alert("Vui lòng xác nhận lại mật khẩu!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không trùng khớp!");
        return;
    }

    // Lưu thông tin tài khoản vào LocalStorage
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    // Chuyển qua form đăng nhập
    logregBox.classList.remove("active");

    // Reset form
    registerForm.reset();
});

// Xử lý đăng nhập

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn reload trang

    // Lấy dữ liệu từ input
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    // Lấy user đã đăng ký từ LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        alert("Chưa có tài khoản. Vui lòng đăng ký trước!");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Đăng nhập thành công!");
        loginForm.submit(); // Cho phép submit form để chuyển trang
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
});
