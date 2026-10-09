
//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/                                                                                           
                                             
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

//Inicio de sesión
async function iniciarSesion(usuario, contrasenna) {
  try {
    console.log("1. Iniciando llamada a Supabase...");
    
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: 'ava@ava.com',
      password: 'AA1234aa'
    });

    if (error) {
      console.error("2. Error de Supabase:", error.message, error);
      return;
    }

    console.log("3. Éxito:", data);
  } catch (err) {
    console.error("Excepción inesperada:", err);
  }
}
//Actualizar nombre
async function actualizarNombre(nuevoNombre) {
  const { data, error } = await _supabase.auth.updateUser({
    data: {
      display_name: nuevoNombre
    }
  });

  if (error) alert('Error al actualizar:', error.message);
  else console.log('Nombre actualizado:', data.user);
}
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
if (location.pathname.endsWith("index.html")) {
  document.addEventListener('keypress', function(tecla){
  if(tecla.key == 'Enter'){
    tecla.preventDefault();
    registrarUsuario("nombre@prueba1.com", "123456");
  }
  });
  btnIS.addEventListener("click", function() {
    iniciarSesion("ava@ava.com", "AA1234aa");
  });
}
if (location.pathname.endsWith("inicio.html")) {
  btnNN.addEventListener("click", function() {
    actualizarNombre(document.getElementById("nuevoNombre").value);
  });
}
