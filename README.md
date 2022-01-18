## The Golden Rule: 

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1) **Make a drawing of your app. Simple "wireframes"**
1) **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1) **For each HTML element ask: Why do I need this?** 
1) **Once we know _why_ we need each element, think about how to implement the "Why" as a "How"**
1) **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1) **Think about how to validate each of your features according to a Definition of Done**
1) **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:
- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model. 
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need? 
  - What are the key/value pairs? 
  - What arrays might you need? 
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be resused?)

A. Routine List
## HTML Setup

  -a menu bar include: Home(go back to a list of routines), About(go to About Us), Logout
  -a h1 called "routines"
  -a div for displaying the list of routines
  -a button called "Create Routine"
## Event Listeners (routine-list.js)
1.on window load...
  -fetches a list of routines
  -append it to the DOM with event listeners to click on

2.on click, sends users to /create routine page


B. Routine Detail

## HTML Setup
  -a header to inject the name of the routine
  -a div to render all the exercises in the routine
  -a div to render "duration"
  -s button to start workout
  -a menu bar include: Home(go back to a list of routines), About(go to About Us), Logout

## Event Listeners (routine-detail.js
1.on window load
  -fetch and display exercises for that routine
2.a click event listener for the button to redirect user to /timer countdown page

C. Timer
## HTML Setup
  -a header to inject the name of the routine
  -a header for the current exercise
  -a div for an icon/animation
  -a div for the timer
  -2 buttons:
    -a button called "start"
    -a button called "stop"
  -a div for "modal" that says "Good job! Nice Workout!"
  -a menu bar include: Home(go back to a list of routines), About(go to About Us), Logout

## Event Listeners (timer.js)
1.On window Load...
  -for loop to fetch name of the routine and current exercise
  -when first exercise is completed(timer zeros out), loop through the second exercise
  -hard code the rest timer/function for 20 seconds inside the loop

2.Start & Stop Buttons

D. 
