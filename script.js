document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, dueDateInput.value, priorityInput.value);
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Medium';
    });

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
