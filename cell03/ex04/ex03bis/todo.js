document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('ft_list');
    const newTaskButton = document.getElementById('newTask');

    // Load existing tasks from cookies
    loadTasks();

    // Event listener for 'New' button
    newTaskButton.addEventListener('click', function () {
        const taskText = prompt('Enter a new TO DO:');
        if (taskText) {
            addTask(taskText);
            saveTasks();
        }
    });

    // Function to add a new task to the DOM
    function addTask(taskText) {
        const task = document.createElement('div');
        task.className = 'todo';
        task.textContent = taskText;

        // Add click event to remove task
        task.addEventListener('click', function () {
            const confirmDelete = confirm('Do you want to remove this TO DO?');
            if (confirmDelete) {
                task.remove();
                saveTasks();
            }
        });

        // Prepend to the list (add at the top)
        taskList.prepend(task);
    }

    // Save tasks to cookies
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => task.textContent);
        document.cookie = `tasks=${JSON.stringify(tasks)}; path=/; max-age=${60 * 60 * 24 * 7}`; // Save for 7 days
    }

    // Load tasks from cookies
    function loadTasks() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('tasks='))
            ?.split('=')[1];
        if (cookieValue) {
            const tasks = JSON.parse(cookieValue);
            tasks.forEach(taskText => addTask(taskText));
        }
    }
});
