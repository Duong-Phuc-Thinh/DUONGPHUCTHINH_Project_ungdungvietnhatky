document.addEventListener("DOMContentLoaded", function() {
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
});