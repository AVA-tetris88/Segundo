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
const btnRegistrarActividad = document.querySelector("#btnRegistrarActividad");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function registrarExtension(nProfesor, tActividad, nActividad, tituloP, fecha, lugar, tipoP, organizadores, otraInfo) {
     const { data, error } = await _supabase
    .from('actividades_de_extension')
     .insert([
    {nProfesor: nProfesor, tipo_actividad: tActividad, nombre_actividad: nActividad, titulo_participacion: tituloP, fecha: fecha, lugar: lugar, tipo_participacion: tipoP, organizadores: organizadores, comentarios: otraInfo}
    ])
    .select();
    if (error) console.error('Error al insertar extension:', error.message);
    else console.log('Nuevo registro de extension:', data);
}

async function consultaProfesor(nBuscado) {
    const { data, error } = await _supabase
        .from('perfiles')
        .select('id, nombre')
        .eq('nombre', nBuscado);
    if (error) {
        console.error('Error al buscar ' + nBuscado + ':', error.message);
        return null;
    } else if (data.length > 0) {
        console.log('Usuario encontrado:', data[0]);
        return data[0];
    } else {
        console.log('No se encontraron registros');
        return null;
    }
}

function limpiarFormulario() {
    let Campos = document.querySelectorAll("#formulario input, #formulario select, #formulario textarea");
    Campos.forEach(campo => campo.value = "");
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

btnRegistrarActividad.addEventListener("click", function() {
    e.preventDefault();
    registrarExtension(consultaProfesor(inpNombreProfesor.value).id,inpTipoActividad.value,inpNombreActividad.value,inpTituloParticipacion.value,inpFecha.value,inpLugar.value,inpTipoParticipacion.value,inpOrganizadores.value,inpOtraInfo.value);
    limpiarFormulario();
})

inpNombreProfesor.value = consultaProfesor(inpNombreProfesor.value).nombre;