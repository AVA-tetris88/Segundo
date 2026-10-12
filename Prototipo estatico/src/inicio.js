//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/ 

const btnGestionUsuarios = document.querySelector("#btnGestionUsuarios"); 

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Actualizar nombre
async function actualizarNombre(nuevoNombre) {
    const { data, error } = await _supabase.auth.updateUser({
    data: {
    display_name: nuevoNombre
    }
    });
    if (error) alert('Error al actualizar:', error.message);
    else console.log('Nombre actualizado:', data.user);
}

async function verificarAdministrador() {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
    
    if (authError || !user) {
        console.error("No hay sesión activa:", authError?.message);
        return;
    }

    const {data, error} = await _supabase
        .from('perfiles')
        .select('tipo')
        .eq('id', user.id)

    if (error) {
        console.error("Error al obtener tipo:", error.message);
        return;
    }
    else{
        if(data[0].tipo == "Administrador"){
            btnGestionUsuarios.style.visibility = 'visible';
        }
        else btnGestionUsuarios.style.visibility = 'hidden';
    }
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

verificarAdministrador();