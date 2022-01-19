export function renderRoutines(routine) {
    const routineLink = document.createElement('a');
    routineLink.href = `../routine-detail/?id=${routine.id}`;

    routineLink.textContent = routine.name;
    const routineEl = document.createElement('div');
    routineEl.classList.add('routine');
    routineEl.append(routineLink);
    return routineEl;
}