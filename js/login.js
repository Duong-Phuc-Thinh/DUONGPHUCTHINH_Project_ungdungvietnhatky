document.addEventListener('DOMContentLoaded', () => {
    const logregBox = document.querySelector(".logreg-box");
    const loginForm = document.querySelector(".form-box.login form");
    const registerForm = document.querySelector(".form-box.register form");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    // Kiểm tra các phần tử HTML cần thiết
    if (!logregBox || !loginForm || !registerForm || !registerLink || !loginLink) {
        console.error("Một hoặc nhiều phần tử HTML không được tìm thấy!");
        return;
    }

    // Chuyển đổi giữa Sign In và Sign Up
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        logregBox.classList.add("active");
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        logregBox.classList.remove("active");
    });

    // Function to show notification
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerText = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize admin account if it doesn't exist
    function initializeAdminAccount() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const adminEmail = 'thinhdaden@gmail.com';
        const adminPassword = 'thinhdaden2006';

        if (!users.some(user => user.email === adminEmail)) {
            users.push({
                id: Date.now(),
                name: 'Thinh Daden',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                status: 'Active',
                active: 'Active',
                avatar: ''
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Xử lý đăng ký tài khoản
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Registration form submitted");

        const nameInput = registerForm.querySelector('input[type="text"]');
        const emailInput = registerForm.querySelector('input[type="email"]');
        const passwordInput = registerForm.querySelector('#password');
        const confirmPasswordInput = registerForm.querySelector('#confirm-password');
        const termsCheckbox = registerForm.querySelector('input[type="checkbox"]');

        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput || !termsCheckbox) {
            console.error("Missing form inputs");
            showNotification("Lỗi: Không tìm thấy các trường nhập liệu!", "error");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const termsChecked = termsCheckbox.checked;

        console.log("Form values:", { name, email, password, confirmPassword, termsChecked });

        // Validation checks
        if (!name) {
            showNotification("Vui lòng nhập họ và tên!", "error");
            return;
        }

        if (!email) {
            showNotification("Vui lòng nhập email!", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification("Email không hợp lệ!", "error");
            return;
        }

        if (!password) {
            showNotification("Vui lòng nhập mật khẩu!", "error");
            return;
        }

        if (password.length < 6) {
            showNotification("Mật khẩu phải có ít nhất 6 ký tự!", "error");
            return;
        }

        if (password !== confirmPassword) {
            showNotification("Mật khẩu xác nhận không khớp!", "error");
            return;
        }

        if (!termsChecked) {
            showNotification("Vui lòng đồng ý với điều khoản và điều kiện!", "error");
            return;
        }

        // Kiểm tra email đã tồn tại
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            showNotification("Email đã được sử dụng!", "error");
            return;
        }

        // Thêm người dùng mới
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'user',
            status: 'Active',
            active: 'Active',
            avatar: ''
        };
        users.push(newUser);
        try {
            localStorage.setItem('users', JSON.stringify(users));
            console.log("User registered successfully:", newUser);
            showNotification("Đăng ký thành công! Hãy đăng nhập để tiếp tục.", "success");
            setTimeout(() => {
                logregBox.classList.remove("active");
                registerForm.reset();
            }, 1000);
        } catch (error) {
            console.error("Error saving user to localStorage:", error);
            showNotification("Lỗi khi lưu thông tin người dùng!", "error");
        }
    });

    // Xử lý đăng nhập
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Login form submitted");

        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        if (!emailInput || !passwordInput) {
            console.error("Missing login form inputs");
            showNotification("Lỗi: Không tìm thấy các trường nhập liệu!", "error");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email) {
            showNotification("Vui lòng nhập email!", "error");
            return;
        }

        if (!password) {
            showNotification("Vui lòng nhập mật khẩu!", "error");
            return;
        }

        // Initialize admin account
        initializeAdminAccount();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showNotification("Email hoặc mật khẩu không đúng!", "error");
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        console.log("User logged in:", user);
        showNotification("Đăng nhập thành công!", "success");

        setTimeout(() => {
            if (user.role === 'admin') {
                console.log("Attempting to redirect to ../entries_manager.html");
                // Try relative path first
                try {
                    window.location.href = "/pages/entries_manager.html";
                } catch (error) {
                    console.error("Error redirecting to ../entries_manager.html:", error);
                    // Fallback to absolute path
                    window.location.href = "/entries_manager.html";
                }
            } else {
                console.log("Attempting to redirect to ../index.html");
                try {
                    window.location.href = "../index.html";
                } catch (error) {
                    console.error("Error redirecting to ../index.html:", error);
                    window.location.href = "/index.html";
                }
            }
        }, 1000);
    });
});