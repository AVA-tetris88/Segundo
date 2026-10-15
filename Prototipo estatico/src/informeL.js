//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const btnActividad = document.querySelector(".btnActividad");
const divModalAct = document.querySelector("#modalAct");
const h1Act = document.getElementById("h1Act");
const btnRegistrarAtc = document.getElementById("Registrar");
const btnVerAct = document.getElementById("VerAct");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

function mostrarModal(actividad){
    switch (actividad) {
        case 'Ext':
            h1Act.innerHTML = "Actividad de extensión";
            divModalAct.style.visibility = "visible";
            btnRegistrarAtc.setAttribute("onclick","clicRegistrar('Ext')")
            btnVerAct.setAttribute("onclick","clicVer('Ext')")
            break;
        case 'Inv':
            break;
        default:
            break;
    };
}

function clicRegistrar(actividad){
    switch (actividad) {
        case 'Ext':
            window.location.href = "./extension.html"
            break;
        default:
            break;
    }
}

function clicVer(actividad){
    switch (actividad) {
        case 'Ext':
            sessionStorage.setItem('actividad', 'actividades_de_extension');
            break;
    
        default:
            break;
    }
    window.location.href = "./reporteriaInformeL"
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

btnActividad.addEventListener("click", function() {
    mostrarModal(btnActividad.innerHTML);
})