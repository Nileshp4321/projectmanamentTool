let projects = [];
let chatMessages = [];

function createProject() {
  const projectNameInput = document.getElementById('projectName');
  const projectName = projectNameInput.value.trim();

  if (projectName !== '') {
    const project = {
      name: projectName,
      tasks: []
    };

    projects.push(project);

    renderProjects();
    projectNameInput.value = '';
  }
}

function renderProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  projects.forEach((project, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = project.name;
    li.addEventListener('click', () => renderTasks(index));
    projectList.appendChild(li);
  });
}

function renderTasks(projectIndex) {
  const taskListContainer = document.getElementById('taskList');
  taskListContainer.innerHTML = '';

  const project = projects[projectIndex];

  const taskList = document.createElement('ul');
  taskList.className = 'list-group task-list';

  project.tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = task;
    taskList.appendChild(li);
  });

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.className = 'form-control';
  taskInput.placeholder = 'Enter a task';

  const addTaskButton = document.createElement('button');
  addTaskButton.className = 'btn btn-primary mt-2';
  addTaskButton.innerText = 'Add Task';
  addTaskButton.addEventListener('click', () => addTask(projectIndex, taskInput.value));

  taskListContainer.appendChild(taskList);
  taskListContainer.appendChild(taskInput);
  taskListContainer.appendChild(addTaskButton);
}

function addTask(projectIndex, task) {
  const project = projects[projectIndex];
  project.tasks.push(task);

  renderTasks(projectIndex);
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();

  if (message !== '') {
    chatMessages.push(message);

    renderChatMessages();
    chatInput.value = '';
  }
}

function renderChatMessages() {
  const chatMessagesTextArea = document.getElementById('chatMessages');
  chatMessagesTextArea.value = chatMessages.join('\n');
}

document.getElementById('projectName').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    createProject();
  }
});

document.getElementById('chatInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

renderProjects();
