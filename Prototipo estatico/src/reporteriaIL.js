//   __   __  ______    ______    __    ______    ______    __        ______    ______    
//  /\ \ / /  \  __ \  /\  == \  /\ \  /\  __ \  /\  == \  /\ \      /\  ___\  /\  ___\   
//  \ \ \'/  \ \  __ \ \ \  __<  \ \ \ \ \  __ \ \ \  __<  \ \ \____ \ \  __\  \ \___  \  
//   \ \__|   \ \_\ \_\ \ \_\ \_\ \ \_\ \ \_\ \_\ \ \_____\ \ \_____\ \ \_____\ \/\_____\ 
//    \/_/     \/_/\/_/  \/_/ /_/  \/_/  \/_/\/_/  \/_____/  \/_____/  \/_____/  \/_____/

const inpMostrarActividad = document.getElementById("actividad");
const tblCabeza = document.getElementById("tblCabeza");
const tblCuerpo = document.getElementById("tblCuerpo");

//   ______   __  __    __   __    ______    __    ______    __   __    ______    ______    
//  /\  ___\ /\ \/\ \  /\ "-.\ \  /\  ___\  /\ \  /\  __ \  /\ "-.\ \  /\  ___\  /\  ___\   
//  \ \  __\ \ \ \_\ \ \ \ \-.  \ \ \ \____ \ \ \ \ \ \/\ \ \ \ \-.  \ \ \  __\  \ \___  \  
//   \ \_\    \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_____\ \ \_\\"\_\ \ \_____\ \/\_____\ 
//    \/_/     \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_____/  \/_/ \/_/  \/_____/  \/_____/ 

async function cargarActividad(actividad) {
    const {data, error} = await _supabase
    .from(actividad)
    .select('*')

    if(error) console.error('Error al cargar la actividad:', error)
    else{
        switch (actividad) {
            case 'actividades_de_extension':
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

                data.forEach(inf => {
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

//   ______    ______    ______    __  __    ______    __   __    ______    __    ______    
//  /\  ___\  /\  ___\  /\  ___\  /\ \/\ \  /\  ___\  /\ "-.\ \  /\  ___\  /\ \  /\  __ \   
//  \ \___  \ \ \  __\  \ \ \____ \ \ \_\ \ \ \  __\  \ \ \-.  \ \ \ \____ \ \ \ \ \  __ \  
//   \/\_____\ \ \_____\ \ \_____\ \ \_____\ \ \_____\ \ \_\\"\_\ \ \_____\ \ \_\ \ \_\ \_\ 
//    \/_____/  \/_____/  \/_____/  \/_____/  \/_____/  \/_/ \/_/  \/_____/  \/_/  \/_/\/_/ 

cargarActividad(sessionStorage.getItem('actividad'));

inpMostrarActividad.addEventListener("change", function(e){
    e.preventDefault();
    cargarActividad(inpMostrarActividad.value);
})