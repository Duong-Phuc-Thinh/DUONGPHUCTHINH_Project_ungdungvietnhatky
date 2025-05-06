document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, starting user management logic");
  
    // Sidebar navigation
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href === '#') {
          window.location.href = 'dashboard.html';
        } else {
          window.location.href = href;
        }
      });
    });
  
    // User management logic
    let users = [
      { id: 1, name: 'Nam', email: 'NamVen@gmail.com', status: 'Active', avatar: '../images/nam.jpg' },
      { id: 2, name: 'Bà Hòa', email: 'Baho@gmail.com', status: 'Active', avatar: '../images/hoa.jpg' },
      { id: 3, name: 'Anh Đào', email: 'AnhDaoX@gmail.com', status: 'Active', avatar: '../images/dao.jpg' },
    ];
  
    let currentPage = 1;
    const itemsPerPage = 5;
  
    const tbody = document.querySelector('#user-table');
    const pagination = document.querySelector('.pagination');
    const searchInput = document.querySelector('.search-input');
  
    function renderUsers(filteredUsers = users) {
      console.log("Rendering users for page:", currentPage);
      tbody.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageUsers = filteredUsers.slice(start, end);
  
      pageUsers.forEach(user => {
        console.log("Rendering user:", user.name);
        const tr = document.createElement('tr');
        tr.dataset.id = user.id;
        tr.innerHTML = `
          <td><img src="${user.avatar}" alt="Avatar" class="avatar-small"> ${user.name}</td>
          <td>${user.status}</td>
          <td>${user.email}</td>
          <td><span class="badge ${user.status.toLowerCase()}">${user.status}</span></td>
          <td class="actions">
            <button class="block-btn" data-id="${user.id}" ${user.status === 'Active' ? '' : 'disabled'}>Block</button>
            <button class="unblock-btn" data-id="${user.id}" ${user.status === 'Inactive' ? '' : 'disabled'}>Unblock</button>
            <button class="edit" data-id="${user.id}">Edit</button>
            <button class="delete" data-id="${user.id}">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  
    function renderPagination(filteredUsers = users) {
      console.log("Rendering pagination, total users:", filteredUsers.length);
      pagination.innerHTML = '';
      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
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
  
    function goToPage(page, filteredUsers = users) {
      currentPage = page;
      renderUsers(filteredUsers);
      renderPagination(filteredUsers);
    }
  
    function addUser() {
      const name = prompt('Enter user name:');
      if (!name) return;
      const email = prompt('Enter email address:');
      const avatar = prompt('Enter avatar path (e.g., ../images/newuser.jpg):') || '../images/default.jpg';
      const newUser = {
        id: Date.now(),
        name: name,
        email: email || '',
        status: 'Active',
        avatar: avatar
      };
      users.push(newUser);
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
      renderPagination(filteredUsers);
      goToPage(Math.ceil(filteredUsers.length / itemsPerPage), filteredUsers);
    }
  
    function editUser(id) {
      const user = users.find(u => u.id === id);
      if (!user) return;
      const name = prompt('Edit user name:', user.name);
      if (name !== null) user.name = name;
      const email = prompt('Edit email:', user.email);
      if (email !== null) user.email = email;
      const avatar = prompt('Edit avatar path:', user.avatar);
      if (avatar !== null) user.avatar = avatar;
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
      renderUsers(filteredUsers);
    }
  
    function deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== id);
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        const maxPage = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
        if (currentPage > maxPage) currentPage = maxPage;
        renderUsers(filteredUsers);
        renderPagination(filteredUsers);
      }
    }
  
    function toggleStatus(id, action) {
      const user = users.find(u => u.id === id);
      if (user) {
        user.status = action === 'block' ? 'Inactive' : 'Active';
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        renderUsers(filteredUsers);
      }
    }
  
    // Search functionality
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
      currentPage = 1; // Reset to first page on new search
      renderUsers(filteredUsers);
      renderPagination(filteredUsers);
    });
  
    document.querySelector('.add-post').addEventListener('click', addUser);
  
    tbody.addEventListener('click', e => {
      const id = Number(e.target.dataset.id);
      if (e.target.classList.contains('block-btn')) {
        toggleStatus(id, 'block');
      } else if (e.target.classList.contains('unblock-btn')) {
        toggleStatus(id, 'unblock');
      } else if (e.target.classList.contains('edit')) {
        editUser(id);
      } else if (e.target.classList.contains('delete')) {
        deleteUser(id);
      }
    });
  
    renderPagination();
    renderUsers();
  });