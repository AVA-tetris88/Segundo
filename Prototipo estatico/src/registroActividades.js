//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const h1Actividad = document.getElementById('h1Actividad');
const frmRegistroActividades = document.getElementById('frmRegistroActividades');

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function cargarActividad(actividad){
    switch (actividad) {
        case 'Ext':
            frmRegistroActividades.innerHTML = 
            `<label for="nProfesor">Nombre del profesor:</label>
            <select name="nProfesor" id="nProfesor" class="inpCampo" required>${obtenerOpciones('perfiles','nombre')}</select>
            <br>
            <label for="tipo">Tipo de actividad:</label>
            <select name="tipo" id="tipo" class="inpCampo" required>${obtenerOpciones('extension_tipo_actividad','tipo')}</select>
            <br>
            <label for="nActividad">Nombre de la actividad:</label>
            <input type="text" name="nActividad" id="nActividad" class="inpCampo" required>
            <br>
            <label for="tituloP">Título de la participación</label>
            <select name="tituloP" id="tituloP" class="inpCampo" required>${obtenerOpciones('extension_titulo_participacion','titulo')}</select>
            <br>
            <label for="fecha">Fecha:</label>
            <input type="date" name="fecha" id="fecha" class="inpCampo" required>
            <br>
            <label for="lugar">Lugar:</label>
            <input type="text" name="lugar" id="lugar" class="inpCampo" required>
            <br>
            <label for="tipoP">Tipo de participación:</label>
            <select name="tipoP" id="tipoP" class="inpCampo" required>${obtenerOpciones('extension_tipo_participacion','tipo')}</select>
            <br>
            <label for="organizadores">Organizadores:</label>
            <input type="text" name="organizadores" id="organizadores" class="inpCampo" required>
            <br>
            <label for="otraInfo">Otra información:</label>
            <textarea name="otraInfo" id="otraInfo" cols="45" rows="10" class="inpCampo"></textarea>
            <br>
            <button type="submit">Registar actividad de extensión</button>`
            h1Actividad.innerHTML = 'Registro de actividades de extensión'
            break;
    
        default:
            break;
    }
}

function limpiarFormulario(){

}

async function obtenerOpciones(tabla,dato) {
    const {data, error} = await _supabase
    .from(tabla)
    .select('*')

    if(error) console.error(error);
    else{
        let opciones = '';
        data.forEach(fila => {
            opciones = opciones + `<option>${fila.dato}<option>`
        });
        return opciones;
    }
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

cargarActividad(sessionStorage.getItem('actividad'));