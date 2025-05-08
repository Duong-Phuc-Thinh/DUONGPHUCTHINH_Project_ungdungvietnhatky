document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD
  const form = document.querySelector(".post-form");
  const submitButton = document.querySelector(".submit-btn");
  const titleInput = document.querySelector("input[type='text'][placeholder='Enter title']");
  const categorySelect = document.querySelector("#category-select");
  const contentTextarea = document.querySelector("textarea[placeholder='Write your content here...']");
  const fileInput = document.querySelector("#file-upload");
  const statusRadios = document.querySelectorAll("input[name='status']");

  // This function converts the image to a Base64 string
  function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = function() {
              // Store the Base64 image string
              localStorage.setItem("uploadedImage", reader.result);
          };
          reader.readAsDataURL(file);
      }
  }

  fileInput.addEventListener("change", handleFileSelect);

  form.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent the form from submitting the traditional way

      // Get the image from localStorage
      const imageUrl = localStorage.getItem("uploadedImage") || "https://via.placeholder.com/350";

      // Get the selected status
      let status = "Public"; // Default to Public
      statusRadios.forEach(radio => {
          if (radio.checked) {
              status = radio.nextElementSibling.textContent.trim(); // "public" or "private"
              status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); // Capitalize: "Public" or "Private"
          }
      });

      // Create the article object with standardized structure
      const newArticle = {
          id: Date.now(),
          title: titleInput.value.trim(),
          category: categorySelect.value,
          content: contentTextarea.value.trim(),
          image: imageUrl,
          status: status,
          date: new Date().toISOString().split("T")[0] // Format: YYYY-MM-DD
      };

      // Basic validation
      if (!newArticle.title) {
          alert("Please enter a title.");
          return;
      }
      if (!newArticle.content) {
          alert("Please enter some content.");
          return;
      }

      // Save the article to localStorage
      let articles = JSON.parse(localStorage.getItem("articles")) || [];
      articles.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(articles));

      // Clear the uploaded image from localStorage to avoid reusing it
      localStorage.removeItem("uploadedImage");

      // Get the returnUrl from query parameters
      const urlParams = new URLSearchParams(window.location.search);
      let returnUrl = urlParams.get("returnUrl") || "../index.html"; // Default to ../index.html for users
      if (returnUrl === "entries.html") {
          returnUrl = "entries.html"; // Stay in the pages directory for admins
      } else {
          returnUrl = "../index.html"; // Go back to root index.html for users
      }

      // Redirect back to the specified page
      window.location.href = returnUrl;
  });
=======
    console.log("article_manager.js loaded successfully");

    // Lấy các phần tử form
    const form = document.querySelector(".post-form");
    const submitButton = document.querySelector(".submit-btn");
    const titleInput = document.querySelector("input[type='text'][placeholder='Enter title']");
    const categorySelect = document.querySelector("#category-select");
    const contentTextarea = document.querySelector("textarea[placeholder='Write your content here...']");
    const fileInput = document.querySelector("#file-upload");
    const statusRadios = document.querySelectorAll("input[name='status']");

    // Kiểm tra các phần tử có tồn tại không
    console.log("Form:", form);
    console.log("Submit Button:", submitButton);
    console.log("Title Input:", titleInput);
    console.log("Category Select:", categorySelect);
    console.log("Content Textarea:", contentTextarea);
    console.log("File Input:", fileInput);
    console.log("Status Radios:", statusRadios);

    if (!form || !submitButton || !titleInput || !categorySelect || !contentTextarea || !fileInput || !statusRadios.length) {
        console.error("One or more form elements are missing.");
        showMessage("Form elements are missing. Check the console for details.", "error");
        return;
    }

    // Load categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    console.log("Loaded categories from localStorage:", categories);

    // Populate category select dropdown
    function populateCategorySelect() {
        categorySelect.innerHTML = '';
        if (categories.length === 0) {
            console.warn("No categories found in localStorage, using defaults");
            const defaultCategories = ["Tech", "Travel", "Food", "Lifestyle", "Health"];
            defaultCategories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        } else {
            categories.forEach(category => {
                if (category.status === "Active") {
                    const option = document.createElement("option");
                    option.value = category.name;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                }
            });
        }
    }
    populateCategorySelect();

    // Xử lý upload ảnh thành Base64
    fileInput.addEventListener("change", function(event) {
        console.log("File input changed");
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                localStorage.setItem("uploadedImage", reader.result);
                console.log("Image uploaded to localStorage:", reader.result.substring(0, 50) + "...");
            };
            reader.readAsDataURL(file);
        } else {
            localStorage.removeItem("uploadedImage");
            console.log("No image selected, cleared uploadedImage");
        }
    });

    // Xử lý sự kiện submit form
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("Form submit event triggered");

        // Lấy dữ liệu từ form
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const content = contentTextarea.value.trim();
        const imageUrl = localStorage.getItem("uploadedImage") || "https://via.placeholder.com/350";

        // Lấy giá trị status từ radio buttons
        let status = "Public";
        statusRadios.forEach(radio => {
            if (radio.checked) {
                status = radio.value;
                status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                console.log("Status selected:", status);
            }
        });

        // Validation
        if (!title) {
            console.warn("Title is empty");
            showMessage("Please enter a title.", "error");

            return;
        }
        if (!content) {
            console.warn("Content is empty");
            showMessage("Please enter some content..", "error");

            return;
        }
        if (!category) {
            console.warn("Category is empty");
            showMessage("Please select a category.", "error");
            return;
        }

        // Tạo đối tượng bài viết mới
        const newArticle = {
            id: Date.now(),
            title: title,
            category: category,
            content: content,
            imageUrl: imageUrl,
            status: status,
            date: new Date().toISOString().split("T")[0]
        };
        console.log("New article created:", newArticle);

        // Lưu vào localStorage
        try {
            let articles = JSON.parse(localStorage.getItem("articles")) || [];
            articles.push(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));
            console.log("Articles in localStorage after save:", JSON.parse(localStorage.getItem("articles")));
        } catch (error) {
            console.error("Failed to save article to localStorage:", error);
            showMessage("Failed to save article. Check console for details.", "error");
            return;
        }

        // Xóa ảnh đã upload
        localStorage.removeItem("uploadedImage");
        console.log("Uploaded image cleared from localStorage");

        // Chuyển hướng
        const urlParams = new URLSearchParams(window.location.search);
        let returnUrl = urlParams.get("returnUrl") || "../index.html";
        if (returnUrl === "entries.html") {
            returnUrl = "entries.html";
        } else {
            returnUrl = "../index.html";
        }
        try {
            console.log("Attempting to redirect to:", returnUrl);
            window.location.href = returnUrl;
        } catch (error) {
            console.error("Redirect failed:", error);
            showMessage("Redirect failed. Check console for details.", "error");
        }
    });

    // Đảm bảo nút submit hoạt động
    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("Submit button clicked");
        form.dispatchEvent(new Event("submit"));
    });
>>>>>>> 3a2ead1 (buoi_cuoi)
});