document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
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
=======
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

  // Load users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, name: 'Nam', email: 'NamVen@gmail.com', password: 'password123', role: 'user', status: 'Active', active: 'Active', avatar: '../images/nam.jpg' },
    { id: 2, name: 'Bà Hòa', email: 'Baho@gmail.com', password: 'password123', role: 'user', status: 'Active', active: 'Active', avatar: '../images/hoa.jpg' },
    { id: 3, name: 'Anh Đào', email: 'AnhDaoX@gmail.com', password: 'password123', role: 'user', status: 'Active', active: 'Active', avatar: '../images/dao.jpg' },
  ];

  let currentPage = 1;
  const itemsPerPage = 5;

  const tbody = document.querySelector('#user-table');
  const pagination = document.querySelector('.pagination');
  const searchInput = document.querySelector('.search-input');

  // Function to save users to localStorage
  function saveUsers() {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
  }

  // Function to show confirmation dialog
  function showConfirm(message, callback) {
    // Remove any existing confirm dialogs
    const existingConfirms = document.querySelectorAll('.confirm-dialog');
    existingConfirms.forEach(dialog => dialog.remove());

    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 5px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      text-align: center;
      min-width: 300px;
    `;
    dialog.innerHTML = `
      <p style="margin-bottom: 20px; color: #333;">${message}</p>
      <button class="confirm-btn" style="background: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 3px; margin-right: 10px; cursor: pointer;">Confirm</button>
      <button class="cancel-btn" style="background: #ff4444; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer;">Cancel</button>
    `;
    document.body.appendChild(dialog);

    dialog.querySelector('.confirm-btn').addEventListener('click', () => {
      callback(true);
      dialog.remove();
    });
    dialog.querySelector('.cancel-btn').addEventListener('click', () => {
      callback(false);
      dialog.remove();
    });
  }

  // Function to show input modal
  function showInputModal(title, fields, callback) {
    // Remove any existing input modals
    const existingModals = document.querySelectorAll('.input-modal');
    existingModals.forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'input-modal';
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 5px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      text-align: center;
      min-width: 300px;
    `;
    let html = `<h3 style="margin-bottom: 20px; color: #333;">${title}</h3>`;
    fields.forEach(field => {
      html += `
        <div style="margin-bottom: 15px; text-align: left;">
          <label style="display: block; margin-bottom: 5px; color: #333;">${field.label}</label>
          <input type="text" class="modal-input" data-field="${field.name}" value="${field.value || ''}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px;">
        </div>
      `;
    });
    html += `
      <button class="save-btn" style="background: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 3px; margin-right: 10px; cursor: pointer;">OK</button>
      <button class="cancel-btn" style="background: #ff4444; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer;">Cancel</button>
    `;
    modal.innerHTML = html;
    document.body.appendChild(modal);

    modal.querySelector('.save-btn').addEventListener('click', () => {
      const values = {};
      modal.querySelectorAll('.modal-input').forEach(input => {
        values[input.dataset.field] = input.value;
      });
      callback(values);
      modal.remove();
    });
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      callback(null);
      modal.remove();
    });
  }

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
        <td><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Avatar" class="avatar-small"> ${user.name}</td>
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
    showInputModal('Add User', [
      { name: 'name', label: 'Name', value: '' },
      { name: 'email', label: 'Email', value: '' },
      { name: 'avatar', label: 'Avatar Path', value: '../images/default.jpg' },
      { name: 'password', label: 'Password', value: '' }
    ], (values) => {
      if (values && values.name) {
        const newUser = {
          id: Date.now(),
          name: values.name,
          email: values.email || '',
          password: values.password || 'default123', // Default password if not provided
          role: 'user',
          status: 'Active',
          active: 'Active',
          avatar: values.avatar || '../images/default.jpg'
        };
        users.push(newUser);
        saveUsers();
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        renderPagination(filteredUsers);
        goToPage(Math.ceil(filteredUsers.length / itemsPerPage), filteredUsers);
      }
    });
  }

  function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    showInputModal('Edit User', [
      { name: 'name', label: 'Name', value: user.name },
      { name: 'email', label: 'Email', value: user.email },
      { name: 'avatar', label: 'Avatar Path', value: user.avatar }
    ], (values) => {
      if (values) {
        if (values.name !== null) user.name = values.name;
        if (values.email !== null) user.email = values.email;
        if (values.avatar !== null) user.avatar = values.avatar;
        saveUsers();
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        renderUsers(filteredUsers);
      }
    });
  }

  function deleteUser(id) {
    showConfirm('Are you sure you want to delete this user?', (confirmed) => {
      if (confirmed) {
        users = users.filter(u => u.id !== id);
        saveUsers();
>>>>>>> 3a2ead1 (buoi_cuoi)
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        const maxPage = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
        if (currentPage > maxPage) currentPage = maxPage;
        renderUsers(filteredUsers);
        renderPagination(filteredUsers);
      }
<<<<<<< HEAD
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
=======
    });
  }

  function toggleStatus(id, action) {
    const user = users.find(u => u.id === id);
    if (user) {
      user.status = action === 'block' ? 'Inactive' : 'Active';
      user.active = user.status; // Sync active with status for consistency with login.js
      saveUsers();
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
>>>>>>> 3a2ead1 (buoi_cuoi)
