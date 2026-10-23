//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const btnActividad = document.getElementById("btnActividad");
const divModalAct = document.getElementById("divModalAct");
const h1Act = document.getElementById("h1Act");
const btnRegistro = document.getElementById("btnRegistro");
const btnVisualizacion = document.getElementById("btnVisualizacion");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Función que vuelve visible el modal
function mostrarModal(actividad){
//Pregunta por la variable actividad
    switch (actividad) {
//Si es igual a 'Ext' muestra la información para las actividades de extensión
        case 'Ext':
            h1Act.innerHTML = `Actividad de extensión`;
            divModalAct.style.visibility = 'visible';
            btnRegistro.setAttribute("onclick","clicRegistro('Ext')")
            btnVisualizacion.setAttribute("onclick","clicVisializacion('Ext')")
            break;
        default:
            break;
    };
}

//Función que dirige a las distintas páginas para registrar actividades
function clicRegistro(actividad){
//Pregunta por la variable 'actividad'
    switch (actividad) {
//Si es igual a 'Ext' redirige a la página 'extensiones'
        case 'Ext':
            sessionStorage.setItem('actividad', 'actividades_de_extension');
            break;
        default:
            break;
    }
    window.location.replace('./registroActividades.html');
}

//Función que dirige a la página 'reporteriaInformeL'
function clicVisializacion(actividad){
//Pregunta por la variable 'actividad'
    switch (actividad) {
//Si es igual a 'Ext' guarda en 'sessionStorage' la variable 'actividad' como 'activdades_de_extension'
        case 'Ext':
            sessionStorage.setItem('actividad', 'actividades_de_extension');
            break;
        default:
            break;
    }
//Redirige a la página 'reporteriaInformeL'
    window.location.replace('./reporteriaInformeL');
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 
