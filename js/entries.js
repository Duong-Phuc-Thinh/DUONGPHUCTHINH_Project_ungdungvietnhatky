document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu mẫu ban đầu
    let posts = [
      { id: 1, image: '../images/images.jpg', title: 'Học nấu cá sốt cà chua', category: 'Nấu ăn', content: 'Tôi đã học được cách nấu ăn...', status: 'Public' },
      { id: 2, image: '../images/tải xuống.jpg', title: 'Bí kíp viết CV ngành IT', category: 'IT', content: 'Chia sẻ cách viết CV ấn tượng...', status: 'Private' },
    ];
  
    let currentPage = 1;
    const postsPerPage = 5;
  
    const tbody = document.querySelector('.table tbody');
    const pagination = document.querySelector('.pagination');
    const addBtn = document.querySelector('.add-post');
  
    // Vẽ danh sách bài viết theo trang hiện tại
    function renderPosts() {
      tbody.innerHTML = '';
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;
      const pagePosts = posts.slice(start, end);
  
      pagePosts.forEach(post => {
        const tr = document.createElement('tr');
        tr.dataset.id = post.id;
        tr.innerHTML = `
          <td><img src="${post.image}" alt="ảnh bài viết"></td>
          <td>${post.title}</td>
          <td>${post.category}</td>
          <td>${post.content}</td>
          <td><span class="badge ${post.status.toLowerCase()}">${post.status}</span></td>
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
    function renderPagination() {
      pagination.innerHTML = '';
      const totalPages = Math.ceil(posts.length / postsPerPage);
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
    function goToPage(page) {
      currentPage = page;
      renderPosts();
      renderPagination();
    }
  
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
        deletePost(id);
      }
    });
  
    tbody.addEventListener('change', e => {
      if (e.target.classList.contains('status-select')) {
        const id = Number(e.target.closest('tr').dataset.id);
        changeStatus(id, e.target.value);
      }
    });
  
    // Khởi tạo lần đầu
    renderPagination();
    renderPosts();
  });
  