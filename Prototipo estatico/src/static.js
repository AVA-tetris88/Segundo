
const SUPABASE_URL = "https://pxndzjbdfcdoxjruihid.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bmR6amJkZmNkb3hqcnVpaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODkzMzcsImV4cCI6MjEwNjg2NTMzN30.MEupu-T5V84jKPj_maKO8-kJce_B0wzSPWbakVzSVY0";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//Arreglos con los datos
let usuarios = [{id:1, nombre:"Andrey", correo:"a.vega@itcr.ac.cr", contrasenna:"1234", tipo:"profesor"},
    {id:2, nombre:"Edwin", correo:"e.segura@itcr.ac.cr", contrasenna:"5678", tipo:"profesor"},
    {id:3, nombre:"Ale", correo:"ava@ava.com", contrasenna:88, tipo:"administrador"}];
let tda = [{id:1, nombre:"Charla"}, {id:2, nombre:"Visita"}, 
    {id:3, nombre:"Proyecto"}, {id:4, nombre:"Práctica"}]
let tp = [{id:1, nombre:"Charlista"},{id:2, nombre:"Guía"},
    {id:3, nombre:"Asesor"},{id:4, nombre:"Tutor"}]

//Funciones
function VerificarCredenciales() {
    const usuario = document.getElementById("usuario").value;
    const contrasenna = document.getElementById("contrasenna").value;
    let i = 0;
    usuarios.forEach(indice => {
        if (indice.correo == usuario && indice.contrasenna == contrasenna){
            location.href = "index.html";
            i = 1;
        }
    });
    if (i == 0){
        alert("Usuario o contraseña incorrectos");
    }
    
}

//Post funciones
document.addEventListener('keypress', function(tecla){
    if(tecla.key == 'Enter'){
        tecla.preventDefault();
        VerificarCredenciales();
    }
});

async function probarConexion() {
            // Reemplaza 'tu_tabla' por el nombre real de alguna tabla que tengas
            const { data, error } = await _supabase
                .from('Usuarios') 
                .select('*');

            const contenedor = document.getElementById('salida');

            if (error) {
                contenedor.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
                console.error(error);
            } else {
                contenedor.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            }
        }
probarConexion();
