const days = document.querySelectorAll('.day__tasks');
const input = document.querySelector('.form__input');
const buttonConfirm = document.querySelector('.form__button');
const form = document.querySelector('.form');

function createTask(){
  const task = document.querySelector('#template').content.querySelector('.task').cloneNode(true);
  return task;
}

function addTaskToPage(evt){
  evt.preventDefault();
  days[0].append(createTask());
}


buttonConfirm.addEventListener('click', addTaskToPage);