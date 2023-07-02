const days = document.querySelectorAll('.day__tasks');
const inputForm = document.querySelector('.form__input');
const buttonConfirm = document.querySelector('.form__button');
const form = document.querySelector('.form');
const daysWeek = document.querySelectorAll('.day');
const dayNames = document.querySelectorAll('.day__title');

//Select day for task
function selectDay(set){
  set.forEach(day => {
    day.addEventListener('click', (evt) => {
      if(evt.target.closest('.day__title')){
        const checkbox = day.querySelector('.day__input');
        checkbox.checked = !checkbox.checked;
        day.classList.toggle('day_active')
      }
    })
  })
}

selectDay(daysWeek);


//Create task, add drag attribute. Add drag listeners.
function createTask(){
  const task = document.querySelector('#template').content.querySelector('.task').cloneNode(true);
  const taskName = task.querySelector('.task__title');
  taskName.textContent = inputForm.value;
  copyTask(task);
  task.setAttribute('draggable', true)
  task.addEventListener('dragstart', startDrag);
  task.addEventListener('dragend', endDrag);
  return task;
}

//Add task on page
function addTask(evt, days){
  evt.preventDefault();
  days.forEach(day => {
    const checkbox = day.querySelector('input');
    if(checkbox.checked){
      const taskDay = day.querySelector('.day__tasks');
      taskDay.append(createTask())
    }
  })
  clearInput(inputForm);
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

//delete task
function deleteTask(element){
  const deleteButton = element.querySelector('.task__button_type_delete');
  deleteButton.addEventListener('click', () => element.remove());
}

//Listeners delete btn click-copy dblclick-edit
function handleEventListeners(){
  const tasksSet = document.querySelectorAll('.task');
  tasksSet.forEach(elem => {
    deleteTask(elem);
    const doneButton = elem.querySelector('.task__button_type_done');

    doneButton.removeEventListener('click', doneTask);
    doneButton.addEventListener('click', doneTask);
    //Listeners for edit tasks.
    // elem.removeEventListener('dblclick', editTask);
    // elem.addEventListener('dblclick', editTask);
  })
}

//Function for button 'done'. Find parent (task) and change color.
function doneTask(){
  const button = this;
  // const taskElement = button.parentNode.parentNode;
  // taskElement.classList.toggle('task_done')
  const taskElement = button.closest('.task');
  taskElement.classList.toggle('task_done');
}

//Function edit task. work not correct. dbl work on all task, need only on text.  need fix it.
//If use parentNode or closest work only 1 time.
function editTask(){
  const elem = this;
  // const elem = text.parentNode;
  if(!elem.classList.contains('edit')){
    elem.classList.add('edit');
    const text = elem.querySelector('.task__title');
    const input = document.createElement('input');
    input.classList.add('task__input');
    elem.prepend(input);
    input.value = text.textContent;
    text.remove();
    input.addEventListener('blur', () => {
      const text = document.createElement('h2');
      text.classList.add('task__title');
      text.textContent = input.value;
      input.remove();
      elem.prepend(text);
      elem.classList.remove('edit');
      clearInput(inputForm);
    })
  }
}

buttonConfirm.addEventListener('click', (evt) => {
  addTask(evt, daysWeek);
  handleEventListeners();
});


//Drag and Drop
//Find all task on page.
const tasks = document.querySelectorAll('.task');

//Add listener to all tasks on page.
tasks.forEach(task => {
  task.addEventListener('dragstart', startDrag);
  task.addEventListener('dragend', endDrag);
})

//Add listeners to all days on page.
days.forEach(day => {
  day.addEventListener('dragover', overDrag)
  day.addEventListener('drop', dropDrag)
})

//Start drag use class to append after move done.
function startDrag(evt){
  evt.target.classList.add('drag');
}
//Finish drag.
function endDrag(evt){
  evt.target.classList.remove('drag');
}

//Drag over.
function overDrag(evt){
  evt.preventDefault();
}

//Drop drag. this = day. dragElem find with class from startDrag func.
function dropDrag(){
  const dragElem = document.querySelector('.drag')
  this.append(dragElem);
}
