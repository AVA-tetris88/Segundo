//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const inpMostrarActividad = document.getElementById("actividad");
const tblCabeza = document.getElementById("tblCabeza");
const tblCuerpo = document.getElementById("tblCuerpo");
const sctFiltros = document.getElementById("filtros");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function cargarActividad(datos, actividad) {
    const {data, error} = await _supabase
        .from('perfiles')
        .select('nombre')
        .eq('tipo','Profesor')
    
    if(error)console.error('Error al cargar los profes:',error)
    else{
        switch (actividad) {
            case 'actividades_de_extension':
                let opProfesores = ``;
                let opTipoA = ``;
                let opTituloP = ``;
                let opTipoP = ``;
                data.forEach(prof => {
                    opProfesores = opProfesores + `<option value="${prof.nombre}">${prof.nombre}</option>` 
                });
                opTipoA = `<option value="Charla">Charla</option><option value="Proyecto">Proyecto</option><option value="Seminario">Seminario</option>`
                opTituloP = `<option value="Ponente">Ponente</option><option value="Asistente">Asistente</option>`
                opTipoP = `<option value="Ponente">Ponente</option><option value="Charlista">Charlista</option>`

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

                sctFiltros.innerHTML = sctFiltros.innerHTML +
                `<label for="nProfesor">Nombre del profesor:</label>
                <select name="nombre" class="inpFiltro" id="nProfesor" onchange="cargarFiltro('nombre_profesor',0)">${opProfesores}</select>
                <label for="nActividad">Nombre de la actividad:</label>
                <input type="text" name="nActividad" class="inpFiltro" id="nActividad" onchange="cargarFiltro('nombre_actividad',1)">
                <label for="tipo">Tipo de actividad:</label>
                <select name="tipo" class="inpFiltro" id="tipo" onchange="cargarFiltro('tipo',2)">${opTipoA}</select>
                <label for="tituloP">Título de la participación:</label>
                <select name="tituloP" class="inpFiltro" id="tituloP" onchange="cargarFiltro('titulo_participacion',3)">${opTituloP}</select>
                <label for="fecha">Fecha:</label>
                <input type="date" name="fecha" class="inpFiltro"id="fecha" onchange="cargarFiltro('fecha',4)">
                <label for="lugar">Lugar:</label>
                <input type="text" name="lugar" class="inpFiltro" id="lugar" onchange="cargarFiltro('lugar',5)">
                <label for="tipoP">Tipo de participación:</label>
                <select name="tipoP" class="inpFiltro" id="tipoP" onchange="cargarFiltro('tipo_participacion',6)">${opTipoP}</select>
                <label for="organizadores">Organizador(es):</label>
                <input type="text" name="organizadores" class="inpFiltro" id="organizadores" onchange="cargarFiltro('organizadores',7)">
                <label for="otraInfo">Otra información:</label>
                <input type="text" name="otraInfo" class="inpFiltro" id="otraInfo" onchange="cargarFiltro('comentarios',8)">`

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

async function cargarFiltro(filtro, inp) {
    const inpFiltro = document.querySelectorAll('.inpFiltro');
    const {data, error} = await _supabase
        .from(inpMostrarActividad.value)
        .select('*')
        .eq(filtro, inpFiltro[inp].value)
    
    if(error) console.error('Error al aplicar el filtro');
    else cargarActividad(data, inpMostrarActividad.value);
}

async function cargarMostrarActividad(actividad) {
    const {data, error} = await _supabase
        .from(actividad)
        .select('*')

    if(error) console.error('Error al cargar los datos:',error);
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

inpMostrarActividad.addEventListener("onchange", function(e){
    e.preventDefault();
    sessionStorage.setItem('actividad',inpMostrarActividad.value)
    cargarMostrarActividad(inpMostrarActividad.value);
})

cargarMostrarActividad(sessionStorage.getItem('actividad'));