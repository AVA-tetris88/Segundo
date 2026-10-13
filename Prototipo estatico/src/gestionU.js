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

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/

async function cargarUsuarios(){
    const {data, error} = await _supabase
        .from('perfiles')
        .select('*')

    if(error) console.error('Error:', error.message);
    else{
        console.log(data);
        data.forEach(usu => {
           tblUsuarios.innerHTML = tblUsuarios.innerHTML + 
            `<tr>
            <td>${usu.id}</td>
            <td>${usu.nombre}</td>
            <td>${usu.correo}</td>
            <td>${usu.password}</td>
            <td>${usu.tipo}</td>
            </tr>` 
        });
    }
}

async function agregarUsuarios(nombre, correo, contra, tipo) {
    const {data, error} = await _supabase.auth.signUp({
        email: correo,
        password: contra,
        options: {
        data: {
            display_name: nombre
        }
        }
  });
    if (error) console.error('Error:', error.message);
    else{
        console.log('Usuario registrado con nombre:', data.user);
        agregarTipo(tipo);
        cargarUsuarios();
    }
}

async function agregarTipo(tipo) {
    const {data, error} = await _supabase
        .from('perfiles')
        .update({tipo: tipo})
        .eq('tipo', null)
        .select();

    if(error) console.error('Error al crear tipo:', error.message)
    else console.log('Usuario completado:', data);
}
//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

cargarUsuarios();

frmAgregarUsuarios.addEventListener("submit", async function(e) {
    e.preventDefault
    await agregarUsuarios(inpNombre.value, inpCorreo.value, inpContrasenna.value, inpTipo.value);
})