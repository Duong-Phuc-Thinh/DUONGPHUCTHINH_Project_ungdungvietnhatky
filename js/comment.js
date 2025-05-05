document.addEventListener("DOMContentLoaded", function() {
    const article = localStorage.getItem("currentArticle");
  
    if (article) {
      const parsedArticle = JSON.parse(article);
  
      const postContainer = document.querySelector(".post");
      postContainer.innerHTML = `
        <div class="post-header">
          <img src="${parsedArticle.imageUrl || 'https://via.placeholder.com/350'}" alt="Post image" class="avatar">
          <div class="post-content">
            <h2>${parsedArticle.title}</h2>
            <p>${parsedArticle.content}</p>
            <div class="post-meta">
              <span>${parsedArticle.likes || 0} Likes</span>
              <span>${parsedArticle.replies || 0} Replies</span>
            </div>
          </div>
        </div>
      `;
    } else {
      const postContainer = document.querySelector(".post");
      postContainer.innerHTML = `<p>Article not found!</p>`;
    }
  
    const backButton = document.querySelector(".back-btn");
    backButton.addEventListener("click", function() {
      window.location.href = "dashboard.html";
    });
  });
  