//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const tblDesglose = document.getElementById("tblDesglose");
const btnActividad = document.querySelector(".btnActividad");
const divModal = document.getElementById("modalAct");
const h1Act = document.getElementById("h1Act");
const btnRegistrarAtc = document.getElementById("Registrar");
const btnVerAct = document.getElementById("VerAct");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function verActividadesExtension() {
    const { data, error } = await _supabase
    .from('actividades_de_extension')
    .select('*');

    if (error) console.error('Error:', error.message);
    else {
        console.log('Datos de extensión:', data);
        data.forEach(act => {
            tblDesglose.innerHTML = tblDesglose.innerHTML +
            `<tr>
            <td>${act.nombre_profesor}</td>
            <td>${act.tipo_actividad}</td>
            <td>${act.nombre_actividad}</td>
            <td>${act.titulo_participacion}</td>
            <td>${act.fecha}</td>
            <td>${act.lugar}</td>
            <td>${act.tipo_participacion}</td>
            <td>${act.organizadores}</td>
            <td>${act.comentarios}</td>
            </tr>`;
        });
    }
}

function mostrarModal(actividad){
    switch (actividad) {
        case 'Ext':
            h1Act.innerHTML = "Actividad de extensión";
            divModal.style.visibility = "visible";
            btnRegistrarAtc.setAttribute("onclick","clicRegistrar('Ext')")
            btnVerAct.setAttribute("onclick","clicVer('')")
            break;
        case 'Inv':
            break;
        default:
            break;
    };
}

function clicRegistar(actividad){
    switch (actividad) {
        case 'Ext':
            window.location.href = "./extension.html"
            break;
        default:
            break;
    }
}

function clicVer(){
    window.location.href = "./reporteriaInformeL"
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

verActividadesExtension();

btnActividad.addEventListener("click", function() {
    mostrarModal(btnActividad.innerHTML);
})