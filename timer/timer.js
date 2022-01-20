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

let exerciseArray = [];

// let time = 3;
let durations = [3, 4, 5];
let i = 0;
let timer = '';

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() =>{
    const routines = await getOneRoutineAndExercises(routineId);
    exerciseArray = routines[0].routines.exercises;
    routineNameEl.textContent = routines[0].routines.name;
 
    for (let exercise of exerciseArray) {
        currentExerciseEl.textContent = exercise.name;

    }

   
});

startButton.addEventListener('click', async()=>{
    const routines = await getOneRoutineAndExercises(routineId);
    exerciseArray = routines[0].routines.exercises;

    const justDurations = exerciseArray.map((exercise)=>{
        return exercise.duration;
    });

    const justNames = exerciseArray.map((exercise)=>{
        return exercise.name;
    });


    // const justExerciseNamesAndDurations = exerciseArray.map((exercise)=>{
    //     return { name: exercise.name, duration: exercise.duration };
    // });

    // console.log(justExerciseNamesAndDurations, justExerciseNamesAndDurations[0], justExerciseNamesAndDurations[0].duration);


    intervalAndTimeout(justDurations, justNames, i);
 
});

stopButton.addEventListener('click', () =>{
   
    // isStopped = true;
    if (timer) {
        clearInterval(timer);
    }
   

});

function intervalAndTimeout(durationsArray, namesArray, i){
    // display initial duration
    if (durationsArray[i] < 10) {
        timerEl.textContent = `00:0${ durationsArray[i] }`;
    }
    else if (durationsArray[i] >= 10){
        timerEl.textContent = `00:${ durationsArray[i] }`;
    }

    //display initial name
    currentExerciseEl.textContent = namesArray[i];


    // run timer for selected duration
    timer = setInterval(decrementAndDisplayTime, 1000, durationsArray, i);
  
    // sets timeout for current duration, then increments[i], then reruns function recursively
    setTimeout(()=>{
        // console.log(`it's been ${durationsArray[i]} seconds`);
        i++;
        intervalAndTimeout(durationsArray, namesArray, i);
    }, durationsArray[i] * 1000 + 1000);
}


function decrementAndDisplayTime(durationsArray, i){
    
    if (durationsArray[i] > 0){
        durationsArray[i]--;

        if (durationsArray[i] < 10) {
            timerEl.textContent = `00:0${ durationsArray[i] }`;
        }
        else if (durationsArray[i] >= 10){
            timerEl.textContent = `00:${ durationsArray[i] }`;
        }
    }
    
    // else if (durationsArray[i] <= 0) {
    //     clearInterval(timer);
    // }
    console.log(durationsArray[i]);
}