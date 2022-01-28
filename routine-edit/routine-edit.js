import { checkAuth, logout, updateRoutineName, getOneRoutineAndExercises, deleteOneRoutineAndExercises, deleteOneRoutine } from '../fetch-utils.js';
import { renderExercises, renderRoutinesInEdit } from '../render-utils.js';
// import { renderRoutines } from '../render-utils.js';

checkAuth();

const routineListEl = document.querySelector('.display-routine-selection');
const exerciseListEl = document.querySelector('.exercises-list-Delete');
const formEl = document.querySelector('form');
// const createRoutineBtnEl = document.querySelector('.create-routine-btn');
const logoutButton = document.getElementById('logout');
const deleteButton = document.getElementById('delete-routine');



let id = 0;



logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async() => {
  
    id = routineListEl.value;
    // seems like this returns a single routine, and not 'exercises'?
    const [routine] = await getOneRoutineAndExercises(id);


    if (confirm(`Are you sure you want to delete Routine: ${routine.routines.name}`)) {
        await deleteOneRoutineAndExercises(id);
        await deleteOneRoutine(id);
        routineListEl.textContent = '';
        await renderRoutinesInEdit(routineListEl);
        let newId = routineListEl.value;
        const newExercises = await getOneRoutineAndExercises(newId);

        renderExerciseOptions(newExercises);
    }
  
  // routineListEl.textContent = '';
  // await renderRoutinesInEdit(routineListEl);
  // renderExerciseOptions(exercises)


    // {"message":"update or delete on table \"routines\" violates foreign key constraint \"junctions_routine_id_fkey\" on table \"junctions\"","code":"23503","details":"Key is still referenced from table \"junctions\".","hint":null}
});


routineListEl.addEventListener('change', async() => {
    exerciseListEl.textContent = '';
    id = routineListEl.value;
    const exercises = await getOneRoutineAndExercises(id);

  // if (id) {
  //   id = routineListEl.value;
    
  // } else {
  //   console.log('hi');
  // }

    renderExerciseOptions(exercises);
});



window.addEventListener('load', async() => {

    await renderRoutinesInEdit(routineListEl);

  // const exercises = await getOneRoutineAndExercises(59);
  
    id = routineListEl.value;
    const exercises = await getOneRoutineAndExercises(id);
  // console.log("🚀 ~ file: routine-edit.js ~ line 22 ~ routineListEl.addEventListener ~ exercises", exercises)


    renderExerciseOptions(exercises);


});


formEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    const name = data.get('newName');
    
    id = routineListEl.value;
    
    await updateRoutineName(name, id);
    routineListEl.textContent = '';
    await renderRoutinesInEdit(routineListEl);
    let newId = routineListEl.value;
    // again, seems like a routine, not an exercise, according to the function name?
    const [routine] = await getOneRoutineAndExercises(newId);
    renderExerciseOptions(routine);
    formEl.reset();

});



// formEl.addEventListener('submit', async(e) => {
//     e.preventDefault();
//     const data = new FormData(formEl);
//     const name = data.get('newName');

//     id = routineListEl.value;

//     await updateRoutineName(name, id);
//     routineListEl.textContent = '';
//     await renderRoutinesInEdit(routineListEl);

// });


function renderExerciseOptions(routine) {
    exerciseListEl.textContent = '';
    for (const exercise of routine.routines.exercises) {
        const wrapper = document.createElement('div');
        const deleteIcon = document.createElement('img');
    // deleteIcon.src = '../assets/bin.png';
        wrapper.classList.add('wrapper');
        deleteIcon.classList.add('delete');
        const exerciseWorkout = renderExercises(exercise);

        wrapper.append(exerciseWorkout, deleteIcon);



        exerciseListEl.append(wrapper);

    }
}


// createRoutineBtnEl.addEventListener('click', () => {
//     window.location.href = '../routine-create';
// });

