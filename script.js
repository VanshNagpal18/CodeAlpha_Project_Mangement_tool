const modal = document.getElementById('taskModal');
const openBtn = document.getElementById('addTaskBtn');
const closeBtn = document.querySelector('.close');
const saveBtn = document.getElementById('saveTask');

openBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = 'none';
};

saveBtn.onclick = () => {
  const title = document.getElementById('taskTitle').value;
  const status = document.getElementById('taskStatus').value;

  if (title.trim() === '') return alert('Enter a task title.');

  const card = document.createElement('div');
  card.className = 'task-card';
  card.innerText = title;

  if (status === 'todo') {
    document.getElementById('todoList').appendChild(card);
  } else if (status === 'inProgress') {
    document.getElementById('inProgressList').appendChild(card);
  } else {
    document.getElementById('doneList').appendChild(card);
  }

  document.getElementById('taskTitle').value = '';
  modal.style.display = 'none';
};
