document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskText && dueDate) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ taskText, dueDate, priority });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Medium';
        window.location.href = 'homepage.html';
    }
});
