import { checkAuth, getOneRoutineAndExercises, logout } from '../fetch-utils.js';

checkAuth();
const routineNameEl = document.querySelector('#routine-name');
const logoutButton = document.getElementById('logout');
const currentExerciseEl = document.querySelector('#current-exercise');
// const iconEl = document.querySelector('#icon');
const timerEl = document.querySelector('#timer');
const startButton = document.querySelector('#start-button');
const pauseButton = document.querySelector('#pause-button');
const endButton = document.querySelector('#end-button');
const buttonContainer = document.querySelector('#button-container');


const params = new URLSearchParams(window.location.search);
const routineId = params.get('id');

let routines = [];
let exercises = [];
let justDurations = [];
let justNames = [];

let i = 0;

let timer = '';
let waitTimer = '';


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() =>{
    //fetch routins and exercises joined from supabase
    routines = await getOneRoutineAndExercises(routineId);

    //make new array for the nested exercises
    exercises = routines[0].routines.exercises;

    //map a new array for just the durations
    justDurations = exercises.map((exercise)=>{
        return exercise.duration;
    });

        // map a new array for just the exercise names
    justNames = exercises.map((exercise)=>{
        return exercise.name;
    });

    // Display routine name
    routineNameEl.textContent = routines[0].routines.name;

    // Display first exercise
    currentExerciseEl.textContent = `First Up: ${exercises[0].name}`;

    //Hide the pause button
    pauseButton.style.display = 'none';


   
});

startButton.addEventListener('click', async()=>{

    //call inverval timer + timeout function with durations and names
    intervalAndTimeout(justDurations, justNames);

    //when clicking start hide the button (pause button generated)
    startButton.style.display = 'none';


    pauseButton.textContent = `Pause`;
    // show the pause button
    pauseButton.style.display = 'block';
});

pauseButton.addEventListener('click', () =>{
   
    if (timer) {
        clearInterval(timer);
    }
    if (waitTimer) {
        clearTimeout(waitTimer);
    }

    startButton.style.display = 'block';
    startButton.textContent = `Resume`;
    pauseButton.style.display = 'none';
});


endButton.addEventListener('click', () =>{
   
    if (timer) {
        clearInterval(timer);
    }
    if (waitTimer) {
        clearTimeout(waitTimer);
    }

    window.location.href = `../routine-detail/?id=${routineId}`;
    
});


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

    //display initial exercise name
    currentExerciseEl.textContent = namesArray[i];

    //render unique stop button
    const tempStopButton = document.createElement('button');
    tempStopButton.classList.add('start-stop-button');
    tempStopButton.textContent = `Pause ${namesArray[i]}`;
    // buttonContainer.append(tempStopButton);

    tempStopButton.addEventListener('click', ()=> {
        if (timer) {
            clearInterval(timer);
        }
        if (waitTimer) {
            clearTimeout(waitTimer);
        }

        startButton.style.display = 'block';
        startButton.textContent = `Resume ${namesArray[i]}`;
        tempStopButton.style.display = 'none';
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
        console.log(durationsArray);
    }
    else if (durationsArray[i] <= 0) {
        clearInterval(timer);
    }
}