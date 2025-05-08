<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    let categories = [
      { id: 1, name: 'Cooking', status: 'Active' },
      { id: 2, name: 'IT', status: 'Inactive' },
    ];
  
    let currentPage = 1;
    const itemsPerPage = 5;
  
    const tbody = document.querySelector('#category-table');
    const pagination = document.querySelector('.pagination');
    const addBtn = document.getElementById('add-category-btn');
  
    function renderCategories() {
      tbody.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageCategories = categories.slice(start, end);
  
      pageCategories.forEach(category => {
        const tr = document.createElement('tr');
        tr.dataset.id = category.id;
        tr.innerHTML = `
          <td>${category.id}</td>
          <td>${category.name}</td>
          <td><span class="badge ${category.status.toLowerCase()}">${category.status}</span></td>
          <td>
            <select class="status-select">
              <option value="Active" ${category.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${category.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </td>
          <td class="actions">
            <button class="edit" data-id="${category.id}">Edit</button>
            <button class="delete" data-id="${category.id}">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  
    function renderPagination() {
      pagination.innerHTML = '';
      const totalPages = Math.ceil(categories.length / itemsPerPage);
      if (totalPages <= 1) return;
  
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
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
      nextBtn.textContent = 'Next';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
      pagination.appendChild(nextBtn);
    }
  
    function goToPage(page) {
      currentPage = page;
      renderCategories();
      renderPagination();
    }
  
    function addCategory() {
      const name = document.getElementById('category-name').value;
      if (!name) {
        alert('Please enter a category name.');
        return;
      }
      const newCategory = {
        id: Date.now(),
        name: name,
        status: 'Active'
      };
      categories.push(newCategory);
      document.getElementById('category-name').value = '';
      renderPagination();
      goToPage(Math.ceil(categories.length / itemsPerPage));
    }
  
    function editCategory(id) {
      const category = categories.find(c => c.id === id);
      if (!category) return;
      const name = prompt('Edit category name:', category.name);
      if (name !== null) category.name = name;
      renderCategories();
    }
  
    function deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        categories = categories.filter(c => c.id !== id);
        const maxPage = Math.ceil(categories.length / itemsPerPage) || 1;
        if (currentPage > maxPage) currentPage = maxPage;
        renderCategories();
        renderPagination();
      }
    }
  
    function changeStatus(id, newStatus) {
      const category = categories.find(c => c.id === id);
      if (category) {
        category.status = newStatus;
        renderCategories();
      }
    }
  
    addBtn.addEventListener('click', addCategory);
  
    tbody.addEventListener('click', e => {
      const id = Number(e.target.dataset.id);
      if (e.target.classList.contains('edit')) {
        editCategory(id);
      } else if (e.target.classList.contains('delete')) {
        deleteCategory(id);
      }
    });
  
    tbody.addEventListener('change', e => {
      if (e.target.classList.contains('status-select')) {
        const id = Number(e.target.closest('tr').dataset.id);
        changeStatus(id, e.target.value);
      }
    });
  
    renderPagination();
    renderCategories();
  });
=======
// Hàm hiển thị thông báo (thêm nếu chưa có)
function showMessage(message, type = "success") {
  const msgBox = document.createElement("div");
  msgBox.textContent = message;
  msgBox.style.position = "fixed";
  msgBox.style.top = "20px";
  msgBox.style.right = "20px";
  msgBox.style.padding = "10px 20px";
  msgBox.style.backgroundColor = 
    type === "error" ? "#e74c3c" : 
    type === "warning" ? "#f1c40f" : "#2ecc71";
  msgBox.style.color = "#fff";
  msgBox.style.borderRadius = "8px";
  msgBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  msgBox.style.zIndex = 1000;
  document.body.appendChild(msgBox);
  setTimeout(() => msgBox.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Load categories from localStorage or use default data
  let categories = JSON.parse(localStorage.getItem('categories')) || [
    { id: 1, name: 'Cooking', status: 'Active' },
    { id: 2, name: 'IT', status: 'Inactive' },
  ];

  let currentPage = 1;
  const itemsPerPage = 5;

  const tbody = document.querySelector('#category-table');
  const pagination = document.querySelector('.pagination');
  const addBtn = document.getElementById('add-category-btn');

  // Function to save categories to localStorage
  function saveCategories() {
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
    }
  }

  // Function to update IDs to ensure sequential order
  function updateCategoryIds() {
    categories.forEach((category, index) => {
      category.id = index + 1;
    });
    saveCategories();
  }

  // Function to render categories with sequential STT
  function renderCategories() {
    tbody.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageCategories = categories.slice(start, end);

    pageCategories.forEach((category, index) => {
      const displayId = start + index + 1; // Calculate display STT for current page
      const tr = document.createElement('tr');
      tr.dataset.id = category.id;
      tr.innerHTML = `
        <td>${displayId}</td>
        <td>${category.name}</td>
        <td><span class="badge ${category.status.toLowerCase()}">${category.status}</span></td>
        <td>
          <select class="status-select">
            <option value="Active" ${category.status === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Inactive" ${category.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </td>
        <td class="actions">
          <button class="edit" data-id="${category.id}">Edit</button>
          <button class="delete" data-id="${category.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Function to render pagination
  function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
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
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    pagination.appendChild(nextBtn);
  }

  // Function to go to a specific page
  function goToPage(page) {
    currentPage = page;
    renderCategories();
    renderPagination();
  }

  // Function to add a new category
  function addCategory() {
    const name = document.getElementById('category-name').value;
    if (!name) {
      showMessage("Category name cannot be empty!", "error");
      return;
    }
    const newCategory = {
      id: categories.length + 1, // Set ID as the next sequential number
      name: name,
      status: 'Active'
    };
    categories.push(newCategory);
    saveCategories();
    document.getElementById('category-name').value = '';
    renderPagination();
    goToPage(Math.ceil(categories.length / itemsPerPage));
  }

  // Function to edit a category
  function editCategory(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    const name = prompt('Edit category name:', category.name);
    if (name !== null) {
      category.name = name;
      saveCategories();
      renderCategories();
    }
  }

  // Function to delete a category
  function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
      categories = categories.filter(c => c.id !== id);
      updateCategoryIds(); // Update IDs after deletion to maintain sequence
      const maxPage = Math.ceil(categories.length / itemsPerPage) || 1;
      if (currentPage > maxPage) currentPage = maxPage;
      renderCategories();
      renderPagination();
    }
  }

  // Function to change category status
  function changeStatus(id, newStatus) {
    const category = categories.find(c => c.id === id);
    if (category) {
      category.status = newStatus;
      saveCategories();
      renderCategories();
    }
  }

  addBtn.addEventListener('click', addCategory);

  tbody.addEventListener('click', e => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('edit')) {
      editCategory(id);
    } else if (e.target.classList.contains('delete')) {
      deleteCategory(id);
    }
  });

  tbody.addEventListener('change', e => {
    if (e.target.classList.contains('status-select')) {
      const id = Number(e.target.closest('tr').dataset.id);
      changeStatus(id, e.target.value);
    }
  });

  // Initial update of IDs and render
  updateCategoryIds();
  renderPagination();
  renderCategories();
});
>>>>>>> 3a2ead1 (buoi_cuoi)
