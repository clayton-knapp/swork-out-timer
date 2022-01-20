import { checkAuth, logout, getAllRoutines, updateRoutineName, getOneRoutineAndExercises, getAllRoutinesByUserID } from '../fetch-utils.js';
import { renderExercises, renderRoutinesInEdit } from '../render-utils.js';
// import { renderRoutines } from '../render-utils.js';

checkAuth();

const routineListEl = document.querySelector('.display-routine-selection');
const exerciseListEl = document.querySelector('.exercises-list-Delete');
const formEl = document.querySelector('form');
// const createRoutineBtnEl = document.querySelector('.create-routine-btn');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

let id = 0;

routineListEl.addEventListener('change', async() => {
  exerciseListEl.textContent = '';
  const exercises = await getOneRoutineAndExercises(id);
  console.log("🚀 ~ file: routine-edit.js ~ line 22 ~ routineListEl.addEventListener ~ exercises", exercises)
      id = routineListEl.value

  // if (id) {
  //   id = routineListEl.value;
    
  // } else {
  //   console.log('hi');
  // }

  renderExerciseOptions(exercises)
})



window.addEventListener('load', async(e) => {
  // const routines = await getAllRoutines();
  // const routines = await getAllRoutinesByUserID([0].id);
  // console.log("🚀 ~ file: routine-edit.js ~ line 22 ~ window.addEventListener ~ routines", routines)

 await renderRoutinesInEdit(routineListEl);

  // const exercises = await getOneRoutineAndExercises(59);

  // if (id === 0) {
  //   id = routineListEl.value
  //   const exercises = await getOneRoutineAndExercises(id)
  // }
  
  id = routineListEl.value
  const exercises = await getOneRoutineAndExercises(id);
  console.log("🚀 ~ file: routine-edit.js ~ line 22 ~ routineListEl.addEventListener ~ exercises", exercises)


  renderExerciseOptions(exercises)
  


  // if (exercises) {
  //   console.log('hi');
  // } else {
  //   console.log('bye');
  // }
  //   console.log("🚀 ~ file: routine-edit.js ~ line 25 ~ window.addEventListener ~ exercises", exercises)



});

formEl.addEventListener('submit', async(e) => {
  e.preventDefault();
  const data = new FormData(formEl);
  const name = data.get('newName');

  id = routineListEl.value;

  await updateRoutineName(name, id);
  routineListEl.textContent = '';
  renderRoutinesInEdit(routineListEl);

});


async function renderExerciseOptions(exercises) {
  console.log("🚀 ~ file: routine-edit.js ~ line 84 ~ renderExerciseOptions ~ exercises", exercises)
  for (const exercise of exercises[0].routines.exercises) {
    const wrapper = document.createElement('div');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../assets/bin.png';
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

