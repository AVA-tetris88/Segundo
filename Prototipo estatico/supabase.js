const { createClient } = supabase;
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";

const rutaActual = window.location.pathname;

window._supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verificarSesion() {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
    if (authError || !user){
        alert("No hay sesión activa");
        console.error('No hay sesión activa:', authError)
        window.location.replace('index.html');
    }
}

if (!rutaActual.endsWith('index.html') && rutaActual !== '/') {
    window.verificar = verificarSesion();
}
