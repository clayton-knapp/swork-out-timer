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



checkAuth();

// {"message":"new row violates row-level security policy for table \"routines\"","code":"42501","details":null,"hint":null}
// {"message":"new row violates row-level security policy for table \"routines\"","code":"42501","details":null,"hint":null}


formEL.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(formEL);
    const name = data.get('routine-name');
    const createName = await createRoutineName(name);
    console.log('🚀 ~ file: routine-create.js ~ line 19 ~ formEL.addEventListener ~ createName', createName);
    formEL.reset();
});


window.addEventListener('load', async() => {
    const exercises = await getAllExercise();
    console.log('🚀 ~ file: routine-create.js ~ line 33 ~ window.addEventListener ~ exercises', exercises);

    for (let exercise of exercises) {
        const optionEL = document.createElement('option');

        optionEL.textContent = `${exercise.name} - ${exercise.duration} seconds`;
        optionEL.value = exercise.id;

        exerciseDropdownEL.append(optionEL);
    }
});



logoutButton.addEventListener('click', () => {
    logout();
});