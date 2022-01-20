import { checkAuth, logout, getAllRoutines, updateRoutineName } from '../fetch-utils.js';
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
    const routines = await getAllRoutines();
    console.log("🚀 ~ file: routine-edit.js ~ line 19 ~ window.addEventListener ~ routines", routines)
    for (let routine of routines) {
      const optionEL = document.createElement('option');

      optionEL.textContent = `${routine.name}`;
      optionEL.value = routine.id;
      routineListEl.append(optionEL);
  }

});

formEl.addEventListener('submit', async(e) => {
  e.preventDefault();
  const data = new FormData(formEl);
  const name = data.get('newName');
  console.log("🚀 ~ file: routine-edit.js ~ line 34 ~ formEl.addEventListener ~ name", name)
  id = routineListEl.value;
  console.log("🚀 ~ file: routine-edit.js ~ line 35 ~ formEl.addEventListener ~ id", id)
  await updateRoutineName(name, id);
});



// createRoutineBtnEl.addEventListener('click', () => {
//     window.location.href = '../routine-create';
// });

