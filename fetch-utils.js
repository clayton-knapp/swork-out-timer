const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMjAzODk3LCJleHAiOjE5NTc3Nzk4OTd9.YSE_7a3WfuRs63ZGDXrX4Mq_kg9X2vtRQ4vTvc2c3eA';

const SUPABASE_URL = 'https://vhkagkzgeenenqiijray.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getAllRoutinesAndExercises() {
    const response = await client
        .from('junctions')
        .select('*, routines (*, exercises (*))');

    return checkError(response);
}

export async function getAllRoutines() {
    const response = await client
        .from('routines')
        .select();

    return checkError(response);
}

export async function getAllRoutinesByUserID() {
    const currentUserId = client.auth.user().id;
    const response = await client
        .from('routines')
        .select()
        .match({ user_id: currentUserId });

    return checkError(response);
}


export async function getAllExercise() {
    const response = await client
        .from('exercises')
        .select();

    return checkError(response);
}

export async function getOneRoutineAndExercises(routineID) {
    const response = await client
        .from('junctions')
        .select('*, routines (*, exercises (*))')
        .match({ routine_id: routineID });

    return checkError(response);
}

export async function updateRoutineName(name, id) {
    const response = await client
        .from('routines')
        .update({ name: name })
        .match({ id: id });

    return checkError(response);
}


export async function createRoutineName(routineName) {
    const response = await client
        .from('routines')
        .insert([{ name: routineName }])
        .single();


    return checkError(response);
}

export async function addExerciseToRoutine(routineID, exerciseID) {
    const response = await client
        .from('junctions')
        .insert([{ routine_id: routineID, exercise_id: exerciseID }]);


    return checkError(response);
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./routine-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}
export async function signInUserFB(){
    const response = await client.auth.signIn({ provider: 'facebook' });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
