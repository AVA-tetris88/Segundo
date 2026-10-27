//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/ 

import {iniciarSesion} from "../supabase.js";

const inpCorreo = document.getElementById("correo");
const inpContrasenna = document.getElementById("contrasenna");
const frmInicioSesion = document.getElementById("frmInicioSesion");

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 
        
//Evento que ejecuta la función 'iniciarSesion' cuando se aprieta la tecla enter
document.addEventListener('keypress', async function(e){
    if(e.key == 'Enter'){
        e.preventDefault();
//Verifica que los inputs sí tengan algo escrito, entonces ejecuta la función
        if(inpCorreo.value != '' && inpContrasenna.value != ''){
            await iniciarSesion(inpCorreo.value, inpContrasenna.value);
        }
    }
});

//Evento que ejecuta la función 'iniciarSesion' cuando se aprieta el botón
frmInicioSesion.addEventListener('submit', async function(e) {
    e.preventDefault();
//Verifica que los inputs sí tengan algo escrito, entonces ejecuta la función
    if(inpCorreo.value != '' && inpContrasenna.value != ''){
        await iniciarSesion(inpCorreo.value, inpContrasenna.value);
    }
});

verificar();