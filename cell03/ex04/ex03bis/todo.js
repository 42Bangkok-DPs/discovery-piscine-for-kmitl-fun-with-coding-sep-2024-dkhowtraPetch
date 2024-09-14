$(document).ready(function () {
    const $taskList = $('#ft_list');
    const $newTaskButton = $('#newTask');

    // Load existing tasks from cookies
    loadTasks();

    // Event listener for 'New' button
    $newTaskButton.on('click', function () {
        const taskText = prompt('Enter a new TO DO:');
        if (taskText) {
            addTask(taskText);
            saveTasks();
        }
    });

    // Function to add a new task to the DOM
    function addTask(taskText) {
        const $task = $('<div>').addClass('todo').text(taskText);

        // Add click event to remove task
        $task.on('click', function () {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                saveTasks();
            }
        });

        // Prepend to the list (add at the top)
        $taskList.prepend($task); // Ensure tasks are added in order
    }

    // Save tasks to cookies
    function saveTasks() {
        const tasks = $taskList.children().map(function () {
            return $(this).text();
        }).get();
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