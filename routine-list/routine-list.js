import { checkAuth, logout, getAllRoutines } from '../fetch-utils.js';
import { renderRoutine } from '../render-utils.js';

checkAuth();

const routineListEl = document.querySelector('.display-routine-list');
const createRoutineBtnEl = document.querySelector('.create-routine-btn');
const editRoutineBtnEl = document.querySelector('.edit-routine-btn');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const routines = await getAllRoutines();
    for (let routine of routines) {
        // small naming thing: this looks like it renders only a single routine, not a list
        const routineEl = renderRoutine(routine);
        routineEl.classList.add('routine-select-display');
        routineListEl.append(routineEl);
    }
});

createRoutineBtnEl.addEventListener('click', () => {
    window.location.href = '../routine-create';
});

editRoutineBtnEl.addEventListener('click', () => {
    window.location.href = '../routine-edit';
});

