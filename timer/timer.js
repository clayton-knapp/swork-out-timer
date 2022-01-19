import { checkAuth, getOneRoutineAndExercises, logout } from '../fetch-utils.js';

checkAuth();
const routineNameEl = document.querySelector('#routine-name');
const logoutButton = document.getElementById('logout');
const currentExerciseEl = document.querySelector('#current-exercise');
const iconEl = document.querySelector('#icon');
const timerEl = document.querySelector('#timer');
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const finishWorkout = document.querySelector('#finish-workout');
const params = new URLSearchParams(window.location.search);
const routineId = params.get('id');

let time = 3;



logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() =>{
    const routines = await getOneRoutineAndExercises(routineId);
    const exerciseArray = routines[0].routines.exercises;
   
    routineNameEl.textContent = routines[0].routines.name;
 
    for (let exercise of exerciseArray) {
        currentExerciseEl.textContent = exercise.name;

    }

   
});

startButton.addEventListener('click', ()=>{
    const timer = setInterval(decrementTimer, 1000);

     
});

stopButton.addEventListener('click', () =>{
    

    
});



function decrementTimer(){
    if (time > 0){
        time--;
        timerEl.textContent = time;
    }
    else {
        clearInterval(timer);
    }
    console.log(time);
}

    
   
  
  

  




// async function routines() {

//     const routines = await getRoutines();
//     console.log('🚀 ~ file: other-page.js ~ line 14 ~ routines', routines);
// }

// routines();

