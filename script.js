document.getElementById('add-task').addEventListener('click', async () => {
    let description = document.getElementById('new-task').value;
    if (description) {
        try {
            const response = await fetch("https://note-extension-git-main-ajith-cs-projects.vercel.app/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: description, favorited: false })
            });
            document.getElementById('new-task').value = "";
            // Re-fetch and re-render todos to ensure updated ordering
            getTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    } else {
        alert("Add a Note!");
    }
});

const getTodos = async () => {
    try {
        const response = await fetch("https://note-extension-git-main-ajith-cs-projects.vercel.app/todos");
        const data = await response.json();
        renderTodos(data);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};

const renderTodos = (todos) => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Create the favorite icon
        const favIcon = document.createElement('i');
        favIcon.className = todo.favorited ? 'fa-solid fa-star fav-icon' : 'fa-regular fa-star fav-icon';

        // Click event to toggle star
        favIcon.addEventListener('click', async () => {
            const newFavoritedStatus = !todo.favorited;
            console.log(`Updating todo with id: ${todo.todo_id}, favorited: ${newFavoritedStatus}`);
        
            try {
                const response = await fetch(`https://note-extension-git-main-ajith-cs-projects.vercel.app/todos/${todo.todo_id}`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ favorited: newFavoritedStatus })
                });
        
                if (response.ok) {
                    // Re-fetch and re-render todos to ensure updated ordering
                    getTodos();
                } else {
                    console.error('Error updating favorited status with:', response.statusText);
                }
            } catch (error) {
                console.error("Error updating favorited status:", error);
            }
        });

        // Add the task description
        const taskContent = document.createElement('span');
        taskContent.textContent = todo.description;
        taskContent.className = 'task-content';

        // Create the delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`https://note-extension-git-main-ajith-cs-projects.vercel.app/${todo.todo_id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    getTodos();
                } else {
                    console.error('Error deleting todo:', response.statusText);
                }
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        });

        // Append elements to list item
        li.appendChild(favIcon);
        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        // Append list item to task list
        taskList.appendChild(li);
    });
};

// Initial call to load todos
getTodos();
