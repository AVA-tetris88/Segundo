//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

import {obtenerOpciones} from "src/registroActividades";
const inpMostrarActividad = document.getElementById("actividad");
const tblCabeza = document.getElementById("tblCabeza");
const tblCuerpo = document.getElementById("tblCuerpo");
const sctFiltros = document.getElementById("filtros");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//Función para mostrar toda la información de las actividades en una tabla
async function cargarActividad(datos, actividad) {
//Obtiene la información con los con 'tipo' igual a 'Profesor'
    const {data, error} = await _supabase
        .from('perfiles')
        .select('nombre')
        .eq('tipo','Profesor')
//Si hay algún error lo imprime
    if(error)console.error('Error al cargar los profes:',error)
//Sino modifica todo el documento según la actividad
    else{
//Pregunta por la variable 'activiad'
        switch (actividad) {
//Si es igual a 'actividades_de_extension'
            case 'actividades_de_extension':
//Define variables de texto que serán opciones de filtros
                let opProfesores = ``;
//Busca y guarda los nombre de profesores como opciones de filtros
                data.forEach(profe => {
                    opProfesores = opProfesores + `<option value="${profe.nombre}">${profe.nombre}</option>` 
                });
//Escribe las columnas de la tabla 'actividades_de_extension' de la base de datos
                tblCabeza.innerHTML = 
                `<th>Nombre del profesor</th>
                <th>Tipo de actividad</th>
                <th>Nombre de la actividad</th>
                <th>Título de participación</th>
                <th>Fecha</th>
                <th>Lugar</th>
                <th>Tipo de participación</th>
                <th>Organizador(es)</th>
                <th>Otra información</th>`;
//Escribe todos los filtros de las actividades de extensión junto con sus opciones
                sctFiltros.innerHTML = 
                `<label for="nProfesor">Nombre del profesor:</label>
                <select name="nombre" class="inpFiltro" id="nProfesor" onchange="cargarFiltro('nombre_profesor',0)">${opProfesores}</select>
                <label for="nActividad">Nombre de la actividad:</label>
                <input type="text" name="nActividad" class="inpFiltro" id="nActividad" onchange="cargarFiltro('nombre_actividad',1)">
                <label for="tipo">Tipo de actividad:</label>
                <select name="tipo" class="inpFiltro" id="tipo" onchange="cargarFiltro('tipo',2)">${obtenerOpciones('extension_tipo_actividad','tipo')}</select>
                <label for="tituloP">Título de la participación:</label>
                <select name="tituloP" class="inpFiltro" id="tituloP" onchange="cargarFiltro('titulo_participacion',3)">${obtenerOpciones('extension_titulo_participacion','titulo')}</select>
                <label for="fecha">Fecha:</label>
                <input type="date" name="fecha" class="inpFiltro"id="fecha" onchange="cargarFiltro('fecha',4)">
                <label for="lugar">Lugar:</label>
                <input type="text" name="lugar" class="inpFiltro" id="lugar" onchange="cargarFiltro('lugar',5)">
                <label for="tipoP">Tipo de participación:</label>
                <select name="tipoP" class="inpFiltro" id="tipoP" onchange="cargarFiltro('tipo_participacion',6)">${obtenerOpciones('extension_tipo_participacion','tipo')}</select>
                <label for="organizadores">Organizador(es):</label>
                <input type="text" name="organizadores" class="inpFiltro" id="organizadores" onchange="cargarFiltro('organizadores',7)">
                <label for="otraInfo">Otra información:</label>
                <input type="text" name="otraInfo" class="inpFiltro" id="otraInfo" onchange="cargarFiltro('comentarios',8)">`
//Limpia el contenido en las filas de la tabla
                tblCuerpo.innerHTML = ``;
//Escribe la información de la tabla 'actividades_de_extension' en las filas de la tabla
                datos.forEach(inf => {
                    tblCuerpo.innerHTML = tblCuerpo.innerHTML + 
                    `<tr>
                    <td>${inf.nombre_profesor}</td>
                    <td>${inf.tipo_actividad}</td>
                    <td>${inf.nombre_actividad}</td>
                    <td>${inf.titulo_participacion}</td>
                    <td>${inf.fecha}</td>
                    <td>${inf.lugar}</td>
                    <td>${inf.tipo_participacion}</td>
                    <td>${inf.organizadores}</td>
                    <td>${inf.comentarios}</td>
                    </tr>`;
                });
                break;
        
            default:
                break;
        }
    }
}

//Función que busca la información según el filtro seleccionado
async function cargarFiltro(filtro, inp) {
//Obtiene la información de todos los filtros
    const inpFiltro = document.querySelectorAll('.inpFiltro');
//Selecciona todo de la tabla de la base de datos solicitada donde cuente con el valor del filtro colocado
    const {data, error} = await _supabase
        .from(inpMostrarActividad.value)
        .select('*')
        .eq(filtro, inpFiltro[inp].value)
//Si hay algún error lo imprime
    if(error) console.error('Error al aplicar el filtro', error);
//Sino ejecuta la función 'cargarActividad' con la información recolectada de la base de datos y la tabla que se buscó como variables
    else cargarActividad(data, inpMostrarActividad.value);
}

//Función que ejecuta la función 'cargarActividad'
async function cargarMostrarActividad(actividad) {
//Obtiene la toda la información de la tabla seleccionada
    const {data, error} = await _supabase
        .from(actividad)
        .select('*')
//Si hay algún error lo imprime
    if(error) console.error('Error al cargar los datos:',error);
//Sino selecciona la opción correspondiente a la actividad seleccionada en el input para seleccionar actividades y ejecuta la función 'cargarActividad' con la información de la tabla y la actividad como variables
    else{
        inpMostrarActividad.value = actividad;
        cargarActividad(data, actividad);
    }
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

//Evento que ejecuta la función 'cargarMostrarActividad' cada vez que se cambie la opción del input para seleccionar actividades
inpMostrarActividad.addEventListener("change", function(e){
    e.preventDefault();
//Guarda en 'sessionStorage' la variable 'actividad' como el valor del input para seleccionar actividades
    sessionStorage.setItem('actividad',inpMostrarActividad.value)
//Ejecuta la función 'cargarMostrarActividad' con el valor del input para seleccionar actividad como variable
    cargarMostrarActividad(inpMostrarActividad.value);
})

//Ejecuta la función 'cargarMostrarActividad' con la variable 'actividad' de 'sessionStorage'
cargarMostrarActividad(sessionStorage.getItem('actividad'));

verificar;