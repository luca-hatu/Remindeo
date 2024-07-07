document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    const dueDateFilter = document.getElementById('due-date-filter');
    const priorityFilter = document.getElementById('priority-filter');

    // Function to render tasks based on filters
    function renderTasks() {
        let filteredTasks = tasks.slice(); // Create a copy of tasks array

        // Apply due date filter
        const dueDateOption = dueDateFilter.value;
        switch (dueDateOption) {
            case 'today':
                filteredTasks = filteredTasks.filter(task => isToday(new Date(task.dueDate)));
                break;
            case 'tomorrow':
                filteredTasks = filteredTasks.filter(task => isTomorrow(new Date(task.dueDate)));
                break;
            case 'week':
                filteredTasks = filteredTasks.filter(task => isWithinNext7Days(new Date(task.dueDate)));
                break;
            default:
                // No filter applied
                break;
        }

        // Apply priority filter
        const priorityOption = priorityFilter.value.toLowerCase();
        if (priorityOption !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority.toLowerCase() === priorityOption);
        }

        // Clear existing task list
        taskList.innerHTML = '';

        // Render filtered tasks
        filteredTasks.forEach(task => {
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
                const index = tasks.findIndex(item => item.taskText === task.taskText && item.dueDate === task.dueDate);
                if (index !== -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks(); // Re-render tasks after deletion
                }
            });

            taskList.appendChild(listItem);
        });
    }

    // Event listeners for filters
    dueDateFilter.addEventListener('change', renderTasks);
    priorityFilter.addEventListener('change', renderTasks);

    // Function to check if a date is today, tomorrow, or within the next 7 days
    function isToday(someDate) {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
               someDate.getMonth() === today.getMonth() &&
               someDate.getFullYear() === today.getFullYear();
    }

    function isTomorrow(someDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return someDate.getDate() === tomorrow.getDate() &&
               someDate.getMonth() === tomorrow.getMonth() &&
               someDate.getFullYear() === tomorrow.getFullYear();
    }

    function isWithinNext7Days(someDate) {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return someDate >= today && someDate <= nextWeek;
    }

    // Initial render of tasks
    renderTasks();
});


    document.getElementById('add-task-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    const widgetsContainer = document.getElementById('widgets-container');
    const settingsButton = document.getElementById('settings-button');
    const settingsPopup = document.getElementById('settings-popup');
    const saveSettingsButton = document.getElementById('save-settings');
    const widgetOptions = {
        'clock-widget-option': 'clock-widget',
        'news-widget-option': 'news-widget'
    };
    
    function initializeWidgets() {
        widgetsContainer.innerHTML = '';
        const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
        savedWidgets.forEach(widgetId => {
            addWidget(widgetId);
        });
    }


    function addWidget(widgetId) {
        const widget = document.createElement('div');
        widget.className = `widget ${widgetId}`;
        widget.setAttribute('draggable', false);
        widget.setAttribute('data-widget-id', widgetId);
        widgetsContainer.appendChild(widget);

        switch (widgetId) {
            case 'clock-widget':
                widget.innerHTML = '<div id="clock"></div>';
                updateClock();
                setInterval(updateClock, 1000);
                break;
            case 'news-widget':
                updateNews();
                break;
        }
    }
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = timeString;
    }
    
    function updateNews() {
        const apiKey = '830633f2ddc44f2a9757d476105c9f2b';
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const newsElement = document.querySelector('.news-widget');
                const articles = data.articles.slice(0, 5); 
                let newsHTML = '<h2>Top News</h2>';
                articles.forEach(article => {
                    newsHTML += `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`;
                });
                newsElement.innerHTML = newsHTML;
            })
            .catch(error => console.error('Error fetching news:', error));
    }

    settingsButton.addEventListener('click', function() {
        settingsPopup.classList.toggle('hidden');
    });
    saveSettingsButton.addEventListener('click', function() {
        const selectedWidgets = [];
        for (const option in widgetOptions) {
            if (document.getElementById(option).checked) {
                selectedWidgets.push(widgetOptions[option]);
            }
        }
        localStorage.setItem('widgets', JSON.stringify(selectedWidgets));
        initializeWidgets();
        settingsPopup.classList.add('hidden');
    });

    initializeWidgets();
});
