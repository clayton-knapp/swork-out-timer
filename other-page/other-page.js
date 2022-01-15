import { checkAuth, getRoutines, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


// async function routines() {

//     const routines = await getRoutines();
//     console.log('🚀 ~ file: other-page.js ~ line 14 ~ routines', routines);
// }

// routines();

