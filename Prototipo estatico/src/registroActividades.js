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
    const {data, error} = await _supabase
    .from('perfiles')
    .select('nombre')
    .eq('tipo', 'Profesor')

    if(error) console.error('Error al obtener los nombres de los profesores', error);
    else{
        let opNombres = '';
        data.forEach(profe =>{
            opNombres = opNombres + `<option value="${profe.nombre}">${profe.nombre}</option>`
        })
        switch (actividad) {
            case 'actividades_de_extension':
                frmRegistroActividades.innerHTML = 
                `<label for="nProfesor">Nombre del profesor:</label>
                <select name="nProfesor" id="nProfesor" class="inpCampo" required>${opNombres}</select>
                <br>
                <label for="tipo">Tipo de actividad:</label>
                <select name="tipo" id="tipo" class="inpCampo" required>${await obtenerOpciones('extension_tipo_actividad','tipo')}</select>
                <br>
                <label for="nActividad">Nombre de la actividad:</label>
                <input type="text" name="nActividad" id="nActividad" class="inpCampo" required>
                <br>
                <label for="tituloP">Título de la participación</label>
                <select name="tituloP" id="tituloP" class="inpCampo" required>${await obtenerOpciones('extension_titulo_participacion','titulo')}</select>
                <br>
                <label for="fecha">Fecha:</label>
                <input type="date" name="fecha" id="fecha" class="inpCampo" required>
                <br>
                <label for="lugar">Lugar:</label>
                <input type="text" name="lugar" id="lugar" class="inpCampo" required>
                <br>
                <label for="tipoP">Tipo de participación:</label>
                <select name="tipoP" id="tipoP" class="inpCampo" required>${await obtenerOpciones('extension_tipo_participacion','tipo')}</select>
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
        await cargarProfesorActual();
    }
}

//Función que registra una nueva actividad de extensión
async function registrarActividades(actividad) {
    const datos = document.querySelectorAll('.inpCampo');
    switch (actividad) {
        case 'actividades_de_extension':
            const {data, error} = await _supabase
            .from(actividad)
            .insert([{
                nombre_profesor : datos[0].value, tipo_actividad : datos[1].value, nombre_actividad : datos[2].value, titulo_participacion : datos[3].value, fecha : datos[4].value, lugar : datos[5].value, tipo_participacion : datos[6].value, organizadores : datos[7].value, otra_informacion: datos[8].value
            }])

            if(error) console.error('Error al registrar la actividad de extensión', error.message);
            else{
                alert('Actividad de extensión registrada correctamente');
                console.log('Actividad de extensión registrada', data);
                limpiarFormulario();
            }
            break;
    
        default:
            break;
    }
}

//Función que pone como predeterminado en el campo 'Nombre del profesor' al profesor que tiene la sesión iniciada
async function cargarProfesorActual() {
    const inpCampos = document.querySelectorAll('.inpCampo');
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
            else inpCampos[0].value = data[0].nombre;
    }
}

function limpiarFormulario(){
    const inpCampos = document.querySelectorAll('.inpCampo');
    inpCampos.forEach(campo => campo.value = '');
    cargarProfesorActual();
}

async function obtenerOpciones(tabla,dato) {
    const {data, error} = await _supabase
    .from(tabla)
    .select('*')

    if(error) console.error('Error al obtener las opciones',error.message);
    else{
        let opciones = '';
        data.forEach(fila => {
            opciones = opciones + `<option>${fila[dato]}</option>`
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

frmRegistroActividades.addEventListener('submit', async function(e){
    e.preventDefault();
    await registrarActividades(sessionStorage.getItem('actividad'));
});

window.obtenerOpciones() = obtenerOpciones();
window.cargarProfesorActual() = cargarProfesorActual();
verificar;