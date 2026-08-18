// ==========================================
// AgroCount V4
// Archivo: recordatorios.js
// Sistema de recordatorios
// ==========================================

"use strict";

// ==========================================
// CONFIGURACIÓN
// ==========================================

const CLAVE_RECORDATORIOS =
    "agrocount_recordatorios";


// ==========================================
// ESTADO
// ==========================================

let recordatorios =
    obtenerRecordatorios();


// ==========================================
// OBTENER RECORDATORIOS
// ==========================================

function obtenerRecordatorios(){

    try{

        const datos =
            localStorage.getItem(
                CLAVE_RECORDATORIOS
            );

        if(!datos){

            return [];

        }

        const resultado =
            JSON.parse(
                datos
            );

        return Array.isArray(resultado)
            ? resultado
            : [];

    }catch(error){

        console.error(
            "Error obteniendo recordatorios:",
            error
        );

        return [];

    }

}


// ==========================================
// GUARDAR RECORDATORIOS
// ==========================================

function guardarRecordatorios(){

    try{

        localStorage.setItem(
            CLAVE_RECORDATORIOS,
            JSON.stringify(
                recordatorios
            )
        );

        return true;

    }catch(error){

        console.error(
            "Error guardando recordatorios:",
            error
        );

        return false;

    }

}


// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparTextoRecordatorio(
    valor
){

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
// FORMATEAR FECHA
// ==========================================

function formatearFechaRecordatorio(
    fecha
){

    if(!fecha){

        return "Sin fecha";

    }

    const partes =
        String(
            fecha
        ).split("-");

    if(
        partes.length === 3
    ){

        return (

            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]

        );

    }

    return escaparTextoRecordatorio(
        fecha
    );

}


// ==========================================
// OBTENER FECHA COMPLETA
// ==========================================

function convertirFechaRecordatorio(
    recordatorio
){

    if(
        !recordatorio ||
        !recordatorio.fecha
    ){

        return null;

    }

    const hora =
        recordatorio.hora ||
        "09:00";

    const fecha =
        new Date(

            String(
                recordatorio.fecha
            ) +
            "T" +
            String(
                hora
            )

        );

    if(
        Number.isNaN(
            fecha.getTime()
        )
    ){

        return null;

    }

    return fecha;

}


// ==========================================
// DETERMINAR ESTADO
// ==========================================

function obtenerEstadoRecordatorio(
    recordatorio
){

    const fecha =
        convertirFechaRecordatorio(
            recordatorio
        );

    if(!fecha){

        return "sin-fecha";

    }

    const ahora =
        new Date();

    if(
        fecha.getTime() <
        ahora.getTime()
    ){

        return "vencido";

    }

    return "pendiente";

}


// ==========================================
// RENDERIZAR PANEL
// ==========================================

function renderizarRecordatorios(){

    const panel =
        document.getElementById(
            "panelRecordatorios"
        );

    if(!panel){

        return;

    }

    recordatorios =
        obtenerRecordatorios();

    // ======================================
    // ORDENAR
    // ======================================

    const ordenados =
        [...recordatorios].sort(

            function(a,b){

                const fechaA =
                    convertirFechaRecordatorio(
                        a
                    );

                const fechaB =
                    convertirFechaRecordatorio(
                        b
                    );

                if(!fechaA){

                    return 1;

                }

                if(!fechaB){

                    return -1;

                }

                return (
                    fechaA.getTime() -
                    fechaB.getTime()
                );

            }

        );


    // ======================================
    // SIN RECORDATORIOS
    // ======================================

    if(
        ordenados.length === 0
    ){

        panel.innerHTML = `

            <div
                class="recordatorio-vacio">

                <span
                    class="material-symbols-rounded">

                    event_available

                </span>

                <div>

                    <strong>

                        No hay recordatorios

                    </strong>

                    <p>

                        Agregue un recordatorio
                        para una tarea o actividad.

                    </p>

                </div>

            </div>

            <button
                type="button"
                class="btn-principal"
                id="btnAgregarRecordatorioInicio"
                style="
                    margin-top:14px;
                ">

                <span
                    class="material-symbols-rounded">

                    add

                </span>

                Agregar recordatorio

            </button>

        `;

        const boton =
            document.getElementById(
                "btnAgregarRecordatorioInicio"
            );

        if(boton){

            boton.onclick =
                abrirFormularioRecordatorio;

        }

        return;

    }


    // ======================================
    // MOSTRAR RECORDATORIOS
    // ======================================

    let html = `

        <div
            class="lista-recordatorios">

    `;


    ordenados.forEach(

        function(recordatorio){

            const id =
                escaparTextoRecordatorio(
                    recordatorio.id
                );

            const titulo =
                escaparTextoRecordatorio(
                    recordatorio.titulo ||
                    "Recordatorio"
                );

            const nota =
                escaparTextoRecordatorio(
                    recordatorio.nota ||
                    ""
                );

            const fecha =
                formatearFechaRecordatorio(
                    recordatorio.fecha
                );

            const hora =
                escaparTextoRecordatorio(
                    recordatorio.hora ||
                    "09:00"
                );

            const estado =
                obtenerEstadoRecordatorio(
                    recordatorio
                );

            const claseEstado =
                estado === "vencido"
                    ? "recordatorio-vencido"
                    : "recordatorio-pendiente";


            html += `

                <div
                    class="recordatorio-item ${claseEstado}"
                    data-id="${id}">

                    <div
                        class="recordatorio-item-icono">

                        <span
                            class="material-symbols-rounded">

                            event

                        </span>

                    </div>

                    <div
                        class="recordatorio-item-contenido">

                        <strong>

                            ${titulo}

                        </strong>

                        <div
                            class="recordatorio-item-fecha">

                            ${fecha}
                            ·
                            ${hora}

                        </div>

                        ${
                            nota
                            ?
                            `

                                <p>

                                    ${nota}

                                </p>

                            `
                            :
                            ""

                        }

                    </div>

                    <div
                        class="recordatorio-item-acciones">

                        <button
                            type="button"
                            class="btn-tabla btn-editar"
                            title="Editar"
                            onclick="editarRecordatorio('${id}')">

                            <span
                                class="material-symbols-rounded">

                                edit

                            </span>

                        </button>

                        <button
                            type="button"
                            class="btn-tabla btn-eliminar"
                            title="Eliminar"
                            onclick="eliminarRecordatorio('${id}')">

                            <span
                                class="material-symbols-rounded">

                                delete

                            </span>

                        </button>

                    </div>

                </div>

            `;

        }

    );


    html += `

        </div>

        <button
            type="button"
            class="btn-principal"
            id="btnAgregarRecordatorioInicio"
            style="
                margin-top:12px;
            ">

            <span
                class="material-symbols-rounded">

                add

            </span>

            Agregar recordatorio

        </button>

    `;


    panel.innerHTML =
        html;


    const boton =
        document.getElementById(
            "btnAgregarRecordatorioInicio"
        );

    if(boton){

        boton.onclick =
            abrirFormularioRecordatorio;

    }

}


// ==========================================
// ABRIR FORMULARIO
// ==========================================

function abrirFormularioRecordatorio(
    id
){

    const existente =
        document.getElementById(
            "modalRecordatorio"
        );

    if(existente){

        existente.remove();

    }


    let registro =
        null;


    if(id){

        registro =
            recordatorios.find(

                function(item){

                    return item.id === id;

                }

            );

    }


    const titulo =
        escaparTextoRecordatorio(
            registro?.titulo || ""
        );

    const nota =
        escaparTextoRecordatorio(
            registro?.nota || ""
        );

    const fecha =
        escaparTextoRecordatorio(
            registro?.fecha || ""
        );

    const hora =
        escaparTextoRecordatorio(
            registro?.hora || ""
        );


    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "modalRecordatorio";

    modal.className =
        "modal";


    modal.innerHTML = `

        <div
            class="modal-contenido">

            <h2>

                ${
                    registro
                    ?
                    "Editar recordatorio"
                    :
                    "Nuevo recordatorio"
                }

            </h2>

            <p>

                Agregue una tarea o actividad
                que quiera recordar.

            </p>


            <div
                class="formulario"
                style="
                    margin-top:15px;
                    box-shadow:none;
                    padding:0;
                    border:0;
                ">


                <div class="campo">

                    <label
                        for="tituloRecordatorio">

                        Título

                    </label>

                    <input
                        type="text"
                        id="tituloRecordatorio"
                        value="${titulo}"
                        placeholder="Ej.: Comprar vacuna"
                        autocomplete="off">

                </div>


                <div class="campo">

                    <label
                        for="fechaRecordatorio">

                        Fecha

                    </label>

                    <input
                        type="date"
                        id="fechaRecordatorio"
                        value="${fecha}">

                </div>


                <div class="campo">

                    <label
                        for="horaRecordatorio">

                        Hora

                    </label>

                    <input
                        type="time"
                        id="horaRecordatorio"
                        value="${hora}">

                </div>


                <div class="campo">

                    <label
                        for="notaRecordatorio">

                        Nota

                    </label>

                    <textarea
                        id="notaRecordatorio"
                        rows="3"
                        placeholder="Detalle del recordatorio...">${nota}</textarea>

                </div>


            </div>


            <div
                class="acciones-modal">

                <button
                    type="button"
                    id="btnCancelarRecordatorio"
                    class="btn-secundario">

                    Cancelar

                </button>

                <button
                    type="button"
                    id="btnGuardarRecordatorio"
                    class="btn-principal">

                    <span
                        class="material-symbols-rounded">

                        save

                    </span>

                    Guardar

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const campoTitulo =
        document.getElementById(
            "tituloRecordatorio"
        );

    const campoFecha =
        document.getElementById(
            "fechaRecordatorio"
        );

    const campoHora =
        document.getElementById(
            "horaRecordatorio"
        );

    const campoNota =
        document.getElementById(
            "notaRecordatorio"
        );

    const btnCancelar =
        document.getElementById(
            "btnCancelarRecordatorio"
        );

    const btnGuardar =
        document.getElementById(
            "btnGuardarRecordatorio"
        );


    if(campoTitulo){

        campoTitulo.focus();

    }


    // ======================================
    // CANCELAR
    // ======================================

    btnCancelar.onclick =
        function(){

            modal.remove();

        };


    // ======================================
    // GUARDAR
    // ======================================

    btnGuardar.onclick =
        function(){

            const nuevoTitulo =
                campoTitulo
                ?
                campoTitulo.value.trim()
                :
                "";

            const nuevaFecha =
                campoFecha
                ?
                campoFecha.value
                :
                "";

            const nuevaHora =
                campoHora
                ?
                campoHora.value
                :
                "";

            const nuevaNota =
                campoNota
                ?
                campoNota.value.trim()
                :
                "";


            if(
                !nuevoTitulo ||
                !nuevaFecha ||
                !nuevaHora
            ){

                mostrarNotificacion(

                    "Complete título, fecha y hora.",

                    "advertencia"

                );

                return;

            }


            const datos = {

                id:

                    registro?.id ||
                    generarId(),

                titulo:

                    nuevoTitulo,

                nota:

                    nuevaNota,

                fecha:

                    nuevaFecha,

                hora:

                    nuevaHora

            };


            if(registro){

                const indice =
                    recordatorios.findIndex(

                        function(item){

                            return item.id ===
                                registro.id;

                        }

                    );

                if(indice >= 0){

                    recordatorios[indice] =
                        datos;

                }

            }else{

                recordatorios.push(
                    datos
                );

            }


            const guardado =
                guardarRecordatorios();


            if(!guardado){

                mostrarNotificacion(

                    "No se pudo guardar el recordatorio.",

                    "error"

                );

                return;

            }


            // ==================================
            // ACTUALIZAR
            // ==================================

            renderizarRecordatorios();


            // ==================================
            // CERRAR
            // ==================================

            modal.remove();


            mostrarNotificacion(

                registro
                ?
                "Recordatorio actualizado correctamente."
                :
                "Recordatorio creado correctamente.",

                "exito"

            );


            // ==================================
            // COMPROBAR INMEDIATAMENTE
            // ==================================

            if(
                typeof comprobarRecordatorios ===
                "function"
            ){

                comprobarRecordatorios();

            }

        };


    // ======================================
    // CERRAR TOCANDO FUERA
    // ======================================

    modal.addEventListener(

        "click",

        function(evento){

            if(
                evento.target === modal
            ){

                modal.remove();

            }

        }

    );


    // ======================================
    // ESC
    // ======================================

    function manejarEscape(
        evento
    ){

        if(
            evento.key === "Escape"
        ){

            modal.remove();

            document.removeEventListener(
                "keydown",
                manejarEscape
            );

        }

    }


    document.addEventListener(
        "keydown",
        manejarEscape
    );

}


// ==========================================
// EDITAR
// ==========================================

function editarRecordatorio(
    id
){

    abrirFormularioRecordatorio(
        id
    );

}


// ==========================================
// ELIMINAR
// ==========================================

async function eliminarRecordatorio(
    id
){

    const confirmado =
        await confirmarAccion(

            "¿Deseas eliminar este recordatorio?"

        );


    if(!confirmado){

        return;

    }


    recordatorios =
        recordatorios.filter(

            function(item){

                return item.id !== id;

            }

        );


    const guardado =
        guardarRecordatorios();


    if(!guardado){

        mostrarNotificacion(

            "No se pudo eliminar el recordatorio.",

            "error"

        );

        return;

    }


    renderizarRecordatorios();


    mostrarNotificacion(

        "Recordatorio eliminado correctamente.",

        "exito"

    );

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarRecordatorios(){

    recordatorios =
        obtenerRecordatorios();

    renderizarRecordatorios();

    registrarLog(

        "recordatorios.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.obtenerRecordatorios =
    obtenerRecordatorios;

window.guardarRecordatorios =
    guardarRecordatorios;

window.renderizarRecordatorios =
    renderizarRecordatorios;

window.iniciarRecordatorios =
    iniciarRecordatorios;

window.abrirFormularioRecordatorio =
    abrirFormularioRecordatorio;

window.editarRecordatorio =
    editarRecordatorio;

window.eliminarRecordatorio =
    eliminarRecordatorio;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================