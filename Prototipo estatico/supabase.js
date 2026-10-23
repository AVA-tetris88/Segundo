//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

//GLOBAL
const { createClient } = supabase;
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//GLOBAL
async function verificarSesion() {
    const rutaActual = window.location.pathname;
    if (!rutaActual.endsWith('index.html') && rutaActual !== '/') {
        const {data: {user}, error: authError} = await _supabase.auth.getUser();
        if (authError || !user){
            alert("No hay sesión activa");
            console.error('No hay sesión activa:', authError)
            window.location.replace('index.html');
        }
    }
}

//INDEXIS -------------------------------------------------------------------------------------------------------

//Función para iniciar sesión con la base de datos
export async function iniciarSesion(correo, contrasenna) {
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: correo,
      password: contrasenna
    });
//Si las credenciales son incorrectas o hay algún otro error lo imprime y alerta
    if (error) {
      console.error(error.message, error);
      alert("Error: " + error.message);
      return;
    } 
//Sino lleva a la página 'inicio'
    else {
      console.log("Inicio de sesión exitoso:", data);
      window.location.replace("./inicio.html"); 
    }
}

//INICIO --------------------------------------------------------------------------------------------------------

//Función que verifica que el usuario sea administrador
export async function verificarAdministrador() {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
//Si no hay una sesión activa lo imprime
    if (authError || !user) {
        console.error("No hay sesión activa:", authError?.message);
        return;
    }
//Agarra la propiedad 'tipo' únicamente con del usuario que comparte 'id' con el que tiene la sesión activa
    const {data, error} = await _supabase
        .from('perfiles')
        .select('tipo')
        .eq('id', user.id)
//Si hay algún error a momento de obtener 'tipo' lo imprime
    if (error) {
        console.error("Error al obtener tipo:", error.message);
        return;
    }
//Sino vuelve visible un botón para entrar a la página 'gestionUsuarios'
    else{
        if(data[0].tipo == "Administrador") btnGestionUsuarios.style.visibility = 'visible';
    }
}

export async function cerrarSesion() {
    const {error} = await _supabase.auth.signOut({scope: 'local'});

    if (error)console.error("Error al cerrar sesión:", error.message);
    else {
        window.location.replace("index.html"); 
        console.log("Sesión cerrada exitosamente");
    }
}
//INFORMEL ------------------------------------------------------------------------------------------------------

//REGISTROACTIVIDADES -------------------------------------------------------------------------------------------

//REPORTERIAIL --------------------------------------------------------------------------------------------------

//GESTIONU ------------------------------------------------------------------------------------------------------

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

window._supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.verificar = verificarSesion();
