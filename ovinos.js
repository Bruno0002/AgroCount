// ==========================================
// AgroCount V4
// Archivo: ovinos.js
// Gestión completa de ovinos
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const formOvino =
    document.getElementById(
        "formOvino"
    );

const ovinoId =
    document.getElementById(
        "ovinoId"
    );

const caravanaOvino =
    document.getElementById(
        "caravanaOvino"
    );

const sexoOvino =
    document.getElementById(
        "sexoOvino"
    );

const categoriaOvino =
    document.getElementById(
        "categoriaOvino"
    );

const razaOvino =
    document.getElementById(
        "razaOvino"
    );

const pesoOvino =
    document.getElementById(
        "pesoOvino"
    );

const fechaPesoOvino =
    document.getElementById(
        "fechaPesoOvino"
    );

const potreroOvino =
    document.getElementById(
        "potreroOvino"
    );

const notaOvino =
    document.getElementById(
        "notaOvino"
    );

const btnNuevoOvino =
    document.getElementById(
        "btnNuevoOvino"
    );

const btnCancelarOvino =
    document.getElementById(
        "btnCancelarOvino"
    );

const listaOvinos =
    document.getElementById(
        "listaOvinos"
    );

const buscarOvino =
    document.getElementById(
        "buscarOvino"
    );


// ==========================================
// DATOS
// ==========================================

let ovinos =
    obtenerOvinos();

let ovinosFiltrados =
    copiarLista(
        ovinos
    );


// ==========================================
// CATÁLOGOS
// ==========================================

const CATEGORIAS_OVINAS = {

    Macho: [

        "Cordero",
        "Borrego",
        "Capón",
        "Carnero"

    ],

    Hembra: [

        "Cordera",
        "Borrega",
        "Oveja",
        "Oveja preñada",
        "Oveja vacía",
        "Oveja de cría",
        "Oveja de descarte"

    ]

};


const RAZAS_OVINAS = [

    "Corriedale",
    "Merino Australiano",
    "Ideal",
    "Romney Marsh",
    "Texel",
    "Hampshire Down",
    "Suffolk",
    "Dorper",
    "Poll Dorset",
    "Île de France",
    "Criolla",
    "Otra"

];


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarOvinos(){

    cargarRazasOvino();

    cargarPotrerosOvino();

    cargarCategoriasOvino();

    renderizarOvinos();


    sexoOvino?.addEventListener(

        "change",

        cargarCategoriasOvino

    );


    btnNuevoOvino?.addEventListener(

        "click",

        abrirFormularioOvino

    );


    btnCancelarOvino?.addEventListener(

        "click",

        cerrarFormularioOvino

    );


    registrarLog(

        "ovinos.js cargado correctamente."

    );

}


// ==========================================
// FORMULARIO
// ==========================================

function cargarCategoriasOvino(){

    if(

        !sexoOvino ||

        !categoriaOvino

    ){

        return;

    }


    categoriaOvino.innerHTML = "";


    if(

        sexoOvino.value === ""

    ){

        categoriaOvino.disabled = true;

        categoriaOvino.innerHTML =

            '<option value="">Seleccione primero el sexo</option>';

        return;

    }


    categoriaOvino.disabled = false;


    categoriaOvino.innerHTML =

        '<option value="">Seleccionar categoría</option>';


    const categorias =
        CATEGORIAS_OVINAS[
            sexoOvino.value
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

            categoriaOvino.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// CARGAR RAZAS
// ==========================================

function cargarRazasOvino(){

    if(!razaOvino){

        return;

    }


    razaOvino.innerHTML =

        '<option value="">Seleccionar</option>';


    RAZAS_OVINAS.forEach(

        function(raza){

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                raza;

            opcion.textContent =
                raza;

            razaOvino.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// CARGAR POTREROS
// ==========================================

function cargarPotrerosOvino(){

    if(!potreroOvino){

        return;

    }


    potreroOvino.innerHTML =

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

            potreroOvino.appendChild(
                opcion
            );

        }

    );

}


// ==========================================
// ABRIR FORMULARIO
// ==========================================

function abrirFormularioOvino(){

    if(!formOvino){

        return;

    }


    formOvino.reset();

    ovinoId.value = "";


    cargarPotrerosOvino();

    cargarCategoriasOvino();


    formOvino.classList.remove(

        "formulario-oculto"

    );


    caravanaOvino?.focus();

}


// ==========================================
// CERRAR FORMULARIO
// ==========================================

function cerrarFormularioOvino(){

    if(!formOvino){

        return;

    }


    formOvino.reset();

    ovinoId.value = "";


    cargarCategoriasOvino();


    formOvino.classList.add(

        "formulario-oculto"

    );

}


// ==========================================
// GUARDAR OVINO
// ==========================================

if(formOvino){

    formOvino.addEventListener(

        "submit",

        function(evento){

            evento.preventDefault();


            const idAnterior =
                ovinoId.value;


            const datos = {

                id:

                    idAnterior ||

                    generarId(),

                caravana:

                    caravanaOvino.value.trim(),

                sexo:

                    sexoOvino.value,

                categoria:

                    categoriaOvino.value,

                raza:

                    razaOvino.value,

                peso:

                    convertirNumero(

                        pesoOvino.value

                    ),

                fechaPeso:

                    fechaPesoOvino.value,

                potrero:

                    potreroOvino.value,

                nota:

                    notaOvino.value.trim()

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

                caravanaOvino.focus();

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

                sexoOvino.focus();

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

                categoriaOvino.focus();

                return;

            }


            // ======================================
            // DETERMINAR SI ES EDICIÓN
            // ======================================

            const indice =

                ovinos.findIndex(

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
            // ACTUALIZAR LISTA
            // ======================================

            if(esEdicion){

                ovinos[indice] =
                    datos;

            }else{

                ovinos.push(
                    datos
                );

            }


            // ======================================
            // GUARDAR
            // ======================================

            const guardado =
                guardarOvinos(
                    ovinos
                );


            if(!guardado){

                mostrarNotificacion(

                    "No se pudo guardar el ovino.",

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

                        "Ovino actualizado",

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

                        "Ovino registrado",

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

            ovinosFiltrados =
                copiarLista(
                    ovinos
                );


            renderizarOvinos();


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
            // ACTUALIZAR REGISTROS
            // ======================================

            if(

                typeof renderizarRegistros ===
                "function"

            ){

                renderizarRegistros();

            }


            cerrarFormularioOvino();


            mostrarNotificacion(

                esEdicion

                ?

                "Ovino actualizado correctamente."

                :

                "Ovino guardado correctamente.",

                "exito"

            );

        }

    );

}


// ==========================================
// EDITAR
// ==========================================

function editarOvino(id){

    const ovino =

        ovinos.find(

            function(item){

                return (

                    item.id ===
                    id

                );

            }

        );


    if(!ovino){

        return;

    }


    abrirFormularioOvino();


    ovinoId.value =
        ovino.id;


    caravanaOvino.value =
        ovino.caravana || "";


    sexoOvino.value =
        ovino.sexo || "";


    cargarCategoriasOvino();


    categoriaOvino.value =
        ovino.categoria || "";


    razaOvino.value =
        ovino.raza || "";


    pesoOvino.value =
        ovino.peso ?? "";


    fechaPesoOvino.value =
        ovino.fechaPeso || "";


    potreroOvino.value =
        ovino.potrero || "";


    notaOvino.value =
        ovino.nota || "";

}


// ==========================================
// ELIMINAR
// ==========================================

async function eliminarOvino(id){

    const ovino =
        ovinos.find(

            function(item){

                return (

                    item.id ===
                    id

                );

            }

        );


    if(!ovino){

        return;

    }


    const confirmado =

        await confirmarAccion(

            "¿Deseas eliminar este ovino?"

        );


    if(!confirmado){

        return;

    }


    ovinos =

        ovinos.filter(

            function(item){

                return (

                    item.id !==
                    id

                );

            }

        );


    const guardado =
        guardarOvinos(
            ovinos
        );


    if(!guardado){

        mostrarNotificacion(

            "No se pudo eliminar el ovino.",

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

            "Ovino eliminado",

            "Caravana: " +
            (
                ovino.caravana ||
                "Sin caravana"
            ) +
            " · " +
            (
                ovino.categoria ||
                "Categoría no especificada"
            ) +
            " · " +
            (
                ovino.raza ||
                "Raza no especificada"
            )

        );

    }


    ovinosFiltrados =
        copiarLista(
            ovinos
        );


    renderizarOvinos();


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


    cerrarFormularioOvino();


    mostrarNotificacion(

        "Ovino eliminado correctamente.",

        "exito"

    );

}


// ==========================================
// BUSCAR
// ==========================================

if(buscarOvino){

    buscarOvino.addEventListener(

        "input",

        function(){

            const texto =

                this.value
                .trim()
                .toLowerCase();


            ovinosFiltrados =

                ovinos.filter(

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


            renderizarOvinos();

        }

    );

}


// ==========================================
// TABLA
// ==========================================

function renderizarOvinos(){

    if(!listaOvinos){

        return;

    }


    listaOvinos.innerHTML = "";


    if(

        ovinosFiltrados.length ===
        0

    ){

        listaOvinos.innerHTML = `

            <tr>

                <td colspan="5">

                    No hay ovinos registrados.

                </td>

            </tr>

        `;

        return;

    }


    ovinosFiltrados.forEach(

        function(ovino){

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>

                    ${String(
                        ovino.caravana ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        ovino.sexo ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        ovino.categoria ??
                        ""
                    )}

                </td>

                <td>

                    ${String(
                        ovino.potrero ??
                        ""
                    )}

                </td>

                <td>

                    <div class="acciones-tabla">

                        <button

                            type="button"

                            class="btn-tabla btn-editar"

                            onclick="editarOvino('${ovino.id}')"

                            aria-label="Editar ovino"

                            title="Editar">

                            <span
                                class="material-symbols-rounded">

                                edit

                            </span>

                        </button>


                        <button

                            type="button"

                            class="btn-tabla btn-eliminar"

                            onclick="eliminarOvino('${ovino.id}')"

                            aria-label="Eliminar ovino"

                            title="Eliminar">

                            <span
                                class="material-symbols-rounded">

                                delete

                            </span>

                        </button>

                    </div>

                </td>

            `;


            listaOvinos.appendChild(
                fila
            );

        }

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.editarOvino =
    editarOvino;


window.eliminarOvino =
    eliminarOvino;


window.renderizarOvinos =
    renderizarOvinos;


window.iniciarOvinos =
    iniciarOvinos;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================