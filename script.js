/* SIMULADOR DE RECOLECCION DE CONSULTAS

El siguiente código tiene como finalidad recolestar consultas que puedan tener los pacientes o potenciales pacientes que visiten la web,
luego de que la consulta es enviada, la misma se almacena en el localStorage un array llamado "consultas".

Debajo del formulario se encuentra un botón llamado "Mostrar Consultas", el cual a futuro sera visible solo para los que tengan
acceso de Administradores y al presional el mismo puedan ver las tarjetas con las consultas cargadas y pendientes de responder. 

Luego de que la consulta fue leida y la respuesta fue enviada, se puede presionar el botón "Eliminar Consulta" y la misma se borra 
del Dom y del localStorage. Nuevamente, es esperado que solo los Admistradores tengan acceso a esta información y botones. 

*/

class Contacto { 
    constructor(nombre, apellido, email, consulta){
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.consulta = consulta
}}

let consultas = []

const formContactenos = document.getElementById("contactanosForm")

const divConsulta = document.getElementById("divConsulta")

const botonConsultas = document.getElementById("botonAdmin")

if (localStorage.getItem("consultas")){
    consultas = JSON.parse(localStorage.getItem("consultas"))
} else{
    localStorage.setItem("consultas", JSON.stringify(consultas))
}


formContactenos.addEventListener("submit", (event) => { 

    event.preventDefault() 
        
    let Nombre = document.getElementById("idNombre").value
    let Apellido = document.getElementById("idApellido").value
    let Email = document.getElementById("idEmail").value
    let Consulta = document.getElementById("idConsulta").value

    const consulta = new Contacto (Nombre, Apellido, Email, Consulta)

    consultas.push(consulta)
    localStorage.setItem("consultas", JSON.stringify(consultas))
})

botonAdmin.addEventListener("click", () => {
        let arrayStorage = JSON.parse(localStorage.getItem("consultas"))
        divUsers.innerHTML= " "
        arrayStorage.forEach((consultas, indice) => {
        divUsers.innerHTML += `
        <div class="card" id="consulta${indice}" style="width: 18rem;">
            <div class="card-body">
             <div><h2 class="card-title">${consultas.nombre + " " + consultas.apellido}</h2></div>
                <p class="card-text">${consultas.email}</p>
                <p class="card-text">${consultas.consulta}</p><br>
                <button class="btn btn-danger">Eliminar Consulta</button>
            </div>
        </div>
        `
    })
    arrayStorage.forEach((consulta, indice) => {   
        let botonEliminar = document.getElementById(`consulta${indice}`).lastElementChild.lastElementChild
        botonEliminar.addEventListener("click", () =>{
            document.getElementById(`consulta${indice}`).remove()
            consultas.splice(indice,1)
            localStorage.setItem("consultas", JSON.stringify(consultas))
        })
})
})

        