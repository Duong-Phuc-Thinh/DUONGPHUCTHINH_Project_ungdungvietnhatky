document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  // Dữ liệu mẫu ban đầu
  let posts = [
    { id: 1, image: '../images/images.jpg', title: 'Học nấu cá sốt cà chua', category: 'Nấu ăn', content: 'Tôi đã học được cách nấu ăn...', status: 'Public' },
    { id: 2, image: '../images/tải xuống.jpg', title: 'Bí kíp viết CV ngành IT', category: 'IT', content: 'Chia sẻ cách viết CV ấn tượng...', status: 'Private' },
  ];
=======
  // Load articles from localStorage
  let posts = JSON.parse(localStorage.getItem("articles")) || [];
  console.log("Loaded articles from localStorage:", posts);

  // Gán id cho các bài cũ nếu chưa có
  posts = posts.map((post, index) => ({
    ...post,
    id: post.id || Date.now() + index
  }));
  savePosts();
>>>>>>> 3a2ead1 (buoi_cuoi)

  let currentPage = 1;
  const postsPerPage = 5;

  const tbody = document.querySelector('.table tbody');
  const pagination = document.querySelector('.pagination');
  const addBtn = document.querySelector('.add-post');
<<<<<<< HEAD

  // Vẽ danh sách bài viết theo trang hiện tại
  function renderPosts() {
    tbody.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);
=======
  const searchInput = document.querySelector('.search-input');
  const sortOptions = document.querySelector('.sort-options');

  // Kiểm tra nếu không có bài viết
  if (posts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">Không có bài viết nào để hiển thị. Vui lòng thêm bài viết mới.</td></tr>';
  }

  // Save posts to localStorage
  function savePosts() {
    try {
      localStorage.setItem("articles", JSON.stringify(posts));
      console.log("Saved articles to localStorage:", posts);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Vẽ danh sách bài viết theo trang hiện tại
  function renderPosts(filteredPosts = posts) {
    console.log("Rendering posts:", filteredPosts);
    tbody.innerHTML = '';
    if (filteredPosts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">Không tìm thấy bài viết phù hợp.</td></tr>';
      return;
    }

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = filteredPosts.slice(start, end);
>>>>>>> 3a2ead1 (buoi_cuoi)

    pagePosts.forEach(post => {
      const tr = document.createElement('tr');
      tr.dataset.id = post.id;
      tr.innerHTML = `
<<<<<<< HEAD
        <td><img src="${post.image}" alt="ảnh bài viết"></td>
        <td>${post.title}</td>
        <td>${post.category}</td>
        <td>${post.content}</td>
        <td><span class="badge ${post.status.toLowerCase()}">${post.status}</span></td>
=======
        <td><img src="${post.imageUrl || 'https://via.placeholder.com/350'}" alt="ảnh bài viết" style="width: 50px; height: auto;"></td>
        <td>${post.title || 'N/A'}</td>
        <td>${post.category || 'N/A'}</td>
        <td>${(post.content || 'N/A').substring(0, 50)}...</td>
        <td><span class="badge ${post.status ? post.status.toLowerCase() : 'public'}">${post.status || 'Public'}</span></td>
>>>>>>> 3a2ead1 (buoi_cuoi)
        <td>
          <select class="status-select">
            <option value="Public" ${post.status === 'Public' ? 'selected' : ''}>Public</option>
            <option value="Private" ${post.status === 'Private' ? 'selected' : ''}>Private</option>
          </select>
        </td>
        <td class="actions">
          <button class="edit" data-id="${post.id}">Sửa</button>
          <button class="delete" data-id="${post.id}">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Vẽ các nút phân trang
<<<<<<< HEAD
  function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(posts.length / postsPerPage);
=======
  function renderPagination(filteredPosts = posts) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
>>>>>>> 3a2ead1 (buoi_cuoi)
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === currentPage) pageBtn.classList.add('active');
      pageBtn.addEventListener('click', () => goToPage(i));
      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    pagination.appendChild(nextBtn);
  }

  // Chuyển trang
<<<<<<< HEAD
  function goToPage(page) {
    currentPage = page;
=======
  function goToPage(page, filteredPosts = posts) {
    currentPage = page;
    renderPosts(filteredPosts);
    renderPagination(filteredPosts);
  }

  // Thêm bài viết mới
  function addPost() {
    window.location.href = "./article_manager.html?returnUrl=entries.html";
  }

  // Sửa bài viết
  function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) {
      console.error("Article not found with ID:", id);
      return;
    }
    console.log("Editing article:", post);

    const title = prompt('Sửa tiêu đề:', post.title);
    if (title !== null) post.title = title.trim();

    const category = prompt('Sửa chủ đề:', post.category);
    if (category !== null) post.category = category.trim();

    const content = prompt('Sửa nội dung:', post.content);
    if (content !== null) post.content = content.trim();

    const imageUrl = prompt('Sửa đường dẫn hình ảnh:', post.imageUrl);
    if (imageUrl !== null) post.imageUrl = imageUrl.trim();

    const status = prompt('Sửa trạng thái (Public/Private):', post.status);
    if (status !== null) post.status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    post.date = new Date().toISOString().split("T")[0];

    savePosts();
    renderPosts();
    console.log("Article updated:", post);
  }

  // Xóa bài viết
  function deletePost(id) {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      console.error("Article not found with ID:", id);
      return;
    }
    console.log("Deleting article at index:", postIndex, "with ID:", id);

    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      const originalLength = posts.length;
      posts.splice(postIndex, 1);
      if (posts.length === originalLength) {
        console.error("Failed to delete article with ID:", id);
      } else {
        const maxPage = Math.ceil(posts.length / postsPerPage) || 1;
        if (currentPage > maxPage) currentPage = maxPage;
        savePosts();
        renderPosts();
        renderPagination();
        console.log("Article deleted, updated articles:", posts);
      }
    }
  }

  // Thay đổi trạng thái bài viết
  function changeStatus(id, newStatus) {
    const post = posts.find(p => p.id === id);
    if (post) {
      post.status = newStatus;
      savePosts();
      renderPosts();
      console.log("Status updated for article ID:", id, "New status:", newStatus);
    } else {
      console.error("Article not found with ID:", id);
    }
  }

  // Tìm kiếm bài viết
  function searchPosts() {
    const query = searchInput.value.toLowerCase();
    const filteredPosts = posts.filter(post =>
      (post.title || '').toLowerCase().includes(query) ||
      (post.category || '').toLowerCase().includes(query) ||
      (post.content || '').toLowerCase().includes(query)
    );
    currentPage = 1;
    renderPosts(filteredPosts);
    renderPagination(filteredPosts);
  }

  // Sắp xếp bài viết
  function sortPosts() {
    posts.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
>>>>>>> 3a2ead1 (buoi_cuoi)
    renderPosts();
    renderPagination();
  }

<<<<<<< HEAD
  // Thêm bài viết mới
  function addPost() {
    const title = prompt('Nhập tiêu đề bài viết:');
    if (!title) return;
    const category = prompt('Nhập chủ đề:');
    const content = prompt('Nhập nội dung:');
    const image = prompt('Nhập đường dẫn hình ảnh:');

    const newPost = {
      id: Date.now(),
      image: image || '',
      title: title,
      category: category || '',
      content: content || '',
      status: 'Private'
    };
    posts.push(newPost);
    renderPagination();
    goToPage(Math.ceil(posts.length / postsPerPage));
  }

  // Sửa bài viết
  function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const title = prompt('Sửa tiêu đề:', post.title);
    if (title !== null) post.title = title;
    const category = prompt('Sửa chủ đề:', post.category);
    if (category !== null) post.category = category;
    const content = prompt('Sửa nội dung:', post.content);
    if (content !== null) post.content = content;
    const image = prompt('Sửa đường dẫn hình ảnh:', post.image);
    if (image !== null) post.image = image;
    renderPosts();
  }

  // Xóa bài viết
  function deletePost(id) {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      posts = posts.filter(p => p.id !== id);
      const maxPage = Math.ceil(posts.length / postsPerPage) || 1;
      if (currentPage > maxPage) currentPage = maxPage;
      renderPosts();
      renderPagination();
    }
  }

  // Thay đổi trạng thái bài viết
  function changeStatus(id, newStatus) {
    const post = posts.find(p => p.id === id);
    if (post) {
      post.status = newStatus;
      renderPosts();
    }
  }

  // Sự kiện click cho nút thêm
  addBtn.addEventListener('click', addPost);

  // Sự kiện click & change trong bảng (delegation)
  tbody.addEventListener('click', e => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('edit')) {
      editPost(id);
    } else if (e.target.classList.contains('delete')) {
=======
  // Sự kiện click cho nút thêm
  addBtn.addEventListener('click', addPost);

  // Sự kiện tìm kiếm
  searchInput.addEventListener('input', searchPosts);

  // Sự kiện sắp xếp
  sortOptions.addEventListener('click', sortPosts);

  // Sự kiện click & change trong bảng (delegation)
  tbody.addEventListener('click', e => {
    const id = Number(e.target.dataset.id);
    console.log("Clicked element with data-id:", id);
    if (e.target.classList.contains('edit')) {
      console.log("Edit button clicked for ID:", id);
      editPost(id);
    } else if (e.target.classList.contains('delete')) {
      console.log("Delete button clicked for ID:", id);
>>>>>>> 3a2ead1 (buoi_cuoi)
      deletePost(id);
    }
  });

  tbody.addEventListener('change', e => {
    if (e.target.classList.contains('status-select')) {
      const id = Number(e.target.closest('tr').dataset.id);
<<<<<<< HEAD
=======
      console.log("Status change for ID:", id, "New status:", e.target.value);
>>>>>>> 3a2ead1 (buoi_cuoi)
      changeStatus(id, e.target.value);
    }
  });

  // Khởi tạo lần đầu
  renderPagination();
  renderPosts();
});