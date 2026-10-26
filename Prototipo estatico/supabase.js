//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

//GLOBAL
const { createClient } = supabase;
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//GLOBAL
async function verificarSesion() {
    const rutaActual = window.location.pathname;
    if (!rutaActual.endsWith('index.html') && rutaActual !== '/') {
        const {data: {user}, error: authError} = await _supabase.auth.getUser();
        if (authError || !user){
            alert('No hay sesión activa');
            console.error('No hay sesión activa:', authError)
            window.location.replace('index.html');
        }
    }
}

//INDEXIS -------------------------------------------------------------------------------------------------------

//Función para iniciar sesión con la base de datos
export async function iniciarSesion(correo, contrasenna) {
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: correo,
      password: contrasenna
    });
//Si las credenciales son incorrectas o hay algún otro error lo imprime y alerta
    if (error) {
      console.error('Error al iniciar sesión:', error.message );
      alert('Error al iniciar sesión: ' + error.message);
      return;
    } 
//Sino lleva a la página 'inicio'
    else {
      console.log('Inicio de sesión exitoso:', data);
      window.location.replace('./inicio.html'); 
    }
}

//INICIO --------------------------------------------------------------------------------------------------------

//Función que verifica que el usuario sea administrador
export async function verificarAdministrador(btn) {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
//Si no hay una sesión activa lo imprime
    if (authError || !user) {
        console.error('No hay sesión activa:', authError?.message);
        window.location.replace('./inicio.html');
    }
//Agarra la propiedad 'tipo' únicamente con del usuario que comparte 'id' con el que tiene la sesión activa
    const {data, error} = await _supabase
        .from('perfiles')
        .select('tipo')
        .eq('id', user.id)
//Si hay algún error a momento de obtener 'tipo' lo imprime
    if (error) {
        console.error('Error al obtener tipo:', error.message);
        return;
    }
//Sino vuelve visible un botón para entrar a la página 'gestionUsuarios'
    else{
        if(data[0].tipo == 'Administrador') btn.style.visibility = 'visible';
    }
}

export async function cerrarSesion() {
    const {error} = await _supabase.auth.signOut({scope: 'local'});

    if (error)console.error('Error al cerrar sesión:', error.message);
    else {
        window.location.replace('index.html'); 
        console.log('Sesión cerrada exitosamente');
    }
}
//INFORMEL ------------------------------------------------------------------------------------------------------

//REGISTROACTIVIDADES -------------------------------------------------------------------------------------------

export async function cargarActividad(actividad){
    const {data, error} = await _supabase
    .from('perfiles')
    .select('nombre')
    .eq('tipo', 'Profesor')

    if(error) console.error('Error al obtener los nombres de los profesores', error);
    else{
        let opNombres = ``;
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
export async function registrarActividades(actividad) {
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
export async function cargarProfesorActual() {
    const inpCampos = document.querySelectorAll('.inpCampo');
//Obtine el usuario que tiene la sesión iniciada
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
//Si no encuentra una sesión iniciada imprime el problema
    if (authError || !user) console.error('No hay sesión activa:', authError?.message);
//Sino obtine 'nombre' de todos los usuarios con 'id' igual al usuario con la sesión iniada
    else{
        const {data, error} = await _supabase
            .from('perfiles')
            .select('nombre')
            .eq('id', user.id)
//Si hay algún error lo imprime
            if (error) console.error('Error al obtener perfil:', error.message);
//Sino cambia la opción del input de profesores por 'nombre'
            else inpCampos[0].value = data[0].nombre;
    }
}

export async function obtenerOpciones(tabla,dato) {
    const {data, error} = await _supabase
    .from(tabla)
    .select('*')

    if(error) console.error('Error al obtener las opciones',error.message);
    else{
        let opciones = ``;
        data.forEach(fila => {
            opciones = opciones + `<option>${fila[dato]}</option>`
        });
        return opciones;
    }
}

//REPORTERIAIL --------------------------------------------------------------------------------------------------

//Función para mostrar toda la información de las actividades en una tabla
export async function cargarActividades(datos, actividad) {
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
                <select name="nombre" class="inpFiltro" id="nProfesor" onchange="aplicarFiltro('nombre_profesor',0)">${opProfesores}</select>
                <label for="nActividad">Nombre de la actividad:</label>
                <input type="text" name="nActividad" class="inpFiltro" id="nActividad" onchange="aplicarFiltro('nombre_actividad',1)">
                <label for="tipo">Tipo de actividad:</label>
                <select name="tipo" class="inpFiltro" id="tipo" onchange="aplicarFiltro('tipo',2)">${obtenerOpciones('extension_tipo_actividad','tipo')}</select>
                <label for="tituloP">Título de la participación:</label>
                <select name="tituloP" class="inpFiltro" id="tituloP" onchange="aplicarFiltro('titulo_participacion',3)">${obtenerOpciones('extension_titulo_participacion','titulo')}</select>
                <label for="fecha">Fecha:</label>
                <input type="date" name="fecha" class="inpFiltro"id="fecha" onchange="aplicarFiltro('fecha',4)">
                <label for="lugar">Lugar:</label>
                <input type="text" name="lugar" class="inpFiltro" id="lugar" onchange="aplicarFiltro('lugar',5)">
                <label for="tipoP">Tipo de participación:</label>
                <select name="tipoP" class="inpFiltro" id="tipoP" onchange="aplicarFiltro('tipo_participacion',6)">${obtenerOpciones('extension_tipo_participacion','tipo')}</select>
                <label for="organizadores">Organizador(es):</label>
                <input type="text" name="organizadores" class="inpFiltro" id="organizadores" onchange="aplicarFiltro('organizadores',7)">
                <label for="otraInfo">Otra información:</label>
                <input type="text" name="otraInfo" class="inpFiltro" id="otraInfo" onchange="aplicarFiltro('comentarios',8)">`
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
export async function aplicarFiltro(filtro, inp) {
//Obtiene la información de todos los filtros
    const inpFiltro = document.querySelectorAll('.inpFiltro');
//Selecciona todo de la tabla de la base de datos solicitada donde cuente con el valor del filtro colocado
    const {data, error} = await _supabase
        .from(inpMostrarActividad.value)
        .select('*')
        .eq(filtro, inpFiltro[inp].value)
//Si hay algún error lo imprime
    if(error) console.error('Error al aplicar el filtro', error);
//Sino ejecuta la función 'cargarActividades' con la información recolectada de la base de datos y la tabla que se buscó como variables
    else cargarActividades(data, inpMostrarActividad.value);
}

//Función que ejecuta la función 'cargarActividades'
export async function obtenerActividad(actividad) {
//Obtiene la toda la información de la tabla seleccionada
    const {data, error} = await _supabase
        .from(actividad)
        .select('*')
//Si hay algún error lo imprime
    if(error) console.error('Error al obtener los datos:',error);
//Sino selecciona la opción correspondiente a la actividad seleccionada en el input para seleccionar actividades y ejecuta la función 'cargarActividades' con la información de la tabla y la actividad como variables
    else{
        inpMostrarActividad.value = actividad;
        cargarActividades(data, actividad);
    }
}

//GESTIONU ------------------------------------------------------------------------------------------------------

//Función para mostrar todos los datos de los usuarios en una tabla
export async function cargarUsuarios(){
//Selecciona todos los datos de los usuarios
    const {data, error} = await _supabase
        .from('perfiles')
        .select('*')
//Si hay algún error lo imprime
    if(error) console.error('Error:', error.message);
//Sino escribe los datos dentro de la tabla
    else{
        data.forEach(usu => {
           tblUsuarios.innerHTML = tblUsuarios.innerHTML + 
            `<tr>
            <td>${usu.id}</td>
            <td>${usu.nombre}</td>
            <td>${usu.correo}</td>
            <td>${usu.tipo}</td>
            <td><button onclick="mostrarModal('Edi','${usu.id}')">Editar</button><button onclick="mostrarModal('Bor',${usu.id})">Eliminar</button></td>
            </tr>` 
        });
    }
}

//Función para agregar un nuevo usuario al sistema
export async function agregarUsuarios(nombre, correo, contra, tipo) {
//Registra un usuario en la base de datos con los datos ingresados
    const {error} = await _supabase.auth.signUp({
        email: correo,
        password: contra,
        options: {
        data: {
            display_name: nombre,
            tipo: tipo
        }
        }
  });
//Si hay algún error lo imprime
    if (error) console.error('Error:', error.message);
//Sino ejecuta la función 'limpiarFormulairo'
    else{
        limpiarFormulario();
    }
}

export async function editarUsuarios(nuevoNombre, nuevoCorreo, nuevoTipo) {
    const {data, error} = await _supabase.auth.updateUser({
        email: nuevoCorreo,
        data: {
            display_name: nuevoNombre,
            tipo: nuevoTipo
        }
    });

    if (error)console.error("Error al actualizar usuario en Auth:", error.message);
    else{
        console.log("Usuario actualizado con éxito:", data.user);
        limpiarFormulario();
    }
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

window._supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.verificar = verificarSesion();