import { getAllRoutinesByUserID } from './fetch-utils.js';

export function renderRoutines(routine) {
    const routineLink = document.createElement('a');
    routineLink.href = `../routine-detail/?id=${routine.id}`;

    routineLink.textContent = routine.name;
    const routineEl = document.createElement('div');
    routineEl.classList.add('routine');
    routineEl.append(routineLink);
    return routineEl;
}


export function renderExercises(exercise) {
    const div = document.createElement('div');
    const exerciseLink = document.createElement('a');
    const videoDiv = document.createElement('div');
    // exerciseLink.href = `#`;
    div.classList.add('exercise-workout-list');
    
    exerciseLink.textContent = `${exercise.name} - ${exercise.duration} seconds`;
    videoDiv.classList.add('video-link');
    videoDiv.textContent = 'Show Video';
    div.append(exerciseLink, videoDiv);
    return div;
}


export async function renderRoutinesInEdit(el) {
    const routines = await getAllRoutinesByUserID();
    for (let routine of routines) {
      const optionEL = document.createElement('option');

      optionEL.textContent = `${routine.name}`;
      optionEL.value = routine.id;
      el.append(optionEL);
  }
}