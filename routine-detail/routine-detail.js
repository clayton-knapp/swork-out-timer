import { checkAuth, getExerciseVideo, getOneRoutineAndExercises, logout, } from '../fetch-utils.js';
import { renderExercises } from '../render-utils.js';

checkAuth();

const routineNameEl = document.querySelector('.routine-name');
const durationEl = document.querySelector('.duration');
const exerciseListEl = document.querySelector('.exercises-list');
const startWorkoutBtnEl = document.querySelector('.start-workout');
const videoDisplayEl = document.querySelector('.video-display');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let arr = [];

window.addEventListener('load', async() => {
    // const params = new URLSearchParams(window.location.search);
    // const id = params.get('id');
    const getRoutine = await getOneRoutineAndExercises(id);

    const routineName = getRoutine[0].routines.name;
    routineNameEl.textContent = `${routineName}`;
    //display total duration
    for (let duration of getRoutine[0].routines.exercises) {
        arr.push(duration.duration);
        let sum = 0;
        sum = arr.reduce((a, b) => {
            return a + b;
        });
        
        durationEl.textContent = `Duration: ${convertTimeToMinAndSeconds(sum)} min`;
    }
    
    for (const exercise of getRoutine[0].routines.exercises) {
        const exerciseWorkout = renderExercises(exercise);   
        exerciseListEl.append(exerciseWorkout);

        //when user clicks a display exercise
        exerciseWorkout.addEventListener('click', async() => {
        //fetch video links in supabase 'exercises' table
            const exerciseVideo = await getExerciseVideo(exercise.id);

            const videoDiv = document.createElement('iframe');
            videoDiv.classList.add('exercise-video') ;
            videoDiv.src = exerciseVideo.video_link;
            videoDiv.title = 'YouTube video player';
            videoDisplayEl.append(videoDiv);
        });
    }
});


function convertTimeToMinAndSeconds(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    // let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec) / 60); // get minutes
    let seconds = sec - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    // if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}
    return minutes + ':' + seconds; // Return is HH : MM : SS
}

// async function displayExerciseVideo() {
//     const getRoutine = await getOneRoutineAndExercises();
//     const routineName = getRoutine[0].routines.name;
//     routineNameEl.textContent = `${routineName}`;

//     for (const exercise of getRoutine[0].routines.exercises) {
//         const exerciseWorkout = renderExercises(exercise);   
//         exerciseListEl.append(exerciseWorkout);
//     }
    
    
// }
startWorkoutBtnEl.addEventListener('click', () => {
    window.location.href = `../timer/?id=${id}`;

});