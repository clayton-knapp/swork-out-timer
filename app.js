import { 
    redirectIfLoggedIn, 
    signInUser, 
    // signInUserFB, 
    signupUser,
} from './fetch-utils.js';

// const signInFB = document.getElementById('fb-btn');

// const signInForm = document.getElementById('sign-in-fb');
// const signInEmail = document.getElementById('sign-in-email-fb');
// const signInPassword = document.getElementById('sign-in-password-fb');

const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

// if user currently logged in, redirect
redirectIfLoggedIn();

signUpButton.addEventListener('click', async(e)=>{
    e.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value);

    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInButton.addEventListener('click', async(e)=>{
    e.preventDefault();
    const user = await signInUser(signUpEmail.value, signUpPassword.value);
  
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

// signInFB.addEventListener('click', async(event)=>{
//     event.preventDefault();
//     const user = await signInUserFB();
  
//     if (user){
//         redirectIfLoggedIn();
//     } else {
//         console.error(user);
//     }
// });


