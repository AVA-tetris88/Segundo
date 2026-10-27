//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

import {cargarUsuarios, agregarUsuarios, editarUsuarios} from "../supabase.js";

const tblUsuarios = document.getElementById("tblUsuarios");
const inpNombre = document.getElementById("nombre");
const inpContrasenna = document.getElementById("contra");
const inpCorreo = document.getElementById("correo");
const inpTipo = document.getElementById("tipo");
const frmAgregarUsuarios = document.getElementById("AgregarUsuarios");
const divModalAct = document.querySelector(".modalAct");
const h1Modal = document.getElementById("h1Modal");
const btnAgregarU = document.getElementById("btnAgregarU");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/

//Función que limpia toda la información que se encuentre en los inputs y la tabla y esconde el modal
function limpiarFormulario(){
    let Campos = document.querySelectorAll("input, select");
    Campos.forEach(campo => campo.value = "");
    tblUsuarios.innerHTML = "";
    divModalAct.style.visibility = 'hidden';
//Ejecuta la función 'cargarUsuarios'
    cargarUsuarios();
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

btnAgregarU.addEventListener('click', async function(e){
    agregarUsuarios(inpNombre.value, inpCorreo.value, inpContrasenna.value, inpTipo.value);
})
//Ejecuta la función 'cargarUsuarios'
cargarUsuarios();

verificar;