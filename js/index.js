document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra trạng thái đăng nhập
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "pages/login.html"; // Đi đến pages/login.html
        return;
    }

    // Cập nhật thông tin người dùng trong dropdown
    const userNameElement = document.querySelector("#user-name");
    const userEmailElement = document.querySelector("#user-email");
    if (loggedInUser) {
        userNameElement.textContent = loggedInUser.name;
        userEmailElement.textContent = loggedInUser.email;
    }

    const addNewArticleButton = document.querySelector(".add-new-article button");
    const searchInput = document.querySelector("#search-input");
    const categoryFilter = document.querySelector("#category-filter");
    const postsContainer = document.getElementById("posts-container");

    // Add event listener for "Add New Article" button
    addNewArticleButton.addEventListener("click", function () {
        window.location.href = "pages/article_manager.html";
    });

    // Load articles from localStorage
    const articles = JSON.parse(localStorage.getItem("articles")) || [];

    // Display articles function
    function displayArticles(filteredArticles) {
        postsContainer.innerHTML = ''; // Clear existing articles
        filteredArticles.forEach((article, index) => {
            const articleElement = document.createElement("article");
            articleElement.classList.add("post");
            articleElement.innerHTML = `
                <img src="${article.imageUrl || 'https://via.placeholder.com/350'}" alt="Post image">
                <div class="content">
                    <h3>${article.title}</h3>
                    <p class="date">${article.date}</p>
                    <p class="description">${article.content.substring(0, 100)}...</p>
                    <button class="read-more" data-index="${index}">Read more</button>
                </div>
            `;
            postsContainer.appendChild(articleElement);
        });

        // Read more button functionality
        const readMoreButtons = document.querySelectorAll(".read-more");
        readMoreButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const article = articles[index];
                localStorage.setItem("currentArticle", JSON.stringify(article));
                window.location.href = "pages/comment.html";
            });
        });
    }

    // Filter articles based on search input and selected category
    function filterArticles() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredArticles = articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery);
            const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });

        displayArticles(filteredArticles);
    }

    // Filter articles when the search input or category filter changes
    searchInput.addEventListener("input", filterArticles);
    categoryFilter.addEventListener("change", filterArticles);

    // Display all articles by default
    displayArticles(articles);

    // Logout function
    function logout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("currentArticle");
        window.location.href = "pages/login.html"; // This is correct if index.html is in the root
    }

    // Add event listener to logout button in profile dropdown
    const logoutButton = document.querySelector('a[href="#"][onclick="logout()"]');
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});