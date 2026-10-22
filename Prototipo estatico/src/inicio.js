//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/ 

const btnGestionUsuarios = document.querySelector("#btnGestionUsuarios"); 
const btnCerrarSesion = document.getElementById("cerrarSesion");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Función que verifica que el usuario sea administrador
async function verificarAdministrador() {
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

async function cerrarSesion() {
    const {error} = await _supabase.auth.signOut({scope: 'local'});

    if (error)console.error("Error al cerrar sesión:", error.message);
    else {
        window.location.replace("index.html"); 
        console.log("Sesión cerrada exitosamente");
    }
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

//Ejecuta la funcón 'verificarAdministrador'
verificarAdministrador();

btnCerrarSesion.addEventListener('click', async function(e){
    e.preventDefault
    await cerrarSesion();
})