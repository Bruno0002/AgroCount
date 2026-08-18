// ==========================================
// AgroCount V4
// Archivo: sanidad.js
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const contenidoSanidad =
    document.getElementById(
        "contenidoSanidad"
    );


// ==========================================
// DATOS
// ==========================================

let sanidad =
    obtenerSanidad();

let sanidadFiltrada =
    copiarLista(
        sanidad
    );


// ==========================================
// SEGURIDAD DE TEXTO
// ==========================================

function escaparTextoSanidad(valor){

    return String(
        valor ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


// ==========================================
// FORMATO DE FECHA
// ==========================================

function formatearFechaSanidad(fecha){

    if(!fecha){

        return "—";

    }

    const partes =
        String(fecha).split("-");

    if(partes.length === 3){

        return (

            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]

        );

    }

    return escaparTextoSanidad(
        fecha
    );

}


// ==========================================
// RENDERIZAR ESTRUCTURA
// ==========================================

function renderizarSanidad(){

    if(!contenidoSanidad){

        return;

    }

    /*
     * El encabezado y el botón "Nuevo"
     * ya existen en index.html.
     */

    contenidoSanidad.innerHTML = `

        <div
            class="tabla-responsive tabla-sanidad">

            <table>

                <thead>

                    <tr>

                        <th>
                            Especie
                        </th>

                        <th>
                            Caravana
                        </th>

                        <th>
                            Producto / Vacuna
                        </th>

                        <th>
                            Aplicación
                        </th>

                        <th>
                            Próxima
                        </th>

                        <th>
                            Nota
                        </th>

                        <th>
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody
                    id="listaSanidad">

                </tbody>

            </table>

        </div>

        <form
            id="formSanidad"
            class="formulario formulario-oculto">

        </form>

    `;


    crearFormularioSanidad();

    actualizarListaSanidad();


    const botonNuevo =
        document.getElementById(
            "btnNuevaSanidad"
        );


    if(botonNuevo){

        botonNuevo.onclick =
            abrirFormularioSanidad;

    }

}


// ==========================================
// FORMULARIO
// ==========================================

function crearFormularioSanidad(){

    const formulario =
        document.getElementById(
            "formSanidad"
        );


    if(!formulario){

        return;

    }


    formulario.innerHTML = `

        <input
            type="hidden"
            id="sanidadId">


        <div class="campo">

            <label
                for="especieSanidad">

                Especie

            </label>

            <select
                id="especieSanidad">

                <option value="">

                    Seleccionar

                </option>

                <option value="Vacuno">

                    Vacuno

                </option>

                <option value="Ovino">

                    Ovino

                </option>

            </select>

        </div>


        <div class="campo">

            <label
                for="caravanaSanidad">

                Caravana

            </label>

            <input
                type="text"
                id="caravanaSanidad"
                autocomplete="off">

        </div>


        <div class="campo">

            <label
                for="productoSanidad">

                Producto / Vacuna

            </label>

            <input
                type="text"
                id="productoSanidad"
                autocomplete="off">

        </div>


        <div class="campo">

            <label
                for="fechaSanidad">

                Fecha de aplicación

            </label>

            <input
                type="date"
                id="fechaSanidad">

        </div>


        <div class="campo">

            <label
                for="proximaSanidad">

                Próxima aplicación

            </label>

            <input
                type="date"
                id="proximaSanidad">

        </div>


        <div class="campo">

            <label
                for="notaSanidad">

                Nota

            </label>

            <textarea
                id="notaSanidad"
                rows="3"></textarea>

        </div>


        <div class="acciones-formulario">

            <button
                type="submit"
                class="btn-principal">

                Guardar

            </button>

            <button
                type="button"
                id="btnCancelarSanidad"
                class="btn-secundario">

                Cancelar

            </button>

        </div>

    `;


    formulario.addEventListener(
        "submit",
        guardarFormularioSanidad
    );


    const botonCancelar =
        document.getElementById(
            "btnCancelarSanidad"
        );


    if(botonCancelar){

        botonCancelar.addEventListener(
            "click",
            cerrarFormularioSanidad
        );

    }

}


// ==========================================
// ABRIR FORMULARIO
// ==========================================

function abrirFormularioSanidad(){

    const formulario =
        document.getElementById(
            "formSanidad"
        );


    if(!formulario){

        return;

    }


    formulario.reset();


    const campoId =
        document.getElementById(
            "sanidadId"
        );


    if(campoId){

        campoId.value = "";

    }


    formulario.classList.remove(
        "formulario-oculto"
    );


    formulario.scrollIntoView({

        behavior:
            "smooth",

        block:
            "nearest"

    });

}


// ==========================================
// CERRAR FORMULARIO
// ==========================================

function cerrarFormularioSanidad(){

    const formulario =
        document.getElementById(
            "formSanidad"
        );


    if(!formulario){

        return;

    }


    formulario.reset();


    const campoId =
        document.getElementById(
            "sanidadId"
        );


    if(campoId){

        campoId.value = "";

    }


    formulario.classList.add(
        "formulario-oculto"
    );

}


// ==========================================
// GUARDAR
// ==========================================

function guardarFormularioSanidad(
    evento
){

    evento.preventDefault();


    const campoId =
        document.getElementById(
            "sanidadId"
        );


    const campoEspecie =
        document.getElementById(
            "especieSanidad"
        );


    const campoCaravana =
        document.getElementById(
            "caravanaSanidad"
        );


    const campoProducto =
        document.getElementById(
            "productoSanidad"
        );


    const campoFecha =
        document.getElementById(
            "fechaSanidad"
        );


    const campoProxima =
        document.getElementById(
            "proximaSanidad"
        );


    const campoNota =
        document.getElementById(
            "notaSanidad"
        );


    const datos = {

        id:

            campoId.value ||

            generarId(),

        especie:

            campoEspecie.value,

        caravana:

            campoCaravana.value.trim(),

        producto:

            capitalizar(
                campoProducto.value
            ),

        fecha:

            campoFecha.value,

        proxima:

            campoProxima.value,

        nota:

            campoNota.value.trim()

    };


    // ======================================
    // VALIDACIÓN
    // ======================================

    if(

        estaVacio(
            datos.especie
        )

        ||

        estaVacio(
            datos.caravana
        )

        ||

        estaVacio(
            datos.producto
        )

        ||

        estaVacio(
            datos.fecha
        )

    ){

        mostrarNotificacion(

            "Complete los campos obligatorios.",

            "advertencia"

        );

        return;

    }


    // ======================================
    // BUSCAR REGISTRO EXISTENTE
    // ======================================

    const indice =
        sanidad.findIndex(

            function(item){

                return (

                    item.id ===
                    datos.id

                );

            }

        );


    // ======================================
    // NUEVO
    // ======================================

    if(indice < 0){

        sanidad.push(
            datos
        );


        guardarSanidad(
            sanidad
        );


        agregarRegistro(

            "Sanidad registrada",

            `${datos.especie} · Caravana ${datos.caravana} · ${datos.producto}`

        );

    }


    // ======================================
    // EDITAR
    // ======================================

    else{

        const anterior =
            sanidad[indice];


        sanidad[indice] =
            datos;


        guardarSanidad(
            sanidad
        );


        agregarRegistro(

            "Sanidad modificada",

            `${datos.especie} · Caravana ${datos.caravana} · ${datos.producto}`

        );

    }


    // ======================================
    // ACTUALIZAR
    // ======================================

    sanidadFiltrada =
        copiarLista(
            sanidad
        );


    actualizarListaSanidad();


    cerrarFormularioSanidad();


    mostrarNotificacion(

        indice < 0
        ?
        "Registro sanitario guardado."
        :
        "Registro sanitario modificado.",

        "exito"

    );

}


// ==========================================
// EDITAR
// ==========================================

function editarSanidad(id){

    const registro =
        sanidad.find(

            function(item){

                return (
                    item.id === id
                );

            }

        );


    if(!registro){

        return;

    }


    abrirFormularioSanidad();


    document.getElementById(
        "sanidadId"
    ).value =
        registro.id;


    document.getElementById(
        "especieSanidad"
    ).value =
        registro.especie || "";


    document.getElementById(
        "caravanaSanidad"
    ).value =
        registro.caravana || "";


    document.getElementById(
        "productoSanidad"
    ).value =
        registro.producto || "";


    document.getElementById(
        "fechaSanidad"
    ).value =
        registro.fecha || "";


    document.getElementById(
        "proximaSanidad"
    ).value =
        registro.proxima || "";


    document.getElementById(
        "notaSanidad"
    ).value =
        registro.nota || "";

}


// ==========================================
// ELIMINAR
// ==========================================

async function eliminarSanidad(id){

    const registro =
        sanidad.find(

            function(item){

                return (
                    item.id === id
                );

            }

        );


    if(!registro){

        return;

    }


    const confirmado =
        await confirmarAccion(

            "¿Deseas eliminar este registro sanitario?"

        );


    if(!confirmado){

        return;

    }


    sanidad =
        sanidad.filter(

            function(item){

                return (
                    item.id !== id
                );

            }

        );


    guardarSanidad(
        sanidad
    );


    sanidadFiltrada =
        copiarLista(
            sanidad
        );


    actualizarListaSanidad();


    // ======================================
    // REGISTRO
    // ======================================

    agregarRegistro(

        "Sanidad eliminada",

        `${registro.especie || "Especie"} · ` +
        `Caravana ${registro.caravana || "—"} · ` +
        `${registro.producto || "Sin producto"}`

    );


    mostrarNotificacion(

        "Registro eliminado correctamente.",

        "exito"

    );

}


// ==========================================
// LISTA
// ==========================================

function actualizarListaSanidad(){

    const lista =
        document.getElementById(
            "listaSanidad"
        );


    if(!lista){

        return;

    }


    if(
        sanidadFiltrada.length === 0
    ){

        lista.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:18px;
                        color:var(--texto-secundario);
                    ">

                    Sin registros sanitarios.

                </td>

            </tr>

        `;

        return;

    }


    lista.innerHTML =

        sanidadFiltrada.map(

            function(item){

                const especie =
                    escaparTextoSanidad(
                        item?.especie ||
                        "Sin especie"
                    );


                const caravana =
                    escaparTextoSanidad(
                        item?.caravana ||
                        "—"
                    );


                const producto =
                    escaparTextoSanidad(
                        item?.producto ||
                        "Sin producto"
                    );


                const fecha =
                    formatearFechaSanidad(
                        item?.fecha
                    );


                const proxima =
                    formatearFechaSanidad(
                        item?.proxima
                    );


                const nota =
                    escaparTextoSanidad(
                        item?.nota ||
                        "—"
                    );


                const id =
                    escaparTextoSanidad(
                        item?.id ||
                        ""
                    );


                return `

                    <tr>

                        <td>

                            ${especie}

                        </td>

                        <td>

                            ${caravana}

                        </td>

                        <td>

                            ${producto}

                        </td>

                        <td>

                            ${fecha}

                        </td>

                        <td>

                            ${proxima}

                        </td>

                        <td>

                            ${nota}

                        </td>

                        <td>

                            <div
                                class="acciones-tabla">

                                <button
                                    type="button"
                                    class="btn-tabla btn-editar"
                                    onclick="editarSanidad('${id}')"
                                    title="Editar">

                                    <span
                                        class="material-symbols-rounded">

                                        edit

                                    </span>

                                </button>


                                <button
                                    type="button"
                                    class="btn-tabla btn-eliminar"
                                    onclick="eliminarSanidad('${id}')"
                                    title="Eliminar">

                                    <span
                                        class="material-symbols-rounded">

                                        delete

                                    </span>

                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }

        ).join("");

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarSanidad(){

    renderizarSanidad();

    registrarLog(

        "sanidad.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.editarSanidad =
    editarSanidad;

window.eliminarSanidad =
    eliminarSanidad;

window.renderizarSanidad =
    renderizarSanidad;

window.actualizarListaSanidad =
    actualizarListaSanidad;

window.iniciarSanidad =
    iniciarSanidad;

window.abrirFormularioSanidad =
    abrirFormularioSanidad;

window.cerrarFormularioSanidad =
    cerrarFormularioSanidad;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================