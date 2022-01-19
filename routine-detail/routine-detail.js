import { checkAuth, getOneRoutineAndExercises, logout } from '../fetch-utils.js';

checkAuth();

const routineNameEl = document.querySelector('.routine-name');
const durationEl = document.querySelector('.duration');
const exerciseListEl = document.querySelector('.exercises-list');
const startWorkoutBtnEl = document.querySelector('.start-workout');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

let arr = [];

window.addEventListener('load', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const getRoutine = await getOneRoutineAndExercises(id);
    console.log(getRoutine[0].routines);
    const routineName = getRoutine[0].routines.name;
    routineNameEl.textContent = `${routineName}`;

    for (let duration of getRoutine[0].routines.exercises) {
        arr.push(duration.duration);
        let sum = 0;
        sum = arr.reduce((a, b) => {
            return a + b;
        });
        durationEl.textContent = `Duration: ${sum}`;
    }
});

