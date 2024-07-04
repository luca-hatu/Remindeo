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
    // Initialize widgets based on saved settings
    function initializeWidgets() {
        widgetsContainer.innerHTML = '';
        const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
        savedWidgets.forEach(widgetId => {
            addWidget(widgetId);
        });
    }

    // Add widget to the container
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
    // Update clock widget
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = timeString;
    }
     // Update news widget
    function updateNews() {
        const apiKey = '830633f2ddc44f2a9757d476105c9f2b';
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const newsElement = document.querySelector('.news-widget');
                const articles = data.articles.slice(0, 5); // Display top 5 articles
                let newsHTML = '<h2>Top News</h2>';
                articles.forEach(article => {
                    newsHTML += `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`;
                });
                newsElement.innerHTML = newsHTML;
            })
            .catch(error => console.error('Error fetching news:', error));
    }

    // Toggle settings popup
    settingsButton.addEventListener('click', function() {
        settingsPopup.classList.toggle('hidden');
    });

    // Save settings
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

    // Initialize widgets
    initializeWidgets();
});


