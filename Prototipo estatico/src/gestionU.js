//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const tblUsuarios = document.getElementById("tblUsuarios");
const inpNombre = document.getElementById("nombre");
const inpContrasenna = document.getElementById("contra");
const inpCorreo = document.getElementById("correo");
const inpTipo = document.getElementById("tipo");
const frmAgregarUsuarios = document.getElementById("AgregarUsuarios");
const divModalAct = document.querySelector(".modalAct");
const h1Modal = document.getElementById("h1Modal");
const btnModal = document.getElementById("btnModal");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/

//Función para mostrar todos los datos de los usuarios en una tabla
async function cargarUsuarios(){
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
async function agregarUsuarios(nombre, correo, contra, tipo) {
//Registra un usuario en la base de datos con los datos ingresados
    const {data, error} = await _supabase.auth.signUp({
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

async function editarUsuarios(nuevoNombre, nuevoCorreo, nuevoTipo) {
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

async function mostrarModal(op, id){
    divModalAct.style.visibility = 'visible';
    if(op == 'Agr'){
        h1Modal.innerHTML = 'Registro de un nuevo usuario';
        btnModal.innerHTML = 'Agregar';
        frmAgregarUsuarios.addEventListener('submit', function(e){
            e.preventDefault
            agregarUsuarios(inpNombre.value,inpCorreo.value,inpContrasenna.value,inpTipo.value);
        });    
    }
    else if(op == 'Edi'){
        const {data, error} = await _supabase
        .from('perfiles')
        .select('*')
        .eq('id',id)
        if(error) console.error('Error al cargar la información del usuario', error);
        else{
            let Campos = document.querySelectorAll('input, select');
            Campos[0].value = data[0].nombre;
            Campos[2].value = data[0].correo;
            Campos[3].value = data[0].tipo;
            document.getElementById('contra').style.visibility = 'hidden';
            document.getElementById('lblcontra').style.visibility = 'hidden';
            h1Modal.innerHTML = 'Edición de un usuario existente';
            btnModal.innerHTML = 'Editar';
            inpContrasenna.value = 'edición';
            frmAgregarUsuarios.addEventListener('submit', function(e){
            e.preventDefault
            editarUsuarios(inpNombre.value,inpCorreo.value,inpTipo.value);
            });  
        }
    }
}

//Función que limpia toda la información que se encuentre en los inputs y la tabla y esconde el modal
function limpiarFormulario(){
    let Campos = document.querySelectorAll("input, select");
    Campos.forEach(campo => campo.value = "");
    tblUsuarios.innerHTML = "";
    divModalAct.style.visibility = 'hidden';
//Ejecuta la función 'cargarUsuarios'
    cargarUsuarios();
}

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

//Ejecuta la función 'cargarUsuarios'
cargarUsuarios();

verificar;