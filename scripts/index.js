const days = document.querySelectorAll('.day__tasks');
const inputForm = document.querySelector('.form__input');
const buttonConfirm = document.querySelector('.form__button');
const form = document.querySelector('.form');


//Create task
function createTask(){
  const task = document.querySelector('#template').content.querySelector('.task').cloneNode(true);
  const taskName = task.querySelector('.task__title');
  taskName.textContent = inputForm.value;
  clearInput(inputForm);
  copyTask(task);
  return task;
}

//Add task on page
function addTaskToPage(evt){
  evt.preventDefault();
  days[0].append(createTask());
}

//Clear input
function clearInput(field){
  field.value = '';
}

//Copy task text to input
function copyTask(elem){
  elem.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('task__title'))
    inputForm.value = evt.target.textContent.trim();
  })
}

//Listeners delete btn click-copy dblclick-edit
function handleEventListeners(){
  const tasksSet = document.querySelectorAll('.task');
  tasksSet.forEach(elem => {
    const deleteButton = elem.querySelector('.task__button_type_delete');
    deleteButton.addEventListener('click', () => elem.remove());
    elem.removeEventListener('dblclick', editTask);
    elem.addEventListener('dblclick', editTask);
  })

}

function editTask(){
  const elem = this;
  if(!elem.classList.contains('edit')){
    elem.classList.add('edit');
    const text = elem.querySelector('.task__title');
    const input = document.createElement('input');
    input.classList.add('task__input');
    elem.prepend(input)
    input.value = text.textContent;
    text.remove();
    input.addEventListener('blur', () => {
      const text = document.createElement('h2');
      text.classList.add('task__title');
      text.textContent = input.value;
      input.remove()
      elem.prepend(text);
      elem.classList.remove('edit');
      inputForm.value = '';
    })
  }
}

buttonConfirm.addEventListener('click', (evt) => {
  addTaskToPage(evt);
  handleEventListeners()
});


