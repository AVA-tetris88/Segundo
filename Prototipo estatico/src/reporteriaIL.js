//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

import {cargarActividades, aplicarFiltro, obtenerActividad, verificarSesion} from "../supabase.js";

const inpMostrarActividad = document.getElementById("inpMostrarActividad");
const tblCabeza = document.getElementById("tblCabeza");
const tblCuerpo = document.getElementById("tblCuerpo");
const divFiltros = document.getElementById("divFiltros");
const inpFiltro = document.querySelectorAll(".inpFiltro");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 



//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

inpMostrarActividad.value = sessionStorage.getItem 

//Evento que ejecuta la función 'obtenerActividad' cada vez que se cambie la opción del input para seleccionar actividades
inpMostrarActividad.addEventListener('change', async function(e){
    e.preventDefault();
//Guarda en 'sessionStorage' la variable 'actividad' como el valor del input para seleccionar actividades
    sessionStorage.setItem('actividad',inpMostrarActividad.value)
//Ejecuta la función 'obtenerActividad' con el valor del input para seleccionar actividad como variable
    await obtenerActividad(inpMostrarActividad.value);
})

if(inpFiltro){
    inpFiltro.forEach((filtro, indice) =>{
        filtro.addEventListener('change', async function(e){
            e.preventDefault();
            let filtrador = ``;
            inpFiltro.forEach((otroFiltro, otroIndice) =>{  
                if(otroFiltro != e.target && otroIndice != 0){
                    otroFiltro.value = ``;
                }
                if(indice == otroIndice == 0){
                    filtrador = `${e.target.id}.eq.${e.target.value}`;
                }
                else{
                    filtrador = `${otroFiltro.id}.eq.${otroFiltro.value},${e.target.id}.eq.${e.target.value}`
                }
            });
            await aplicarFiltro(filtrador);
            });
    });
}
//Ejecuta la función 'cargarMostrarActividad' con la variable 'actividad' de 'sessionStorage'
obtenerActividad(sessionStorage.getItem('actividad'));

verificarSesion();