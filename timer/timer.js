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
const buttonContainer = document.querySelector('#button-container');


const params = new URLSearchParams(window.location.search);
const routineId = params.get('id');

let exerciseArray = [];

// let time = 3;
let durations = [3, 4, 5];
let i = 0;
// let remainingTime;
let timer = '';
let waitTimer = '';


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() =>{
    const routines = await getOneRoutineAndExercises(routineId);
    exerciseArray = routines[0].routines.exercises;

    // Display routine name
    routineNameEl.textContent = routines[0].routines.name;

    // Display first exercise
    currentExerciseEl.textContent = `First Up: ${exerciseArray[0].name}`;


   
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

    intervalAndTimeout(justDurations, justNames);

 
});

// stopButton.addEventListener('click', () =>{
   
//     // isStopped = true;
//     if (timer) {
//         clearInterval(timer);
//     }
//     if (waitTimer) {
//         clearTimeout(waitTimer);
//     }
   

// });

function intervalAndTimeout(durationsArray, namesArray){
    //clear button container
    buttonContainer.textContent = '';

    // display initial duration
    if (durationsArray[i] < 10) {
        timerEl.textContent = `00:0${ durationsArray[i] }`;
    }
    else if (durationsArray[i] >= 10){
        timerEl.textContent = `00:${ durationsArray[i] }`;
    }

    //display initial name
    currentExerciseEl.textContent = namesArray[i];

    //render unique stop button
    const tempStopButton = document.createElement('button');
    tempStopButton.classList.add('start-stop-button');
    tempStopButton.textContent = `Stop ${namesArray[i]}`;
    buttonContainer.append(tempStopButton);

    tempStopButton.addEventListener('click', ()=> {
        if (timer) {
            clearInterval(timer);
        }
        if (waitTimer) {
            clearTimeout(waitTimer);
        }
    });


    // run timer for selected duration
    timer = setInterval(decrementAndDisplayTime, 1000, durationsArray, i);
    
    console.log('i=', i);

    // sets timeout for current duration, then increments[i], then reruns function recursively
    waitTimer = setTimeout(()=>{
        i++;
        // console.log(`it's been ${durationsArray[i]} seconds`);
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