
//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/                                                                                           

const usuario = document.getElementById("usuario");
const contrasenna = document.getElementById("contrasenna");
const btnIS = document.getElementById("btnIS");
const btnNN = document.getElementById("btnNN");
const DE = document.getElementById("datosExt");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 


//Ver actividades de extensión
async function verExt() {
  const { data, error } = await _supabase
    .from('actividades_de_extension')
    .select('*');

  if (error) console.error('Error:', error.message);
  else {
    DE.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}

async function registrarUsuario(email, password) {
  const { data, error } = await _supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) console.error('Error al registrar:', error.message);
  else console.log('Usuario registrado:', data.user);
}

//Post funciones
  

if (location.pathname.endsWith("inicio.html")) {
  btnNN.addEventListener("click", function() {
    actualizarNombre(document.getElementById("nuevoNombre").value);
  });
}
