document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const taskList = document.getElementById('task-list');

    function addTask(task, dueDate, priority) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task} - Due: ${dueDate} - Priority: ${priority}</span>
            <div>
                <button onclick="toggleDone(this)">Done</button>
                <button onclick="removeTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.toggleDone = (button) => {
        const li = button.parentElement.parentElement;
        li.classList.toggle('done');
    }

    window.removeTask = (button) => {
        const li = button.parentElement.parentElement;
        li.remove();
    }
});
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskText && dueDate) {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ${taskText} - ${dueDate}
            <span class="priority-tag priority-${priority.toLowerCase()}">${priority}</span>
            <button>Done</button>
        `;

        listItem.querySelector('button').addEventListener('click', function() {
            listItem.classList.toggle('done');
        });

        taskList.appendChild(listItem);

        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Medium';
    }
});
