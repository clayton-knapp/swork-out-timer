import { checkAuth, logout, getAllRoutines, updateRoutineName } from '../fetch-utils.js';
import { renderRoutinesInEdit } from '../render-utils.js';
// import { renderRoutines } from '../render-utils.js';

checkAuth();

const routineListEl = document.querySelector('.display-routine-selection');
const formEl = document.querySelector('form');
// const createRoutineBtnEl = document.querySelector('.create-routine-btn');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

let id = 0;

window.addEventListener('load', async() => {
  // const routines = await getAllRoutines();
  renderRoutinesInEdit(routineListEl);

});

formEl.addEventListener('submit', async(e) => {
  e.preventDefault();
  const data = new FormData(formEl);
  const name = data.get('newName');

  id = routineListEl.value;

  await updateRoutineName(name, id);
  routineListEl.textContent = '';
  renderRoutinesInEdit(routineListEl)

});





// createRoutineBtnEl.addEventListener('click', () => {
//     window.location.href = '../routine-create';
// });

