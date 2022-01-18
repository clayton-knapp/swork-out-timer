// imports
import { getOneRoutineAndExercises, createRoutineName, addExerciseToRoutine, getAllExercise, logout, checkAuth } from '../fetch-utils.js';

// grab the DOM
const formEL = document.querySelector('#routine-form');
const routineExerciseEL = document.querySelector('.routine-exercises');
const exerciseDropdownEL = document.querySelector('#exercise-dropdown');
const addExerciseBtnEL = document.querySelector('.add-exercise-btn');
const redirectRoutineBtnEL = document.querySelector('.redirect-routine-btn');
const routineNameEL = document.querySelector('.routine-name');
const logoutButton = document.getElementById('logout');

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
});

formEL.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(formEL);
    const name = data.get('routine-name');
    const userRoutineObj = await createRoutineName(name);
    routineID = userRoutineObj.id;
    console.log(userRoutineObj);
    formEL.reset();
});

addExerciseBtnEL.addEventListener('click', async() => {
    const exerciseID = exerciseDropdownEL.value;

    const addedExercise = await addExerciseToRoutine(routineID, exerciseID);

    //fetch and display this routines list of exercises
});


// add event listener for this routine detail page




logoutButton.addEventListener('click', () => {
    logout();
});