//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const inpNombreProfesor = document.getElementById("nProfesor");
const inpTipoActividad = document.getElementById("tipo");
const inpNombreActividad = document.getElementById("nActividad");
const inpTituloParticipacion = document.getElementById("tituloP");
const inpFecha = document.getElementById("fecha");
const inpLugar = document.getElementById("lugar");
const inpTipoParticipacion = document.getElementById("tipoP");
const inpOrganizadores = document.getElementById("organizadores");
const inpOtraInfo = document.getElementById("otraInfo");
const frmRegistrarActividad = document.getElementById("frmRegistrarActividad");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function registrarExtension(nProfesor, tActividad, nActividad, tituloP, fecha, lugar, tipoP, organizadores, otraInfo) {
     const { data, error } = await _supabase
    .from('actividades_de_extension')
     .insert([
    {nombre_profesor: nProfesor, tipo_actividad: tActividad, nombre_actividad: nActividad, titulo_participacion: tituloP, fecha: fecha, lugar: lugar, tipo_participacion: tipoP, organizadores: organizadores, comentarios: otraInfo}
    ])
    .select();
    if (error) console.error('Error al insertar extension:', error.message);
    else {
        console.log('Nuevo registro de extension:', data)
        limpiarFormulario();
    };    
}

async function cargarInpNombreProfesor() {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();

    if (authError || !user) {
        console.error("No hay sesión activa:", authError?.message);
        return;
    }
    const { data, error} = await _supabase
        .from('perfiles')
        .select('nombre')

    if (error) {
        console.error("Error al obtener perfil:", error.message);
        return;
    }
    else{
        data.forEach(per => {
            inpNombreProfesor.innerHTML = inpNombreProfesor.innerHTML + `<option value="${per.nombre}">${per.nombre}</option>`
        });
    }
}

function limpiarFormulario() {
    inpFecha.value = "";
    let Campos = document.querySelectorAll("input, select, textarea");
    Campos.forEach(campo => campo.value = "");
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 
cargarInpNombreProfesor();

frmRegistrarActividad.addEventListener("submit", async function(e) {
    e.preventDefault();
    await registrarExtension(inpNombreProfesor.value,inpTipoActividad.value,inpNombreActividad.value,inpTituloParticipacion.value,inpFecha.value,inpLugar.value,inpTipoParticipacion.value,inpOrganizadores.value,inpOtraInfo.value);
})