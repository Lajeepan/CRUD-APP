// Fetch items from the backend and display them
async function loadItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear the list before adding new items

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        
        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(item._id);
        
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}

// Handle form submission to create an item
document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;

    // Send data to backend
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemName })
    });

    if (response.ok) {
        document.getElementById('itemName').value = ''; // Clear input
        loadItems(); // Reload the item list
    }
});

// Delete item from the backend
async function deleteItem(id) {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadItems(); // Reload the item list
    }
}

// Initial load of items
loadItems();
