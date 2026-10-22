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
const frmRegistrarExtension = document.getElementById("frmRegistrarExtension");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Función que registra una nueva actividad de extensión
async function registrarExtension(nProfesor, tActividad, nActividad, tituloP, fecha, lugar, tipoP, organizadores, otraInfo) {
//Inserta en la tabla 'actividades_de_extension' los datos brindados
    const { data, error } = await _supabase
    .from('actividades_de_extension')
    .insert([
    {nombre_profesor: nProfesor, tipo_actividad: tActividad, nombre_actividad: nActividad, titulo_participacion: tituloP, fecha: fecha, lugar: lugar, tipo_participacion: tipoP, organizadores: organizadores, otra_informacion: otraInfo}
    ])
    .select();
//Si hay algún error lo imprime
    if (error) console.error('Error al insertar extension:', error.message)
//Sino ejecuta la función 'limpiarFormulario'
    else limpiarFormulario();    
}

//Función para escribir todos los nombres de los profesores en el campo 'Nombre del profesor'
async function cargarInpNombreProfesor() {
//Obtiene 'nombre' de los usuarios que son 'tipo' igual a 'Profesor'
    const {data, error} = await _supabase
        .from('perfiles')
        .select('nombre')
        .eq('tipo','Profesor')
//Si hay algún error lo imprime
    if (error) console.error("Error al cargar el campo: Nombre del profesor:", error.message);
//Sino escribe opciones en el input de profesores con 'nombre' de cada profesor
    else{
        data.forEach(per => {
            inpNombreProfesor.innerHTML = inpNombreProfesor.innerHTML + `<option value="${per.nombre}">${per.nombre}</option>`
        });
    }
}

//Función que pone como predeterminado en el campo 'Nombre del profesor' al profesor que tiene la sesión iniciada
async function cargarProfesorActual() {
//Obtine el usuario que tiene la sesión iniciada
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
//Si no encuentra una sesión iniciada imprime el problema
    if (authError || !user) console.error("No hay sesión activa:", authError?.message);
//Sino obtine 'nombre' de todos los usuarios con 'id' igual al usuario con la sesión iniada
    else{
        const {data, error} = await _supabase
            .from('perfiles')
            .select('nombre')
            .eq('id', user.id)
//Si hay algún error lo imprime
            if (error) console.error("Error al obtener perfil:", error.message);
//Sino cambia la opción del input de profesores por 'nombre'
            else inpNombreProfesor.value = data[0].nombre;
    }
}

//Función para limpiar el formulario de registro
function limpiarFormulario() {
//Selecciona todos los campos del formulario y los limpia
    let Campos = document.querySelectorAll("input, select, textarea");
    Campos.forEach(campo => campo.value = "");
    cargarInpNombreProfesor();
    cargarProfesorActual();
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

//Evento que ejecuta la función 'registrarExtension' cada vez que se aprieta el botón
frmRegistrarExtension.addEventListener("submit", async function(e) {
    e.preventDefault();
//Ejecuta la función 'registrarExtension' con los los datos del formulario como variables
    await registrarExtension(inpNombreProfesor.value,inpTipoActividad.value,inpNombreActividad.value,inpTituloParticipacion.value,inpFecha.value,inpLugar.value,inpTipoParticipacion.value,inpOrganizadores.value,inpOtraInfo.value);
})

limpiarFormulario();
