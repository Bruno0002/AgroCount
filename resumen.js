// ==========================================
// AgroCount V4
// Archivo: resumen.js
// Inicio · Dashboard principal
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const resumenInicio =
    document.getElementById(
        "resumenInicio"
    );

const panelNotas =
    document.getElementById(
        "panelNotas"
    );

const panelRecordatorios =
    document.getElementById(
        "panelRecordatorios"
    );


// ==========================================
// CLAVE RECORDATORIOS
// ==========================================

const CLAVE_RECORDATORIOS =
    "agrocount_recordatorios";


// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparTextoResumen(valor){

    return String(
        valor ?? ""
    )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ==========================================
// ICONOS
// ==========================================

function iconoVacunoInicio(){

    return `

        <span
            class="emoji-resumen"
            aria-hidden="true">

            🐄

        </span>

    `;

}


function iconoOvinoInicio(){

    return `

        <span
            class="emoji-resumen"
            aria-hidden="true">

            🐑

        </span>

    `;

}


function iconoPotreroInicio(){

    return `

        <span
            class="emoji-resumen"
            aria-hidden="true">

            🌱

        </span>

    `;

}


function iconoTotalInicio(){

    return `

        <span
            class="emoji-resumen"
            aria-hidden="true">

            📋

        </span>

    `;

}


// ==========================================
// NOTAS DEL PRODUCTOR
// ==========================================

function obtenerNotas(){

    return (
        localStorage.getItem(
            "notasProductor"
        ) || ""
    );

}


// ==========================================
// MODAL DE NOTAS
// ==========================================

function abrirModalNotas(){

    const notasActuales =
        obtenerNotas();

    const modalExistente =
        document.getElementById(
            "modalNotasProductor"
        );

    if(modalExistente){

        modalExistente.remove();

    }

    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "modalNotasProductor";

    modal.className =
        "modal-notas-productor";

    modal.innerHTML = `

        <div
            class="modal-notas-productor-contenido">

            <div
                class="modal-notas-productor-cabecera">

                <div
                    class="modal-notas-productor-icono">

                    <span
                        class="material-symbols-rounded">

                        edit_note

                    </span>

                </div>

                <div>

                    <h2>
                        Notas del productor
                    </h2>

                    <p>
                        Anotaciones del establecimiento.
                    </p>

                </div>

            </div>

            <div
                class="modal-notas-productor-cuerpo">

                <label
                    for="campoNotasProductor">

                    Nota

                </label>

                <textarea
                    id="campoNotasProductor"
                    rows="6"
                    placeholder="Escriba una nota...">${escaparTextoResumen(
                        notasActuales
                    )}</textarea>

            </div>

            <div
                class="modal-notas-productor-acciones">

                <button
                    type="button"
                    id="btnCancelarNotas"
                    class="btn-secundario">

                    Cancelar

                </button>

                <button
                    type="button"
                    id="btnGuardarNotas"
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

    const campo =
        document.getElementById(
            "campoNotasProductor"
        );

    const btnCancelar =
        document.getElementById(
            "btnCancelarNotas"
        );

    const btnGuardar =
        document.getElementById(
            "btnGuardarNotas"
        );

    requestAnimationFrame(

        function(){

            modal.classList.add(
                "activo"
            );

            if(campo){

                campo.focus();

                campo.setSelectionRange(
                    campo.value.length,
                    campo.value.length
                );

            }

        }

    );

    function cerrar(){

        modal.classList.remove(
            "activo"
        );

        setTimeout(

            function(){

                if(modal){

                    modal.remove();

                }

            },

            180

        );

    }

    btnCancelar.onclick =
        cerrar;

    btnGuardar.onclick =
        function(){

            const texto =
                campo
                ?
                String(
                    campo.value
                ).trim()
                :
                "";

            localStorage.setItem(
                "notasProductor",
                texto
            );

            actualizarNotas();

            cerrar();

            if(
                typeof mostrarNotificacion ===
                "function"
            ){

                mostrarNotificacion(
                    "Nota guardada correctamente."
                );

            }

        };

    modal.addEventListener(
        "click",
        function(event){

            if(
                event.target === modal
            ){

                cerrar();

            }

        }
    );

    function manejarEscape(event){

        if(
            event.key === "Escape"
        ){

            cerrar();

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
// GUARDAR / EDITAR NOTAS
// ==========================================

function guardarNotas(){

    abrirModalNotas();

}


// ==========================================
// MOSTRAR NOTAS
// ==========================================

function actualizarNotas(){

    const panel =
        document.getElementById(
            "panelNotas"
        );

    if(!panel){

        return;

    }

    const notas =
        obtenerNotas();

    if(
        !notas.trim()
    ){

        panel.innerHTML = `

            <div class="nota-productor-vacia">

                <span
                    class="material-symbols-rounded">

                    note_add

                </span>

                <span>

                    Todavía no hay notas registradas.

                </span>

            </div>

        `;

        return;

    }

    panel.innerHTML = `

        <div class="nota-productor-texto">

            ${escaparTextoResumen(
                notas
            ).replace(
                /\r?\n/g,
                "<br>"
            )}

        </div>

    `;

}


// ==========================================
// RECORDATORIOS
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
            "Error leyendo recordatorios:",
            error
        );

        return [];

    }

}


// ==========================================
// GUARDAR RECORDATORIOS
// ==========================================

function guardarRecordatorios(
    recordatorios
){

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

    return String(
        fecha
    );

}


// ==========================================
// MODAL RECORDATORIO
// ==========================================

function abrirModalRecordatorio(
    id = ""
){

    const recordatorios =
        obtenerRecordatorios();

    const existente =
        recordatorios.find(

            function(item){

                return item.id === id;

            }

        );

    const modalAnterior =
        document.getElementById(
            "modalRecordatorio"
        );

    if(modalAnterior){

        modalAnterior.remove();

    }

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

                ${existente
                    ? "Editar recordatorio"
                    : "Nuevo recordatorio"}

            </h2>

            <p>

                Agregue un recordatorio para el
                establecimiento.

            </p>

            <div
                class="formulario"
                style="
                    margin-top:16px;
                    padding:0;
                    border:0;
                    box-shadow:none;
                ">

                <div class="campo">

                    <label
                        for="tituloRecordatorio">

                        Recordatorio

                    </label>

                    <input
                        type="text"
                        id="tituloRecordatorio"
                        placeholder="Ej.: Vacunar terneros"
                        autocomplete="off"
                        value="${escaparTextoResumen(
                            existente?.titulo || ""
                        )}">

                </div>

                <div class="campo">

                    <label
                        for="fechaRecordatorio">

                        Fecha

                    </label>

                    <input
                        type="date"
                        id="fechaRecordatorio"
                        value="${escaparTextoResumen(
                            existente?.fecha || ""
                        )}">

                </div>

                <div class="campo">

                    <label
                        for="horaRecordatorio">

                        Hora

                    </label>

                    <input
                        type="time"
                        id="horaRecordatorio"
                        value="${escaparTextoResumen(
                            existente?.hora || ""
                        )}">

                </div>

                <div class="campo">

                    <label
                        for="notaRecordatorio">

                        Nota

                    </label>

                    <textarea
                        id="notaRecordatorio"
                        rows="3"
                        placeholder="Detalle opcional...">${escaparTextoResumen(
                            existente?.nota || ""
                        )}</textarea>

                </div>

            </div>

            <div class="acciones-modal">

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

                        notifications

                    </span>

                    Guardar

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        modal
    );

    const titulo =
        document.getElementById(
            "tituloRecordatorio"
        );

    const fecha =
        document.getElementById(
            "fechaRecordatorio"
        );

    const hora =
        document.getElementById(
            "horaRecordatorio"
        );

    const nota =
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

    function cerrar(){

        modal.remove();

    }

    btnCancelar.onclick =
        cerrar;

    btnGuardar.onclick =
        function(){

            const datos = {

                id:
                    existente?.id ||
                    generarId(),

                titulo:
                    String(
                        titulo.value
                    ).trim(),

                fecha:
                    fecha.value,

                hora:
                    hora.value,

                nota:
                    String(
                        nota.value
                    ).trim()

            };

            if(
                !datos.titulo
            ){

                mostrarNotificacion(
                    "Ingrese el recordatorio.",
                    "advertencia"
                );

                titulo.focus();

                return;

            }

            if(
                !datos.fecha
            ){

                mostrarNotificacion(
                    "Seleccione una fecha.",
                    "advertencia"
                );

                fecha.focus();

                return;

            }

            if(
                existente
            ){

                const indice =
                    recordatorios.findIndex(

                        function(item){

                            return item.id ===
                                existente.id;

                        }

                    );

                if(
                    indice >= 0
                ){

                    recordatorios[indice] =
                        datos;

                }

            }else{

                recordatorios.unshift(
                    datos
                );

            }

            guardarRecordatorios(
                recordatorios
            );

            actualizarRecordatorios();

            cerrar();

            if(
                typeof mostrarNotificacion ===
                "function"
            ){

                mostrarNotificacion(
                    "Recordatorio guardado correctamente.",
                    "exito"
                );

            }

        };

    modal.addEventListener(
        "click",
        function(event){

            if(
                event.target === modal
            ){

                cerrar();

            }

        }
    );

    requestAnimationFrame(

        function(){

            titulo.focus();

        }

    );

}


// ==========================================
// ELIMINAR RECORDATORIO
// ==========================================

async function eliminarRecordatorio(
    id
){

    const confirmado =
        typeof confirmarAccion ===
        "function"
        ?
        await confirmarAccion(
            "¿Deseas eliminar este recordatorio?"
        )
        :
        confirm(
            "¿Deseas eliminar este recordatorio?"
        );

    if(!confirmado){

        return;

    }

    let recordatorios =
        obtenerRecordatorios();

    recordatorios =
        recordatorios.filter(

            function(item){

                return item.id !== id;

            }

        );

    guardarRecordatorios(
        recordatorios
    );

    actualizarRecordatorios();

    if(
        typeof mostrarNotificacion ===
        "function"
    ){

        mostrarNotificacion(
            "Recordatorio eliminado correctamente.",
            "exito"
        );

    }

}


// ==========================================
// MOSTRAR RECORDATORIOS
// ==========================================

function actualizarRecordatorios(){

    const panel =
        document.getElementById(
            "panelRecordatorios"
        );

    if(!panel){

        return;

    }

    const recordatorios =
        obtenerRecordatorios();

    panel.innerHTML = `

        <div
            style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:10px;
                margin-bottom:12px;
            ">

            <span
                style="
                    font-size:11.5px;
                    color:var(--texto-secundario);
                ">

                ${recordatorios.length
                    ? recordatorios.length +
                      (
                        recordatorios.length === 1
                        ? " pendiente"
                        : " pendientes"
                      )
                    : "Sin pendientes"}

            </span>

            <button
                type="button"
                id="btnAgregarRecordatorio"
                class="btn-secundario">

                <span
                    class="material-symbols-rounded"
                    style="font-size:16px !important;">

                    add

                </span>

                Agregar

            </button>

        </div>

        <div
            class="lista-recordatorios-inicio">

            ${
                recordatorios.length === 0

                ?

                `

                    <div class="recordatorio-vacio">

                        <span
                            class="material-symbols-rounded">

                            event_available

                        </span>

                        <div>

                            <strong>

                                No hay recordatorios

                            </strong>

                            <p>

                                Agregue una tarea o aviso
                                para una fecha determinada.

                            </p>

                        </div>

                    </div>

                `

                :

                recordatorios.map(

                    function(item){

                        return `

                            <div
                                class="recordatorio-inicio-item">

                                <div
                                    class="recordatorio-inicio-icono">

                                    <span
                                        class="material-symbols-rounded">

                                        notifications

                                    </span>

                                </div>

                                <div
                                    style="
                                        flex:1;
                                        min-width:0;
                                    ">

                                    <strong
                                        style="
                                            display:block;
                                            font-size:12.5px;
                                            color:var(--texto);
                                        ">

                                        ${escaparTextoResumen(
                                            item.titulo
                                        )}

                                    </strong>

                                    <div
                                        style="
                                            margin-top:3px;
                                            font-size:10.5px;
                                            color:var(--texto-secundario);
                                        ">

                                        ${formatearFechaRecordatorio(
                                            item.fecha
                                        )}

                                        ${
                                            item.hora
                                            ?
                                            " · " +
                                            escaparTextoResumen(
                                                item.hora
                                            )
                                            :
                                            ""
                                        }

                                    </div>

                                    ${
                                        item.nota
                                        ?

                                        `

                                            <p
                                                style="
                                                    margin-top:4px;
                                                    font-size:11px;
                                                    color:var(--texto-secundario);
                                                ">

                                                ${escaparTextoResumen(
                                                    item.nota
                                                )}

                                            </p>

                                        `

                                        :

                                        ""

                                    }

                                </div>

                                <div
                                    style="
                                        display:flex;
                                        gap:4px;
                                    ">

                                    <button
                                        type="button"
                                        class="btn-tabla btn-editar"
                                        onclick="editarRecordatorio('${escaparTextoResumen(
                                            item.id
                                        )}')"
                                        title="Editar">

                                        <span
                                            class="material-symbols-rounded">

                                            edit

                                        </span>

                                    </button>

                                    <button
                                        type="button"
                                        class="btn-tabla btn-eliminar"
                                        onclick="eliminarRecordatorio('${escaparTextoResumen(
                                            item.id
                                        )}')"
                                        title="Eliminar">

                                        <span
                                            class="material-symbols-rounded">

                                            delete

                                        </span>

                                    </button>

                                </div>

                            </div>

                        `;

                    }

                ).join("")

            }

        </div>

    `;

    const boton =
        document.getElementById(
            "btnAgregarRecordatorio"
        );

    if(boton){

        boton.onclick =
            function(){

                abrirModalRecordatorio();

            };

    }

}


// ==========================================
// EDITAR RECORDATORIO
// ==========================================

function editarRecordatorio(
    id
){

    abrirModalRecordatorio(
        id
    );

}


// ==========================================
// ESTADÍSTICAS
// ==========================================

function actualizarEstadisticas(){

    const contenedor =
        document.getElementById(
            "resumenInicio"
        );

    if(!contenedor){

        return;

    }

    const potreros =
        obtenerPotreros();

    const vacunos =
        obtenerVacunos();

    const ovinos =
        obtenerOvinos();

    const total =
        vacunos.length +
        ovinos.length;


    /*
     * RESUMEN VERTICAL
     *
     * No intenta reemplazar
     * la sección Existencias.
     *
     * Aquí solo mostramos
     * cuatro datos rápidos.
     */

    contenedor.innerHTML = `

        <div class="tarjeta-resumen">

            <div class="tarjeta-resumen-icono">

                ${iconoVacunoInicio()}

            </div>

            <div class="tarjeta-resumen-contenido">

                <h3>
                    Vacunos
                </h3>

                <strong>
                    ${vacunos.length}
                </strong>

                <span
                    class="tarjeta-resumen-descripcion">

                    registrados

                </span>

            </div>

        </div>


        <div class="tarjeta-resumen">

            <div class="tarjeta-resumen-icono">

                ${iconoOvinoInicio()}

            </div>

            <div class="tarjeta-resumen-contenido">

                <h3>
                    Ovinos
                </h3>

                <strong>
                    ${ovinos.length}
                </strong>

                <span
                    class="tarjeta-resumen-descripcion">

                    registrados

                </span>

            </div>

        </div>


        <div class="tarjeta-resumen">

            <div class="tarjeta-resumen-icono">

                ${iconoPotreroInicio()}

            </div>

            <div class="tarjeta-resumen-contenido">

                <h3>
                    Potreros
                </h3>

                <strong>
                    ${potreros.length}
                </strong>

                <span
                    class="tarjeta-resumen-descripcion">

                    registrados

                </span>

            </div>

        </div>


        <div
            class="tarjeta-resumen tarjeta-resumen-total">

            <div class="tarjeta-resumen-icono">

                ${iconoTotalInicio()}

            </div>

            <div class="tarjeta-resumen-contenido">

                <h3>
                    Total animales
                </h3>

                <strong>
                    ${total}
                </strong>

                <span
                    class="tarjeta-resumen-descripcion">

                    vacunos + ovinos

                </span>

            </div>

        </div>

    `;

}


// ==========================================
// BIENVENIDA
// ==========================================

function actualizarBienvenida(){

    const bienvenida =
        document.querySelector(
            "#inicio .dashboard-bienvenida"
        );

    if(!bienvenida){

        return;

    }

    const configuracion =
        obtenerConfiguracion();

    const nombre =
        String(
            configuracion.nombreEstablecimiento
            || ""
        ).trim();

    const propietario =
        String(
            configuracion.propietario
            || ""
        ).trim();

    const titulo =
        nombre ||
        "Bienvenido a AgroCount";

    const descripcion =
        nombre
        ?
        "Resumen general del establecimiento"
        :
        "Configure su establecimiento para personalizar AgroCount";

    const propietarioHTML =
        propietario
        ?

        `

            <div class="dashboard-propietario">

                <span
                    class="material-symbols-rounded">

                    person

                </span>

                <span>

                    ${escaparTextoResumen(
                        propietario
                    )}

                </span>

            </div>

        `

        :

        "";

    bienvenida.innerHTML = `

        <div
            class="dashboard-bienvenida-contenido">

            <div
                class="dashboard-bienvenida-texto">

                <span
                    class="dashboard-etiqueta">

                    AgroCount

                </span>

                <h2>

                    ${escaparTextoResumen(
                        titulo
                    )}

                </h2>

                ${propietarioHTML}

                <p>

                    ${escaparTextoResumen(
                        descripcion
                    )}

                </p>

            </div>

        </div>

    `;

}


// ==========================================
// RESUMEN COMPLETO
// ==========================================

function actualizarResumen(){

    actualizarBienvenida();

    actualizarEstadisticas();

    actualizarNotas();

    actualizarRecordatorios();

}


// ==========================================
// BOTÓN EDITAR NOTAS
// ==========================================

function iniciarBotonNotas(){

    const panel =
        document.getElementById(
            "panelNotas"
        );

    if(!panel){

        return;

    }

    const contenedor =
        panel.closest(
            ".tarjeta-notas, .panel-notas, .panel-notas-productor, .card"
        )
        ||
        panel.parentElement;

    if(!contenedor){

        return;

    }

    const boton =
        contenedor.querySelector(
            ".btn-secundario, .btn-editar-notas"
        );

    if(!boton){

        return;

    }

    boton.type =
        "button";

    boton.onclick =
        guardarNotas;

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarResumen(){

    actualizarResumen();

    iniciarBotonNotas();

    registrarLog(
        "resumen.js cargado correctamente."
    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.actualizarResumen =
    actualizarResumen;

window.iniciarResumen =
    iniciarResumen;

window.guardarNotas =
    guardarNotas;

window.obtenerNotas =
    obtenerNotas;

window.actualizarNotas =
    actualizarNotas;

window.actualizarRecordatorios =
    actualizarRecordatorios;

window.obtenerRecordatorios =
    obtenerRecordatorios;

window.guardarRecordatorios =
    guardarRecordatorios;

window.abrirModalRecordatorio =
    abrirModalRecordatorio;

window.editarRecordatorio =
    editarRecordatorio;

window.eliminarRecordatorio =
    eliminarRecordatorio;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================