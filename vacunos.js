// ==========================================
// AgroCount V4
// Archivo: vacunos.js
// Gestión completa de vacunos
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const formVacuno =
    document.getElementById(
        "formVacuno"
    );

const vacunoId =
    document.getElementById(
        "vacunoId"
    );

const caravanaVacuno =
    document.getElementById(
        "caravanaVacuno"
    );

const sexoVacuno =
    document.getElementById(
        "sexoVacuno"
    );

const categoriaVacuno =
    document.getElementById(
        "categoriaVacuno"
    );

const razaVacuno =
    document.getElementById(
        "razaVacuno"
    );

const pesoVacuno =
    document.getElementById(
        "pesoVacuno"
    );

const fechaPesoVacuno =
    document.getElementById(
        "fechaPesoVacuno"
    );

const potreroVacuno =
    document.getElementById(
        "potreroVacuno"
    );

const notaVacuno =
    document.getElementById(
        "notaVacuno"
    );

const btnNuevoVacuno =
    document.getElementById(
        "btnNuevoVacuno"
    );

const btnCancelarVacuno =
    document.getElementById(
        "btnCancelarVacuno"
    );

const listaVacunos =
    document.getElementById(
        "listaVacunos"
    );

const buscarVacuno =
    document.getElementById(
        "buscarVacuno"
    );


// ==========================================
// DATOS
// ==========================================

let vacunos =
    obtenerVacunos();

let vacunosFiltrados =
    copiarLista(
        vacunos
    );


// ==========================================
// CATÁLOGOS
// ==========================================

const CATEGORIAS = {

    Macho: [

        "Ternero",
        "Novillito",
        "Novillo",
        "Toro",
        "Buey"

    ],

    Hembra: [

        "Ternera",
        "Vaquillona",
        "Vaca",
        "Vaca preñada",
        "Vaca vacía",
        "Vaca de cría",
        "Vaca de invernada",
        "Vaca de descarte"

    ]

};


const RAZAS_VACUNAS = [

    "Aberdeen Angus",
    "Red Angus",
    "Hereford",
    "Polled Hereford",
    "Braford",
    "Brangus",
    "Charolais",
    "Limousin",
    "Simmental",
    "Holando",
    "Jersey",
    "Normando",
    "Wagyu",
    "Criollo",
    "Otra"

];


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarVacunos(){

    cargarRazasVacuno();

    cargarPotrerosVacuno();

    cargarCategoriasVacuno();

    renderizarVacunos();


    sexoVacuno?.addEventListener(

        "change",

        cargarCategoriasVacuno

    );


    btnNuevoVacuno?.addEventListener(

        "click",

        abrirFormularioVacuno

    );


    btnCancelarVacuno?.addEventListener(

        "click",

        cerrarFormularioVacuno

    );


    registrarLog(

        "vacunos.js cargado correctamente."

    );

}


// ==========================================
// FORMULARIO
// ==========================================

function cargarCategoriasVacuno(){

    if(

        !sexoVacuno ||

        !categoriaVacuno

    ){

        return;

    }


    categoriaVacuno.innerHTML = "";


    if(

        sexoVacuno.value === ""

    ){

        categoriaVacuno.disabled = true;

        categoriaVacuno.innerHTML =

            '<option value="">Seleccione primero el sexo</option>';

        return;

    }


    categoriaVacuno.disabled = false;


    categoriaVacuno.innerHTML =

        '<option value="">Seleccionar categoría</option>';


    const categorias =
        CATEGORIAS[
            sexoVacuno.value
        ] || [];


    categorias.forEach(

        function(categoria){

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                categoria;

            opcion.textContent =
                categoria;

            categoriaVacuno.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// CARGAR RAZAS
// ==========================================

function cargarRazasVacuno(){

    if(!razaVacuno){

        return;

    }


    razaVacuno.innerHTML =

        '<option value="">Seleccionar</option>';


    RAZAS_VACUNAS.forEach(

        function(raza){

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                raza;

            opcion.textContent =
                raza;

            razaVacuno.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// CARGAR POTREROS
// ==========================================

function cargarPotrerosVacuno(){

    if(!potreroVacuno){

        return;

    }


    potreroVacuno.innerHTML =

        '<option value="">Seleccionar</option>';


    obtenerPotreros().forEach(

        function(potrero){

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                potrero.nombre;

            opcion.textContent =
                potrero.nombre;

            potreroVacuno.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// ABRIR FORMULARIO
// ==========================================

function abrirFormularioVacuno(){

    if(!formVacuno){

        return;

    }


    formVacuno.reset();

    vacunoId.value = "";


    cargarPotrerosVacuno();

    cargarCategoriasVacuno();


    formVacuno.classList.remove(
        "formulario-oculto"
    );


    caravanaVacuno?.focus();

}


// ==========================================
// CERRAR FORMULARIO
// ==========================================

function cerrarFormularioVacuno(){

    if(!formVacuno){

        return;

    }


    formVacuno.reset();

    vacunoId.value = "";


    cargarCategoriasVacuno();


    formVacuno.classList.add(
        "formulario-oculto"
    );

}


// ==========================================
// GUARDAR VACUNO
// ==========================================

if(formVacuno){

    formVacuno.addEventListener(

        "submit",

        function(evento){

            evento.preventDefault();


            const idAnterior =
                vacunoId.value;


            const datos = {

                id:
                    idAnterior ||
                    generarId(),

                caravana:
                    caravanaVacuno.value.trim(),

                sexo:
                    sexoVacuno.value,

                categoria:
                    categoriaVacuno.value,

                raza:
                    razaVacuno.value,

                peso:
                    convertirNumero(
                        pesoVacuno.value
                    ),

                fechaPeso:
                    fechaPesoVacuno.value,

                potrero:
                    potreroVacuno.value,

                nota:
                    notaVacuno.value.trim()

            };


            // ======================================
            // VALIDACIONES
            // ======================================

            if(

                estaVacio(
                    datos.caravana
                )

            ){

                mostrarNotificacion(

                    "Ingrese la caravana.",

                    "advertencia"

                );

                caravanaVacuno.focus();

                return;

            }


            if(

                estaVacio(
                    datos.sexo
                )

            ){

                mostrarNotificacion(

                    "Seleccione el sexo.",

                    "advertencia"

                );

                sexoVacuno.focus();

                return;

            }


            if(

                estaVacio(
                    datos.categoria
                )

            ){

                mostrarNotificacion(

                    "Seleccione la categoría.",

                    "advertencia"

                );

                categoriaVacuno.focus();

                return;

            }


            // ======================================
            // BUSCAR SI ES EDICIÓN
            // ======================================

            const indice =

                vacunos.findIndex(

                    function(item){

                        return (

                            item.id ===
                            datos.id

                        );

                    }

                );


            const esEdicion =
                indice >= 0;


            // ======================================
            // GUARDAR EN LISTA
            // ======================================

            if(esEdicion){

                vacunos[indice] =
                    datos;

            }else{

                vacunos.push(
                    datos
                );

            }


            // ======================================
            // GUARDAR STORAGE
            // ======================================

            const guardado =
                guardarVacunos(
                    vacunos
                );


            if(!guardado){

                mostrarNotificacion(

                    "No se pudo guardar el vacuno.",

                    "error"

                );

                return;

            }


            // ======================================
            // REGISTRO HISTÓRICO
            // ======================================

            if(

                typeof agregarRegistro ===
                "function"

            ){

                if(esEdicion){

                    agregarRegistro(

                        "Vacuno actualizado",

                        "Caravana: " +
                        datos.caravana +
                        " · " +
                        datos.categoria +
                        " · " +
                        (
                            datos.raza ||
                            "Raza no especificada"
                        ) +
                        " · Potrero: " +
                        (
                            datos.potrero ||
                            "Sin potrero"
                        )

                    );

                }else{

                    agregarRegistro(

                        "Vacuno registrado",

                        "Caravana: " +
                        datos.caravana +
                        " · " +
                        datos.categoria +
                        " · " +
                        (
                            datos.raza ||
                            "Raza no especificada"
                        ) +
                        " · Potrero: " +
                        (
                            datos.potrero ||
                            "Sin potrero"
                        )

                    );

                }

            }


            // ======================================
            // ACTUALIZAR LISTA
            // ======================================

            vacunosFiltrados =
                copiarLista(
                    vacunos
                );


            renderizarVacunos();


            // ======================================
            // ACTUALIZAR RESUMEN
            // ======================================

            if(

                typeof actualizarResumen ===
                "function"

            ){

                actualizarResumen();

            }


            // ======================================
            // ACTUALIZAR REGISTROS SI ESTÁN ABIERTOS
            // ======================================

            if(

                typeof renderizarRegistros ===
                "function"

            ){

                renderizarRegistros();

            }


            cerrarFormularioVacuno();


            mostrarNotificacion(

                esEdicion

                ?

                "Vacuno actualizado correctamente."

                :

                "Vacuno guardado correctamente.",

                "exito"

            );

        }

    );

}


// ==========================================
// EDITAR
// ==========================================

function editarVacuno(id){

    const vacuno =

        vacunos.find(

            function(item){

                return (

                    item.id ===
                    id

                );

            }

        );


    if(!vacuno){

        return;

    }


    abrirFormularioVacuno();


    vacunoId.value =
        vacuno.id;


    caravanaVacuno.value =
        vacuno.caravana || "";


    sexoVacuno.value =
        vacuno.sexo || "";


    cargarCategoriasVacuno();


    categoriaVacuno.value =
        vacuno.categoria || "";


    razaVacuno.value =
        vacuno.raza || "";


    pesoVacuno.value =
        vacuno.peso ?? "";


    fechaPesoVacuno.value =
        vacuno.fechaPeso || "";


    potreroVacuno.value =
        vacuno.potrero || "";


    notaVacuno.value =
        vacuno.nota || "";

}


// ==========================================
// ELIMINAR
// ==========================================

async function eliminarVacuno(id){

    const vacuno =
        vacunos.find(

            function(item){

                return (

                    item.id ===
                    id

                );

            }

        );


    if(!vacuno){

        return;

    }


    const confirmado =

        await confirmarAccion(

            "¿Deseas eliminar este vacuno?"

        );


    if(!confirmado){

        return;

    }


    vacunos =

        vacunos.filter(

            function(item){

                return (

                    item.id !==
                    id

                );

            }

        );


    const guardado =
        guardarVacunos(
            vacunos
        );


    if(!guardado){

        mostrarNotificacion(

            "No se pudo eliminar el vacuno.",

            "error"

        );

        return;

    }


    // ======================================
    // REGISTRO HISTÓRICO
    // ======================================

    if(

        typeof agregarRegistro ===
        "function"

    ){

        agregarRegistro(

            "Vacuno eliminado",

            "Caravana: " +
            (
                vacuno.caravana ||
                "Sin caravana"
            ) +
            " · " +
            (
                vacuno.categoria ||
                "Categoría no especificada"
            ) +
            " · " +
            (
                vacuno.raza ||
                "Raza no especificada"
            )

        );

    }


    vacunosFiltrados =
        copiarLista(
            vacunos
        );


    renderizarVacunos();


    if(

        typeof actualizarResumen ===
        "function"

    ){

        actualizarResumen();

    }


    if(

        typeof renderizarRegistros ===
        "function"

    ){

        renderizarRegistros();

    }


    cerrarFormularioVacuno();


    mostrarNotificacion(

        "Vacuno eliminado correctamente.",

        "exito"

    );

}


// ==========================================
// BUSCAR
// ==========================================

if(buscarVacuno){

    buscarVacuno.addEventListener(

        "input",

        function(){

            const texto =

                this.value
                .trim()
                .toLowerCase();


            vacunosFiltrados =

                vacunos.filter(

                    function(item){

                        const caravana =
                            String(
                                item.caravana ??
                                ""
                            )
                            .toLowerCase();


                        const sexo =
                            String(
                                item.sexo ??
                                ""
                            )
                            .toLowerCase();


                        const categoria =
                            String(
                                item.categoria ??
                                ""
                            )
                            .toLowerCase();


                        const raza =
                            String(
                                item.raza ??
                                ""
                            )
                            .toLowerCase();


                        const potrero =
                            String(
                                item.potrero ??
                                ""
                            )
                            .toLowerCase();


                        return (

                            caravana.includes(
                                texto
                            )

                            ||

                            sexo.includes(
                                texto
                            )

                            ||

                            categoria.includes(
                                texto
                            )

                            ||

                            raza.includes(
                                texto
                            )

                            ||

                            potrero.includes(
                                texto
                            )

                        );

                    }

                );


            renderizarVacunos();

        }

    );

}


// ==========================================
// TABLA
// ==========================================

function renderizarVacunos(){

    if(!listaVacunos){

        return;

    }


    listaVacunos.innerHTML = "";


    if(

        vacunosFiltrados.length ===
        0

    ){

        listaVacunos.innerHTML = `

            <tr>

                <td colspan="5">

                    No hay vacunos registrados.

                </td>

            </tr>

        `;

        return;

    }


    vacunosFiltrados.forEach(

        function(vacuno){

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>

                    ${String(
                        vacuno.caravana ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        vacuno.sexo ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        vacuno.categoria ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        vacuno.potrero ??
                        ""
                    )}

                </td>

                <td>

                    <div class="acciones-tabla">

                        <button

                            type="button"

                            class="btn-tabla btn-editar"

                            onclick="editarVacuno('${vacuno.id}')"

                            aria-label="Editar vacuno"

                            title="Editar">

                            <span
                                class="material-symbols-rounded">

                                edit

                            </span>

                        </button>


                        <button

                            type="button"

                            class="btn-tabla btn-eliminar"

                            onclick="eliminarVacuno('${vacuno.id}')"

                            aria-label="Eliminar vacuno"

                            title="Eliminar">

                            <span
                                class="material-symbols-rounded">

                                delete

                            </span>

                        </button>

                    </div>

                </td>

            `;


            listaVacunos.appendChild(
                fila
            );

        }

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.editarVacuno =
    editarVacuno;


window.eliminarVacuno =
    eliminarVacuno;


window.renderizarVacunos =
    renderizarVacunos;


window.iniciarVacunos =
    iniciarVacunos;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================