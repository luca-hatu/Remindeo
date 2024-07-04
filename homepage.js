document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ${task.taskText} - ${task.dueDate}
            <span class="priority-tag priority-${task.priority.toLowerCase()}">${task.priority}</span>
            <button class="done-button"><img src="/images/tick.png" style="width: 20px; height: 20px;"></button>
            <button class="delete-button"><img src="/images/cross.png" style="width: 20px; height: 20px;"></button>
        `;

        listItem.querySelector('.done-button').addEventListener('click', function() {
            listItem.classList.toggle('done');
        });

        listItem.querySelector('.delete-button').addEventListener('click', function() {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskList.removeChild(listItem);
        });

        taskList.appendChild(listItem);
    });

    document.getElementById('add-task-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

