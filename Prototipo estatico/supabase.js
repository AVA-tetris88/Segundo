//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const { createClient } = supabase;
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";
const rutaActual = window.location.pathname;

const atributosExtension = [{'id':'tipo_actividad','atributo':'Tipo de actividad', 'tipo':0, 'tabla':'extension_tipo_actividad','dato':'tipo'},{'id':'nombre_actividad','atributo':'Nombre de la actividad', 'tipo':1},{'id':'titulo_participacion','atributo':'Título de la participación','tipo':0, 'tabla':'extension_titulo_participacion','dato':'titulo'},{'id':'fecha','atributo':'Fecha','tipo':2},{'id':'lugar','atributo':'Lugar','tipo':1},{'id':'tipo_participacion','atributo':'Tipo de participación','tipo':0,'tabla':'extension_tipo_participacion','dato':'tipo'},{'id':'organizadores','atributo':'Organizador(es)','tipo':1},{'id':'otra_informacion','atributo':'Otra información','tipo':1}];

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

//GLOBAL
export async function verificarSesion() {
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
export async function verificarAdministrador() {
    const {data: {user}, error: authError} = await _supabase.auth.getUser();
//Si no hay una sesión activa lo imprime
    if (authError || !user) {
        console.error('No hay sesión activa:', authError?.message);
        window.location.replace('./index.html');
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
//Si la ruta es 'inicio' vuelve visible un botón para entrar a la página 'gestionUsuarios'
    else if(rutaActual.endsWith('inicio.html') || rutaActual == '/inicio'){
        if(data[0].tipo == 'Administrador') btnGestionUsuarios.style.visibility = 'visible';
    }
//Si la ruta en 'gestionUsuarios'
    else if(rutaActual.endsWith('gestionUsuarios.html') || rutaActual == '/gestionUsuarios'){
//Si no es un usuario alerta 'Página solo apra administradores' y redirige a 'inicio'
        if(data[0].tipo != 'Administrador'){
            alert('Página solo para administradores');
            window.location.replace('./inicio.html');
        }
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
            opciones = opciones + `<option value="${fila[dato]}">${fila[dato]}</option>`
        });
        return opciones;
    }
}

//REPORTERIAIL --------------------------------------------------------------------------------------------------

//Función para mostrar toda la información de las actividades en una tabla
export async function cargarActividades(datos, actividad, filtro) {
//Obtiene la información con los con 'tipo' igual a 'Profesor'
    const {data, error} = await _supabase
        .from('perfiles')
        .select('nombre')
        .eq('tipo','Profesor')
//Si hay algún error lo imprime
    if(error)console.error('Error al cargar los profes:',error)
//Sino modifica todo el documento según la actividad
    else{
        let filtros = [];
        let opProfesores = `<option value="*">Todos</option>`;
//Busca y guarda los nombre de profesores como opciones de filtros
                data.forEach(profe => {
                    opProfesores = opProfesores + `<option value="${profe.nombre}">${profe.nombre}</option>` 
                });
//Pregunta por la variable 'activiad'
        switch (actividad) {
//Si es igual a 'actividades_de_extension'
            case 'actividades_de_extension':
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
                filtros = atributosExtension;
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
        if(!filtro){
            let htmlFiltros = `<label for="nombre_profesor">Nombre del profesor</label><select name="nombre_profesor" id="nombre_profesor" class="inpFiltro">${opProfesores}</select>`;
            for(const fltr of filtros){
                switch (fltr.tipo) {
                    case 0:
                        htmlFiltros = htmlFiltros + `<label for="${fltr.id}">${fltr.atributo}</label><select name="${fltr.id}" id="${fltr.id}" class="inpFiltro"><option value="*">Todos</option>${await obtenerOpciones(fltr.tabla,fltr.dato)}</select>`
                        break;

                    case 1:
                        htmlFiltros = htmlFiltros + `<label for="${fltr.id}">${fltr.atributo}</label><input type="text" name="${fltr.id}" id="${fltr.id}" class="inpFiltro">`
                        break;

                    case 2:
                        htmlFiltros = htmlFiltros + `<label for="${fltr.id}">${fltr.atributo}</label><input type="date" name="${fltr.id}" id="${fltr.id}" class="inpFiltro">`
                        break;

                    case 3:
                        htmlFiltros = htmlFiltros + `<label for="${fltr.id}">${fltr.atributo}</label><input type="number" name="${fltr.id}" id="${fltr.id}" class="inpFiltro">`
                        break;

                    default:
                        break;
                }
            }
            divFiltros.innerHTML = htmlFiltros;
        }
    }
}

//Función que busca la información según el filtro seleccionado
export async function aplicarFiltro(activador, nombreProfesor) {

    let query = _supabase.from(inpMostrarActividad.value).select('*');
    if(activador.value !== '' && activador.value !== '*' && nombreProfesor.value !== '*') {
        if(activador.id !== nombreProfesor.id) {
            if(activador.type == 'text') query.ilike(activador.id,`%${activador.value}%`).eq('nombre_profesor',nombreProfesor.value);
            else query.eq(activador.id, activador.value).eq('nombre_profesor',nombreProfesor.value); 
        } 
        else{
            query.eq('nombre_profesor',nombreProfesor.value);
        }
    }
    else if((activador.value === '' || activador.value === '*') && nombreProfesor.value !== '*') {
        query.eq('nombre_profesor',nombreProfesor.value);
    }
    else if (activador.value !== '' && activador.value !== '*' && nombreProfesor.value === '*') {
        if(activador.type == 'text') query.ilike(activador.id,`%${activador.value}%`);
        else query.eq(activador.id, activador.value); 
    }
    else {
        await obtenerActividad(inpMostrarActividad.value);
        return; 
    }
    const {data, error} = await query;

    if(error) console.error('Error al aplicar el filtro', error)
    else cargarActividades(data, inpMostrarActividad.value, 1);
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