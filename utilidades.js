// ==========================================
// AgroCount V3
// Archivo: utilidades.js
// Parte 1 de 3
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS GLOBALES
// ==========================================

const pantallaCarga =
    document.getElementById(
        "pantallaCarga"
    );

const progresoCarga =
    document.getElementById(
        "progresoCarga"
    );

const notificacion =
    document.getElementById(
        "notificacion"
    );

const textoNotificacion =
    document.getElementById(
        "textoNotificacion"
    );

const modalConfirmacion =
    document.getElementById(
        "modalConfirmacion"
    );

const mensajeConfirmacion =
    document.getElementById(
        "mensajeConfirmacion"
    );

const btnCancelar =
    document.getElementById(
        "btnCancelar"
    );

const btnConfirmar =
    document.getElementById(
        "btnConfirmar"
    );

// ==========================================
// PANTALLA DE CARGA
// ==========================================

function actualizarCarga(

    porcentaje

){

    if(!progresoCarga){

        return;

    }

    progresoCarga.style.width =

        porcentaje + "%";

}

function ocultarPantallaCarga(){

    if(!pantallaCarga){

        return;

    }

    pantallaCarga.classList.add(

        "oculto"

    );

}

// ==========================================
// REGISTRO
// ==========================================

function registrarLog(){

    console.log(

        "[AgroCount]",

        ...arguments

    );

}

// ==========================================
// MENSAJES
// ==========================================

let temporizadorNotificacion =
    null;

function mostrarNotificacion(

    mensaje,

    tipo = "info",

    duracion = 3000

){

    if(

        !notificacion ||

        !textoNotificacion

    ){

        alert(mensaje);

        return;

    }

    clearTimeout(

        temporizadorNotificacion

    );

    textoNotificacion.textContent =

        mensaje;

    notificacion.className =

        "notificacion";

    notificacion.classList.add(

        tipo

    );

    temporizadorNotificacion =

        setTimeout(

            ocultarNotificacion,

            duracion

        );

}
// ==========================================
// NOTIFICACIONES
// ==========================================

function ocultarNotificacion(){

    if(!notificacion){

        return;

    }

    notificacion.classList.add(

        "oculto"

    );

}

function mostrarMensaje(

    mensaje

){

    mostrarNotificacion(

        mensaje,

        "info"

    );

}

// ==========================================
// MODAL DE CONFIRMACIÓN
// ==========================================

let resolverConfirmacion =
    null;

function abrirModalConfirmacion(

    mensaje

){

    return new Promise(

        function(resolve){

            if(

                !modalConfirmacion ||

                !mensajeConfirmacion ||

                !btnCancelar ||

                !btnConfirmar

            ){

                resolve(

                    confirm(

                        mensaje

                    )

                );

                return;

            }

            resolverConfirmacion =

                resolve;

            mensajeConfirmacion.textContent =

                mensaje;

            modalConfirmacion.classList.remove(

                "oculto"

            );

        }

    );

}

function cerrarModalConfirmacion(){

    if(!modalConfirmacion){

        return;

    }

    modalConfirmacion.classList.add(

        "oculto"

    );

}

if(btnCancelar){

    btnCancelar.addEventListener(

        "click",

        function(){

            cerrarModalConfirmacion();

            if(

                resolverConfirmacion

            ){

                resolverConfirmacion(

                    false

                );

                resolverConfirmacion =

                    null;

            }

        }

    );

}

if(btnConfirmar){

    btnConfirmar.addEventListener(

        "click",

        function(){

            cerrarModalConfirmacion();

            if(

                resolverConfirmacion

            ){

                resolverConfirmacion(

                    true

                );

                resolverConfirmacion =

                    null;

            }

        }

    );

}

async function confirmarAccion(

    mensaje

){

    return await abrirModalConfirmacion(

        mensaje

    );

}
// ==========================================
// FUNCIONES GENERALES
// ==========================================

function estaVacio(

    valor

){

    return String(

        valor ?? ""

    ).trim() === "";

}

function capitalizar(

    texto

){

    return String(

        texto ?? ""

    )

    .trim()

    .replace(

        /\s+/g,

        " "

    )

    .replace(

        /\b\w/g,

        function(letra){

            return letra.toUpperCase();

        }

    );

}

function convertirNumero(

    valor

){

    const numero = Number(

        valor

    );

    return Number.isFinite(

        numero

    )

        ? numero

        : 0;

}

function generarId(){

    return Date.now().toString(36) +

        Math.random()

        .toString(36)

        .substring(2,8);

}

function copiarLista(

    lista

){

    return JSON.parse(

        JSON.stringify(

            lista

        )

    );

}

// ==========================================
// EXPORTAR
// ==========================================

window.actualizarCarga =
    actualizarCarga;

window.ocultarPantallaCarga =
    ocultarPantallaCarga;

window.registrarLog =
    registrarLog;

window.mostrarNotificacion =
    mostrarNotificacion;

window.mostrarMensaje =
    mostrarMensaje;

window.confirmarAccion =
    confirmarAccion;

window.estaVacio =
    estaVacio;

window.capitalizar =
    capitalizar;

window.convertirNumero =
    convertirNumero;

window.generarId =
    generarId;

window.copiarLista =
    copiarLista;

registrarLog(

    "utilidades.js cargado correctamente."

);

// ==========================================
// FIN DEL ARCHIVO
// ==========================================