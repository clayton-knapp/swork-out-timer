import { 
    redirectIfLoggedIn, 
    signInUser, 
    signInUserFB, 
    signupUser,
} from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signInFB = document.getElementById('fb-btn');

// const signInForm = document.getElementById('sign-in-fb');
// const signInEmail = document.getElementById('sign-in-email-fb');
// const signInPassword = document.getElementById('sign-in-password-fb');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

// if user currently logged in, redirect
redirectIfLoggedIn();

signUpForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value);

    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
  
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInFB.addEventListener('click', async(event)=>{
    event.preventDefault();
    const user = await signInUserFB();
  
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});


