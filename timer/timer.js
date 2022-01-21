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
const audioPlayer = document.querySelector('#audio-player');
const restDropdown = document.querySelector('#rest-dropdown');

const params = new URLSearchParams(window.location.search);
const routineId = params.get('id');

let routines = [];
let exercises = [];
let justDurations = [];
let justNames = [];

let i = 0;

let exerciseTimer = '';
let waitTimer = '';
// eslint-disable-next-line no-unused-vars
let restTimeout = '';
let restTimer = '';

let restTime = 3;


logoutButton.addEventListener('click', () => {
    logout();
});

restDropdown.addEventListener('change', ()=>{
    restTime = restDropdown.value;
});

window.addEventListener('load', async() =>{
    //fetch routines and exercises joined from supabase
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

    // show the pause button
    pauseButton.style.display = 'block';
});

pauseButton.addEventListener('click', () =>{
   
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
    }
    if (waitTimer) {
        clearTimeout(waitTimer);
    }

    startButton.style.display = 'block';
    startButton.textContent = `Resume`;
    pauseButton.style.display = 'none';
});


endButton.addEventListener('click', () =>{
   
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
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

    //display exercise name
    currentExerciseEl.textContent = namesArray[i];

    // run timer for selected duration
    exerciseTimer = setInterval(decrementAndDisplayTime, 1000, durationsArray, i);

    
    console.log('i=', i);
    
    // sets timeout for current duration, then increments[i], then reruns function recursively
    waitTimer = setTimeout(()=>{

        if (i !== (justDurations.length - 1)) {
        // display initial rest
            if (restTime < 10) {
                timerEl.textContent = `00:0${ restTime }`;
            }
            else if (restTime >= 10){
                timerEl.textContent = `00:${ restTime }`;
            }

        // displays Rest
            currentExerciseEl.textContent = 'Rest';


        // run rest timer
        // let tempRestTime = restTime;
            restTimer = setInterval(decrementAndDisplayRest, 1000);

            // sets rest Timeout then executes next exercise timer
            // clearTimeout(restTimeout);

            restTimeout = setTimeout(()=> {
    
                i++;
                // console.log(`it's been ${durationsArray[i]} seconds`);
                intervalAndTimeout(durationsArray, namesArray, i);
            }, restTime * 1000 + 1000);
        } 
        else if (i === (justDurations.length - 1)) {
            console.log('workout complete');
            currentExerciseEl.textContent = 'WORKOUT COMPLETE!';
            timerEl.textContent = `NICE!`;
        }
        

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

    if (durationsArray[i] <= 3 && durationsArray[i] >= 1) {
        audioPlayer.src = `../assets/tick.wav`;
    }

    else if (durationsArray[i] <= 0) {
        audioPlayer.src = `../assets/short-buzzer.m4a`;
        clearInterval(exerciseTimer);
    }
}

function decrementAndDisplayRest() {
    // let tempRestTime = restTime;
    if (restTime > 0){
        restTime--;

        if (restTime < 10) {
            timerEl.textContent = `00:0${ restTime }`;
        }
        else if (restTime >= 10){
            timerEl.textContent = `00:${ restTime }`;
        }
        console.log('rest time:', restTime);
    }

    if (restTime <= 3 && restTime >= 1) {
        audioPlayer.src = `../assets/tick.wav`;
    }

    else if (restTime <= 0) {
        audioPlayer.src = `../assets/short-buzzer.m4a`;
        clearInterval(restTimer);
        restTime = restDropdown.value;
    }
    // if (i === (justDurations.length - 1)) {
    //     clearTimeout(restTimeout);
    // }
}