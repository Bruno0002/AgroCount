// ==========================================
// AgroCount V4
// Archivo: potreros.js
// Gestión de potreros + historial
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const formPotrero =
    document.getElementById(
        "formPotrero"
    );

const potreroId =
    document.getElementById(
        "potreroId"
    );

const nombrePotrero =
    document.getElementById(
        "nombrePotrero"
    );

const hectareasPotrero =
    document.getElementById(
        "hectareasPotrero"
    );

const btnNuevoPotrero =
    document.getElementById(
        "btnNuevoPotrero"
    );

const btnCancelarPotrero =
    document.getElementById(
        "btnCancelarPotrero"
    );

const listaPotreros =
    document.getElementById(
        "listaPotreros"
    );

const buscarPotrero =
    document.getElementById(
        "buscarPotrero"
    );


// ==========================================
// DATOS
// ==========================================

let potreros =
    obtenerPotreros();

let potrerosFiltrados =
    copiarLista(
        potreros
    );


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarPotreros(){

    renderizarPotreros();

    btnNuevoPotrero?.addEventListener(

        "click",

        abrirFormularioPotrero

    );

    btnCancelarPotrero?.addEventListener(

        "click",

        cerrarFormularioPotrero

    );

    registrarLog(

        "potreros.js cargado correctamente."

    );

}


// ==========================================
// FORMULARIO
// ==========================================

function abrirFormularioPotrero(){

    if(!formPotrero){

        return;

    }

    formPotrero.reset();

    potreroId.value = "";

    formPotrero.classList.remove(

        "formulario-oculto"

    );

    nombrePotrero.focus();

}


function cerrarFormularioPotrero(){

    if(!formPotrero){

        return;

    }

    formPotrero.reset();

    potreroId.value = "";

    formPotrero.classList.add(

        "formulario-oculto"

    );

}


// ==========================================
// GUARDAR
// ==========================================

if(formPotrero){

    formPotrero.addEventListener(

        "submit",

        function(evento){

            evento.preventDefault();


            const nombre =

                capitalizar(

                    nombrePotrero.value

                );


            const hectareas =

                convertirNumero(

                    hectareasPotrero.value

                );


            // ======================================
            // VALIDAR NOMBRE
            // ======================================

            if(

                estaVacio(nombre)

            ){

                mostrarNotificacion(

                    "Ingrese el nombre del potrero.",

                    "advertencia"

                );

                nombrePotrero.focus();

                return;

            }


            // ======================================
            // EVITAR DUPLICADOS
            // ======================================

            const existe =

                potreros.some(

                    function(item){

                        return (

                            String(
                                item.nombre || ""
                            )
                            .toLowerCase() ===
                            nombre.toLowerCase()

                            &&

                            item.id !==
                            potreroId.value

                        );

                    }

                );


            if(existe){

                mostrarNotificacion(

                    "Ya existe un potrero con ese nombre.",

                    "advertencia"

                );

                nombrePotrero.focus();

                return;

            }


            // ======================================
            // NUEVO POTRERO
            // ======================================

            if(

                potreroId.value === ""

            ){

                const nuevoPotrero = {

                    id:
                        generarId(),

                    nombre:
                        nombre,

                    hectareas:
                        hectareas

                };


                potreros.push(

                    nuevoPotrero

                );


                // ==================================
                // REGISTRO
                // ==================================

                agregarRegistro(

                    "Potrero creado",

                    `Se creó el potrero "${nombre}"` +
                    (
                        hectareas
                        ?
                        ` con ${hectareas} ha.`
                        :
                        "."
                    )

                );


                mostrarNotificacion(

                    "Potrero guardado correctamente.",

                    "exito"

                );

            }


            // ======================================
            // EDITAR POTRERO
            // ======================================

            else{

                const potrero =

                    potreros.find(

                        function(item){

                            return (

                                item.id ===
                                potreroId.value

                            );

                        }

                    );


                if(potrero){

                    const nombreAnterior =
                        potrero.nombre;

                    const hectareasAnteriores =
                        potrero.hectareas;


                    potrero.nombre =
                        nombre;

                    potrero.hectareas =
                        hectareas;


                    // ==================================
                    // REGISTRO
                    // ==================================

                    agregarRegistro(

                        "Potrero modificado",

                        `Se modificó el potrero "${nombreAnterior}"` +
                        ` → "${nombre}".`

                    );


                    // ==================================
                    // ACTUALIZAR ANIMALES
                    // ==================================
                    /*
                     * Si cambia el nombre del potrero,
                     * actualizamos los animales que
                     * estaban asociados al nombre anterior.
                     */

                    if(

                        nombreAnterior !==
                        nombre

                    ){

                        const vacunos =
                            obtenerVacunos();

                        const ovinos =
                            obtenerOvinos();


                        let vacunosModificados =
                            false;

                        let ovinosModificados =
                            false;


                        vacunos.forEach(

                            function(vacuno){

                                if(

                                    vacuno.potrero ===
                                    nombreAnterior

                                ){

                                    vacuno.potrero =
                                        nombre;

                                    vacunosModificados =
                                        true;

                                }

                            }

                        );


                        ovinos.forEach(

                            function(ovino){

                                if(

                                    ovino.potrero ===
                                    nombreAnterior

                                ){

                                    ovino.potrero =
                                        nombre;

                                    ovinosModificados =
                                        true;

                                }

                            }

                        );


                        if(
                            vacunosModificados
                        ){

                            guardarVacunos(
                                vacunos
                            );

                        }


                        if(
                            ovinosModificados
                        ){

                            guardarOvinos(
                                ovinos
                            );

                        }

                    }


                    mostrarNotificacion(

                        "Potrero modificado correctamente.",

                        "exito"

                    );

                }

            }


            // ======================================
            // GUARDAR DATOS
            // ======================================

            guardarPotreros(

                potreros

            );


            // ======================================
            // ACTUALIZAR LISTA
            // ======================================

            potrerosFiltrados =

                copiarLista(

                    potreros

                );


            renderizarPotreros();


            // ======================================
            // ACTUALIZAR RESUMEN
            // ======================================

            actualizarResumen();


            // ======================================
            // CERRAR FORMULARIO
            // ======================================

            cerrarFormularioPotrero();

        }

    );

}


// ==========================================
// EDITAR
// ==========================================

function editarPotrero(id){

    const potrero =

        potreros.find(

            function(item){

                return (

                    item.id === id

                );

            }

        );


    if(!potrero){

        return;

    }


    abrirFormularioPotrero();


    potreroId.value =
        potrero.id;


    nombrePotrero.value =
        potrero.nombre;


    hectareasPotrero.value =
        potrero.hectareas;


    nombrePotrero.focus();

}


// ==========================================
// ELIMINAR
// ==========================================

async function eliminarPotrero(id){

    const potrero =

        potreros.find(

            function(item){

                return (

                    item.id === id

                );

            }

        );


    if(!potrero){

        return;

    }


    const confirmado =

        await confirmarAccion(

            `¿Deseas eliminar el potrero "${potrero.nombre}"?`

        );


    if(!confirmado){

        return;

    }


    // ======================================
    // ELIMINAR
    // ======================================

    potreros =

        potreros.filter(

            function(item){

                return (

                    item.id !== id

                );

            }

        );


    // ======================================
    // GUARDAR
    // ======================================

    guardarPotreros(

        potreros

    );


    // ======================================
    // REGISTRO
    // ======================================

    agregarRegistro(

        "Potrero eliminado",

        `Se eliminó el potrero "${potrero.nombre}".`

    );


    // ======================================
    // ACTUALIZAR
    // ======================================

    potrerosFiltrados =

        copiarLista(

            potreros

        );


    renderizarPotreros();

    actualizarResumen();

    cerrarFormularioPotrero();


    mostrarNotificacion(

        "Potrero eliminado correctamente.",

        "exito"

    );

}


// ==========================================
// BUSCADOR
// ==========================================

if(buscarPotrero){

    buscarPotrero.addEventListener(

        "input",

        function(){

            const texto =

                this.value
                .trim()
                .toLowerCase();


            potrerosFiltrados =

                potreros.filter(

                    function(item){

                        return String(
                            item.nombre || ""
                        )
                        .toLowerCase()
                        .includes(
                            texto
                        );

                    }

                );


            renderizarPotreros();

        }

    );

}


// ==========================================
// RENDERIZAR
// ==========================================

function renderizarPotreros(){

    if(!listaPotreros){

        return;

    }


    listaPotreros.innerHTML = "";


    // ======================================
    // SIN RESULTADOS
    // ======================================

    if(

        potrerosFiltrados.length === 0

    ){

        listaPotreros.innerHTML = `

            <tr>

                <td colspan="4">

                    No hay potreros registrados.

                </td>

            </tr>

        `;

        return;

    }


    // ======================================
    // ANIMALES
    // ======================================

    const vacunos =
        obtenerVacunos();

    const ovinos =
        obtenerOvinos();


    // ======================================
    // LISTA
    // ======================================

    potrerosFiltrados.forEach(

        function(potrero){

            const cantidadVacunos =

                vacunos.filter(

                    function(item){

                        return (

                            item.potrero ===
                            potrero.nombre

                        );

                    }

                ).length;


            const cantidadOvinos =

                ovinos.filter(

                    function(item){

                        return (

                            item.potrero ===
                            potrero.nombre

                        );

                    }

                ).length;


            const totalAnimales =

                cantidadVacunos +
                cantidadOvinos;


            const fila =

                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>

                    ${potrero.nombre}

                </td>

                <td>

                    ${
                        potrero.hectareas ||
                        "-"
                    }

                </td>

                <td>

                    ${totalAnimales}

                </td>

                <td>

                    <div class="acciones-tabla">

                        <button

                            type="button"

                            class="btn-tabla btn-editar"

                            onclick="editarPotrero('${potrero.id}')"

                            aria-label="Editar potrero"

                            title="Editar"

                        >

                            <span
                                class="material-symbols-rounded">

                                edit

                            </span>

                        </button>


                        <button

                            type="button"

                            class="btn-tabla btn-eliminar"

                            onclick="eliminarPotrero('${potrero.id}')"

                            aria-label="Eliminar potrero"

                            title="Eliminar"

                        >

                            <span
                                class="material-symbols-rounded">

                                delete

                            </span>

                        </button>

                    </div>

                </td>

            `;


            listaPotreros.appendChild(

                fila

            );

        }

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.editarPotrero =
    editarPotrero;

window.eliminarPotrero =
    eliminarPotrero;

window.renderizarPotreros =
    renderizarPotreros;

window.iniciarPotreros =
    iniciarPotreros;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================