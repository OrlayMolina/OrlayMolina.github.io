let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
// Estos son las referencias a mis inputs
const inputNombreUsuario = document.getElementById("inputNombreUsuario");
const inputCargo = document.getElementById("inputCargo");
const inputCorreo = document.getElementById("inputCorreo");
const inputImagen = document.getElementById("inputImagen");

// Estas son las referencias a mis botones
const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divUsuario = document.getElementById("divUsuario");
const alertSinUsuarios = document.getElementById("alertSinUsuarios");

let indexEditar = null;

class Usuario {
    constructor(nombre, cargo, correo, imagen) {
        this.nombre = nombre;
        this.cargo = cargo;
        this.correo = correo;
        this.imagen = imagen;
    }
}

function guardarUsuario() {
    let nombre = inputNombreUsuario.value;
    let cargo = inputCargo.value;
    let correo = inputCorreo.value;
    let imagen = inputImagen.value;

    if (imagen === "") {
        imagen = ""; // Puedes pegar una URL sencilla aquí
    }

    let usuario = new Usuario(
        nombre,
        cargo,
        correo,
        imagen
    );
    console.log(usuario);

    if (indexEditar === null) {
        console.log("Agregar Usuario");
        usuarios.push(usuario);
    } else {
        usuarios[indexEditar] = usuario;
        indexEditar = null;
        console.log("Editar Usuario");
    }
    limpiarFormularioUsuarios();
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Entró en la función guardar usuario");
    mostrarUsuarios();
}

function borrarTodo() {
    console.log("Entró a borrar todo");
    localStorage.clear();
    usuarios = [];
    mostrarUsuarios(); // Corregido el nombre de la función
    alert("Se borraron los usuarios");
}

// Tarea: separar en función la lógica de llenar el formulario
function editarUsuario(index) {
    console.log("Entró a editar usuario: " + index);
    let usuarioAEditar = usuarios[index];
    inputNombreUsuario.value = usuarioAEditar.nombre;
    inputCargo.value = usuarioAEditar.cargo;
    inputCorreo.value = usuarioAEditar.correo;
    inputImagen.value = usuarioAEditar.imagen;
    indexEditar = index;
}

function eliminarUsuario(index) {
    console.log("Entró a eliminar usuario: " + index);
    usuarios.splice(index, 1);
    // Guardar en el local storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios(); // Corregido el nombre de la función
}

function mostrarUsuarios() { // Corregido el nombre de la función
    if (usuarios.length === 0) {
        divUsuario.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinUsuarios">
            No hay usuarios agregados
        </div>`;
    } else {
        divUsuario.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            divUsuario.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${usuario.imagen}" class="img-fluid rounded-start" alt="usuario">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${usuario.nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${usuario.cargo} - ${usuario.correo}</h6>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarUsuario(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarUsuario(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioUsuarios() {
    inputNombreUsuario.value = "";
    inputCargo.value = "";
    inputCorreo.value = "";
    inputImagen.value = "";
}

btnAgregar.addEventListener("click", guardarUsuario);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarUsuarios();
