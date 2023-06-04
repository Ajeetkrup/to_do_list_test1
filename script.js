// selecting the tasks from DOM
const tasksList = document.getElementById('list');

var tasks = []; //stoarge for tasks

//to enter task and add task
document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = document.querySelector("#input");
    addItem(input.value);
  }

});

document.querySelector("#add_item").addEventListener("click", () => {
  const input = document.querySelector("#input");
  addItem(input.value);
});

// function for adding task
function addItem(input) {
  if (input) {
    let temp = {
      id: Date.now().toString(),
      data: input,
      done: false
    }
    tasks.push(temp);
    document.querySelector("#input").value = "";
    list_render();
    alert('Task added successfully!');
  }
  else {
    alert('Please ! Enter the task.');
  }
}

//function for deleting task
function deleteTask(taskid) {
  let newtasks = tasks.filter(function (task) {
    return task.id != taskid;
  });

  tasks = newtasks;
  list_render();
  alert('Task deleted successfully!')
}

// function for moving task to done and undone
function taskToggle(taskid) {
  let newtasks = tasks.filter(function (task) {
    return task.id === taskid;
  });

  if (newtasks.length > 0) {
    let task = newtasks[0];

    task.done = !task.done;
    let ind = tasks.indexOf(taskid);
    tasks[ind] = task;
    taskCount();
    alert('Status of task changed successfully!')
  }
}

// function for to keep count of total tasks, done tasks, undone tasks
function taskCount() {
  let taskNumber = document.getElementById('taskNumber');
  let taskDone = document.getElementById('taskDone');
  let tasknotDone = document.getElementById('tasknotDone');

  let doneTasks = tasks.filter(task => task.done === true);

  console.log(doneTasks);
  taskNumber.innerHTML = tasks.length;
  taskDone.innerHTML = doneTasks.length;
  tasknotDone.innerHTML = tasks.length - doneTasks.length;
}

//function for rendering tasks to DOM
function list_render() {
  tasksList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let li = document.createElement('li');

    let taskData = task.data;
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="task-checkbox">
      <label for="${task.id}">${taskData.length >= 40 ? taskData.substr(0, 41) + "..." : taskData}</label>
      <img src="images/bin.svg" class="delete-task" data-id="${task.id}" />
    `;

    tasksList.appendChild(li);
  }
  taskCount();
}

//function for handling events for tasks
function handleevents(e) {
  if (e.target.className === 'task-checkbox') {
    taskToggle(e.target.id);
  }
  else if (e.target.className === 'delete-task') {
    deleteTask(e.target.dataset.id);
  }
}

//eventListener to listen to events for tasks
document.addEventListener('click', handleevents);