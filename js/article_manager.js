document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector(".submit-btn");
    const titleInput = document.querySelector("input[type='text'][placeholder='Enter title']");
    const categorySelect = document.querySelector("#category-select");
    const contentTextarea = document.querySelector("textarea[placeholder='Write your content here...']");
    const fileInput = document.querySelector("#file-upload");
  
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
  
    submitButton.addEventListener("click", function(e) {
      e.preventDefault();  // Prevent the form from submitting the traditional way
  
      // Get the image from localStorage
      const imageUrl = localStorage.getItem("uploadedImage");
  
      // Create the article object
      const newArticle = {
        title: titleInput.value,
        category: categorySelect.value,
        content: contentTextarea.value,
        date: new Date().toLocaleDateString(),
        imageUrl: imageUrl || '', // Use the stored image URL (Base64)
      };
  
      // Save the article to localStorage
      let articles = JSON.parse(localStorage.getItem("articles")) || [];
      articles.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(articles));
  
      // Redirect back to the dashboard after adding the article
      window.location.href = 'dashboard.html';
    });
  });
  