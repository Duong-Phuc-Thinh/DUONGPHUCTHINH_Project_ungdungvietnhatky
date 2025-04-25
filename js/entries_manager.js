document.getElementById("add-category-btn").addEventListener("click", function() {
    const categoryName = document.getElementById("category-name").value;
    
    if (categoryName) {
        const tableBody = document.getElementById("category-table");
        
        const row = document.createElement("tr");
        
        const idCell = document.createElement("td");
        idCell.textContent = tableBody.children.length + 1;
        row.appendChild(idCell);
        
        const nameCell = document.createElement("td");
        nameCell.textContent = categoryName;
        row.appendChild(nameCell);
        
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
        row.appendChild(actionsCell);
        
        tableBody.appendChild(row);
        
        document.getElementById("category-name").value = ""; // Clear input field
    } else {
        alert("Please enter a category name.");
    }
});

document.getElementById("category-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const row = event.target.closest("tr");
        row.remove();
    }
    if (event.target.classList.contains("edit-btn")) {
        const row = event.target.closest("tr");
        const newName = prompt("Edit category name:", row.children[1].textContent);
        
        if (newName) {
            row.children[1].textContent = newName;
        }
    }
});
