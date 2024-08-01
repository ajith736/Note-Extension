let submit = document.getElementById('add-task')

submit.addEventListener('click', async ()=> {
    let description = document.getElementById('new-task').value
    console.log(description);

    try {
        const response = await fetch("http://localhost:5000/todos",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ description: description })
        });
        document.getElementById('new-task').value = "";
        getTodos()
    } catch (error) {
        console.log(error);
    }
})

const getTodos = async () => {
    try {
        const response = await fetch("http://localhost:5000/todos");
        const data = await response.json();
        console.log(data);
        renderTodos(data);
    } catch (error) {
        console.log(error);
    }
};

const renderTodos = (todos) => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.description;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    getTodos(); 
                } else {
                    console.log('Error:', response.statusText);
                }
            } catch (error) {
                console.log(error);
            }
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
};

getTodos();

