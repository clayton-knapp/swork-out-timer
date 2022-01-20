import { logout, checkAuth } from '../fetch-utils.js';

const logoutButton = document.getElementById('logout');
checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});