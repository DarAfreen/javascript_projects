   // Get elements
   const taskInput = document.getElementById("task-input");
   const addTaskBtn = document.getElementById("add-task-btn");
   const taskList = document.getElementById("task-list");

   // List of tasks
   let tasks = [];

   // When the button is clicked, add a task
   addTaskBtn.addEventListener("click", function() {
       let taskText = taskInput.value.trim(); // Get the input text
       if (taskText) {  // If input is not empty
           tasks.push({ text: taskText, completed: false }); // Add task to list
           taskInput.value = ""; // Clear input field
           showTasks();  // Display updated task list
       }
   });

   // Display tasks
   function showTasks() {
       taskList.innerHTML = ""; // Clear the list
       tasks.forEach(function(task, index) {
           let listItem = document.createElement("li");
           listItem.innerHTML = `
               <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
               <button onclick="deleteTask(${index})">Delete</button>
               <button onclick="toggleTask(${index})">Complete</button>
           `;
           taskList.appendChild(listItem); // Add task to the list
       });
   }

   // Delete task
   function deleteTask(index) {
       tasks.splice(index, 1); // Remove task
       showTasks();  // Update display
   }

   // Mark task as complete or incomplete
   function toggleTask(index) {
       tasks[index].completed = !tasks[index].completed; // Toggle complete
       showTasks();  // Update display
   }