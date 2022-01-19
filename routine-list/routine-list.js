import { checkAuth, logout, getAllRoutines } from '../fetch-utils.js';
import { renderRoutines } from '../render-utils.js';

checkAuth();

const routineListEl = document.querySelector('.display-routine-list');
const createRoutineBtnEl = document.querySelector('.create-routine-btn');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    const routines = await getAllRoutines();
    for (let routine of routines) {
        const listOfRoutinesEl = renderRoutines(routine);
        routineListEl.append(listOfRoutinesEl);
    }
});

createRoutineBtnEl.addEventListener('click', () => {
    window.location.href = '../routine-create';
});




