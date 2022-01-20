// imports
import { getOneRoutineAndExercises, createRoutineName, addExerciseToRoutine, getAllExercise, logout, checkAuth } from '../fetch-utils.js';

// grab the DOM
const formEL = document.querySelector('#routine-form');
const exercisesListEL = document.querySelector('.exercises-list');
const exerciseDropdownEL = document.querySelector('#exercise-dropdown');
const addExerciseBtnEL = document.querySelector('.add-exercise-btn');
const redirectRoutineBtnEL = document.querySelector('.redirect-routine-btn');
const routineNameEL = document.querySelector('.routine-name');
const logoutButton = document.getElementById('logout');
const nameInputEL = document.getElementById('name-input');
const nameButtonEL = document.getElementById('name-button');

let routineID = 0;



checkAuth();

window.addEventListener('load', async() => {
    const exercises = await getAllExercise();

    for (let exercise of exercises) {
        const optionEL = document.createElement('option');

        optionEL.textContent = `${exercise.name} - ${exercise.duration} seconds`;
        optionEL.value = exercise.id;

        exerciseDropdownEL.append(optionEL);
    }

    exerciseDropdownEL.disabled = true;
    addExerciseBtnEL.disabled = true;
    redirectRoutineBtnEL.disabled = true;
});

formEL.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(formEL);
    const name = data.get('routine-name');
    const userRoutineObj = await createRoutineName(name);
    routineID = userRoutineObj.id;

    routineNameEL.textContent = userRoutineObj.name;

    formEL.reset();

    exerciseDropdownEL.disabled = false;
    addExerciseBtnEL.disabled = false;
    redirectRoutineBtnEL.disabled = false;

    nameInputEL.disabled = true;
    nameButtonEL.disabled = true;

});

addExerciseBtnEL.addEventListener('click', async() => {
    const exerciseID = exerciseDropdownEL.value;

    const addedExercise = await addExerciseToRoutine(routineID, exerciseID);

    //fetch and display this routines list of exercises
    fetchAndDisplayExercises(routineID);
});

async function fetchAndDisplayExercises(routineID) {
    const exercises = await getOneRoutineAndExercises(routineID);
    // console.log(exercises[0].routines.exercises);

    exercisesListEL.textContent = '';
    for (let exercise of exercises[0].routines.exercises) {
        const exerciseEl = document.createElement('div');
        const exerciseNameEl = document.createElement('p');

        exerciseNameEl.textContent = `${exercise.name} - ${exercise.duration} seconds`;
        exerciseEl.classList.add('exercise');

        exerciseEl.append(exerciseNameEl);

        exercisesListEL.append(exerciseEl);
    }
}

// add event listener for this routine detail page
redirectRoutineBtnEL.addEventListener('click', ()=> {
    window.location.href = `../routine-detail/?id=${routineID}`;
});


logoutButton.addEventListener('click', () => {
    logout();
});