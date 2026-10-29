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

divFiltros.addEventListener('change', async function(e) {

    if (!e.target.classList.contains('inpFiltro')) return;

    e.preventDefault();
    const inpFiltro = document.querySelectorAll(".inpFiltro");

    inpFiltro.forEach((otroFiltro, otroIndice) => {  
        if (otroFiltro !== e.target && otroIndice !== 0) {
            otroFiltro.value = ``;
        }
    });

    let query = _supabase.from(inpMostrarActividad.value).select('*');
    if(e.target.value !== '' && e.target.value !== '*' && inpFiltro[0].value !== '*') {
        if(e.target.id !== inpFiltro[0].id) {
            query.ilike(e.target.id,`%${e.target.value}%`).eq('nombre',inpFiltro[0].value);
        } 
        else{
            query.eq('nombre',inpFiltro[0].value);
        }
    }
    else if((e.target.value === '' || e.target.value === '*') && inpFiltro[0].value !== '*') {
        query.eq('nombre',inpFiltro[0].value);
    }
    else if (e.target.value !== '' && e.target.value !== '*' && inpFiltro[0].value === '*') {
        query.ilike(e.target.id,`%${e.target.value}%`)
    }
    else {
        await obtenerActividad(inpMostrarActividad.value);
        return; 
    }
    console.log(query);
    aplicarFiltro(query);
});
//Ejecuta la función 'cargarMostrarActividad' con la variable 'actividad' de 'sessionStorage'
obtenerActividad(sessionStorage.getItem('actividad'));

verificarSesion();