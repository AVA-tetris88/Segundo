//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const divModalAct = document.getElementById("divModalAct");
const h1Act = document.getElementById("h1Act");
const btnRegistro = document.getElementById("btnRegistro");
const btnVisualizacion = document.getElementById("btnVisualizacion");
const btnActividades = document.querySelectorAll(".btnActividad");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Función que vuelve visible el modal
function mostrarModal(tipo){
//Pregunta por la variable actividad
    switch (tipo) {
//Si es igual a 'Ext' muestra la información para las actividades de extensión
        case 'Ext':
            h1Act.innerHTML = `Actividad de extensión`;
            divModalAct.style.visibility = 'visible';
            sessionStorage.setItem('actividad','actividades_de_extension');
            break;
        default:
            break;
    };
    divModalAct.style.visibility = 'visible';
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

btnActividades.forEach((btnActividad, indice) => {
    btnActividad.addEventListener('click', (e) => {
        e.preventDefault();
        switch (indice) {
            case 0:
                mostrarModal('Ext')
                break;
        
            default:
                break;
        }
    });
});

btnRegistro.addEventListener('click', function(e){
    e.preventDefault();
    window.location.replace('./registroActividades.html');
});

btnVisualizacion.addEventListener('click', function(e){
    e.preventDefault();
    window.location.replace('./reporteriaInformeL');
});
