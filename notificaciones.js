// ==========================================
// AgroCount V4
// Archivo: notificaciones.js
// Sistema de notificaciones
// ==========================================

"use strict";

// ==========================================
// CONFIGURACIÓN
// ==========================================

const CLAVE_RECORDATORIOS_NOTIFICACION =
    "agrocount_recordatorios";

const CLAVE_NOTIFICACIONES_ENVIADAS =
    "agrocount_notificaciones_enviadas";

const INTERVALO_NOTIFICACIONES =
    30000;

const RUTA_SERVICE_WORKER =
    "./service-worker.js";


// ==========================================
// ESTADO
// ==========================================

let intervaloNotificaciones = null;

let registroServiceWorker = null;


// ==========================================
// SOPORTE NOTIFICACIONES
// ==========================================

function soportaNotificaciones(){

    try{

        return (
            typeof window !== "undefined" &&
            "Notification" in window
        );

    }catch(error){

        return false;

    }

}


// ==========================================
// SOPORTE SERVICE WORKER
// ==========================================

function soportaServiceWorker(){

    try{

        return (
            "serviceWorker" in navigator
        );

    }catch(error){

        return false;

    }

}


// ==========================================
// REGISTRAR SERVICE WORKER
// ==========================================

async function registrarServiceWorker(){

    try{

        if(
            !soportaServiceWorker()
        ){

            console.warn(
                "AgroCount: Service Worker no disponible."
            );

            return null;

        }


        const registro =
            await navigator.serviceWorker.register(
                RUTA_SERVICE_WORKER,
                {
                    scope: "./"
                }
            );


        registroServiceWorker =
            registro;


        console.log(
            "AgroCount: Service Worker registrado."
        );


        /*
         * Esperamos a que exista
         * una versión activa.
         */

        await navigator.serviceWorker.ready;


        registroServiceWorker =
            await navigator.serviceWorker.getRegistration(
                "./"
            );


        if(
            registroServiceWorker
        ){

            console.log(
                "AgroCount: Service Worker activo."
            );

        }


        return registroServiceWorker;


    }catch(error){

        console.error(
            "AgroCount: error registrando Service Worker:",
            error
        );

        registroServiceWorker =
            null;

        return null;

    }

}


// ==========================================
// OBTENER SERVICE WORKER
// ==========================================

async function obtenerRegistroServiceWorker(){

    try{

        if(
            !soportaServiceWorker()
        ){

            return null;

        }


        if(
            registroServiceWorker
        ){

            return registroServiceWorker;

        }


        let registro =
            await navigator.serviceWorker.getRegistration(
                "./"
            );


        if(
            !registro
        ){

            registro =
                await registrarServiceWorker();

        }


        if(
            !registro
        ){

            return null;

        }


        /*
         * Esperamos a que esté listo.
         */

        await navigator.serviceWorker.ready;


        registroServiceWorker =
            await navigator.serviceWorker.getRegistration(
                "./"
            );


        return (
            registroServiceWorker ||
            registro
        );


    }catch(error){

        console.error(
            "AgroCount: error obteniendo Service Worker:",
            error
        );

        return null;

    }

}


// ==========================================
// OBTENER RECORDATORIOS
// ==========================================

function obtenerRecordatoriosNotificacion(){

    try{

        const datos =
            localStorage.getItem(
                CLAVE_RECORDATORIOS_NOTIFICACION
            );


        if(!datos){

            return [];

        }


        const resultado =
            JSON.parse(
                datos
            );


        if(
            !Array.isArray(resultado)
        ){

            return [];

        }


        return resultado;


    }catch(error){

        console.error(
            "AgroCount: error leyendo recordatorios:",
            error
        );

        return [];

    }

}


// ==========================================
// OBTENER ENVIADAS
// ==========================================

function obtenerNotificacionesEnviadas(){

    try{

        const datos =
            localStorage.getItem(
                CLAVE_NOTIFICACIONES_ENVIADAS
            );


        if(!datos){

            return {};

        }


        const resultado =
            JSON.parse(
                datos
            );


        if(
            !resultado ||
            typeof resultado !== "object" ||
            Array.isArray(resultado)
        ){

            return {};

        }


        return resultado;


    }catch(error){

        console.error(
            "AgroCount: error leyendo notificaciones enviadas:",
            error
        );

        return {};

    }

}


// ==========================================
// GUARDAR ENVIADAS
// ==========================================

function guardarNotificacionesEnviadas(
    datos
){

    try{

        localStorage.setItem(
            CLAVE_NOTIFICACIONES_ENVIADAS,
            JSON.stringify(
                datos
            )
        );

        return true;


    }catch(error){

        console.error(
            "AgroCount: error guardando notificaciones:",
            error
        );

        return false;

    }

}


// ==========================================
// AVISO LOCAL AGROCOUNT
// ==========================================

function mostrarNotificacionLocal(
    mensaje,
    tipo
){

    try{

        if(
            typeof mostrarNotificacion ===
            "function"
        ){

            mostrarNotificacion(
                mensaje,
                tipo
            );

        }

    }catch(error){

        console.error(
            "AgroCount: error mostrando aviso:",
            error
        );

    }

}


// ==========================================
// SOLICITAR PERMISO
// ==========================================

async function solicitarPermisoNotificaciones(){

    try{

        if(
            !soportaNotificaciones()
        ){

            mostrarNotificacionLocal(
                "Este navegador no admite notificaciones.",
                "advertencia"
            );

            return false;

        }


        if(
            Notification.permission ===
            "denied"
        ){

            mostrarNotificacionLocal(
                "Las notificaciones están bloqueadas en el navegador.",
                "advertencia"
            );

            return false;

        }


        if(
            Notification.permission !==
            "granted"
        ){

            const permiso =
                await Notification.requestPermission();


            if(
                permiso !==
                "granted"
            ){

                mostrarNotificacionLocal(
                    "No se activaron las notificaciones.",
                    "advertencia"
                );

                return false;

            }

        }


        const registro =
            await registrarServiceWorker();


        if(
            !registro
        ){

            mostrarNotificacionLocal(
                "No se pudo activar el sistema de notificaciones.",
                "advertencia"
            );

            return false;

        }


        mostrarNotificacionLocal(
            "Notificaciones activadas correctamente.",
            "exito"
        );


        return true;


    }catch(error){

        console.error(
            "AgroCount: error solicitando permiso:",
            error
        );

        return false;

    }

}


// ==========================================
// FECHA DEL RECORDATORIO
// ==========================================

function obtenerFechaRecordatorio(
    recordatorio
){

    try{

        if(
            !recordatorio ||
            !recordatorio.fecha
        ){

            return null;

        }


        const hora =
            recordatorio.hora ||
            "09:00";


        const texto =
            String(
                recordatorio.fecha
            ) +
            "T" +
            String(
                hora
            );


        const fecha =
            new Date(
                texto
            );


        if(
            Number.isNaN(
                fecha.getTime()
            )
        ){

            return null;

        }


        return fecha;


    }catch(error){

        console.error(
            "AgroCount: error convirtiendo fecha:",
            error
        );

        return null;

    }

}


// ==========================================
// ENVIAR NOTIFICACIÓN
// ==========================================

async function enviarNotificacionRecordatorio(
    recordatorio
){

    try{

        if(
            !soportaNotificaciones()
        ){

            return false;

        }


        if(
            Notification.permission !==
            "granted"
        ){

            console.warn(
                "AgroCount: permiso de notificaciones no concedido."
            );

            return false;

        }


        if(!recordatorio){

            return false;

        }


        const registro =
            await obtenerRegistroServiceWorker();


        if(
            !registro
        ){

            console.error(
                "AgroCount: Service Worker no disponible."
            );

            return false;

        }


        /*
         * Nos aseguramos de que exista
         * un worker activo.
         */

        if(
            !registro.active
        ){

            console.warn(
                "AgroCount: Service Worker todavía no está activo."
            );

            return false;

        }


        const titulo =
            recordatorio.titulo ||
            "Recordatorio AgroCount";


        const cuerpo =
            recordatorio.nota ||
            "Tienes un recordatorio pendiente.";


        const tag =
            "agrocount-recordatorio-" +
            String(
                recordatorio.id || ""
            );


        /*
         * La notificación ahora se genera
         * DIRECTAMENTE desde el Service Worker.
         */

        await registro.showNotification(

            titulo,

            {

                body:
                    cuerpo,

                icon:
                    "./icon-192.png",

                badge:
                    "./icon-192.png",

                tag:
                    tag,

                renotify:
                    false,

                requireInteraction:
                    true,

                data: {

                    id:
                        recordatorio.id || "",

                    fecha:
                        recordatorio.fecha || "",

                    hora:
                        recordatorio.hora || "",

                    url:
                        "./"

                }

            }

        );


        console.log(
            "AgroCount: notificación enviada correctamente."
        );


        return true;


    }catch(error){

        console.error(
            "AgroCount: error enviando notificación:",
            error
        );

        return false;

    }

}


// ==========================================
// COMPROBAR RECORDATORIOS
// ==========================================

async function comprobarRecordatorios(){

    try{

        const recordatorios =
            obtenerRecordatoriosNotificacion();


        if(
            recordatorios.length === 0
        ){

            return;

        }


        if(
            !soportaNotificaciones()
        ){

            return;

        }


        if(
            Notification.permission !==
            "granted"
        ){

            return;

        }


        const ahora =
            new Date();


        const enviados =
            obtenerNotificacionesEnviadas();


        let huboCambios =
            false;


        for(
            const recordatorio
            of recordatorios
        ){

            try{

                if(
                    !recordatorio ||
                    !recordatorio.id
                ){

                    continue;

                }


                const fecha =
                    obtenerFechaRecordatorio(
                        recordatorio
                    );


                if(!fecha){

                    continue;

                }


                /*
                 * Todavía no llegó.
                 */

                if(
                    fecha.getTime() >
                    ahora.getTime()
                ){

                    continue;

                }


                const clave =
                    String(
                        recordatorio.id
                    ) +
                    "_" +
                    String(
                        fecha.getTime()
                    );


                /*
                 * Ya fue enviada.
                 */

                if(
                    enviados[clave]
                ){

                    continue;

                }


                console.log(
                    "AgroCount: recordatorio vencido:",
                    recordatorio.titulo
                );


                const enviada =
                    await enviarNotificacionRecordatorio(
                        recordatorio
                    );


                if(
                    enviada
                ){

                    enviados[clave] =
                        new Date().toISOString();

                    huboCambios =
                        true;

                }

            }catch(error){

                console.error(
                    "AgroCount: error procesando recordatorio:",
                    error
                );

            }

        }


        if(
            huboCambios
        ){

            guardarNotificacionesEnviadas(
                enviados
            );

        }

    }catch(error){

        console.error(
            "AgroCount: error comprobando recordatorios:",
            error
        );

    }

}


// ==========================================
// INICIAR COMPROBADOR
// ==========================================

function iniciarComprobadorNotificaciones(){

    try{

        if(
            intervaloNotificaciones !== null
        ){

            clearInterval(
                intervaloNotificaciones
            );

        }


        /*
         * Registrar Service Worker.
         */

        registrarServiceWorker();


        /*
         * Primera comprobación.
         */

        comprobarRecordatorios();


        /*
         * Revisar cada 30 segundos.
         */

        intervaloNotificaciones =
            setInterval(

                function(){

                    comprobarRecordatorios();

                },

                INTERVALO_NOTIFICACIONES

            );


    }catch(error){

        console.error(
            "AgroCount: error iniciando comprobador:",
            error
        );

    }

}


// ==========================================
// DETENER COMPROBADOR
// ==========================================

function detenerComprobadorNotificaciones(){

    try{

        if(
            intervaloNotificaciones !== null
        ){

            clearInterval(
                intervaloNotificaciones
            );

            intervaloNotificaciones =
                null;

        }

    }catch(error){

        console.error(
            "AgroCount: error deteniendo comprobador:",
            error
        );

    }

}


// ==========================================
// EVENTOS
// ==========================================

function iniciarEventosNotificaciones(){

    try{

        document.addEventListener(

            "visibilitychange",

            function(){

                if(
                    document.visibilityState ===
                    "visible"
                ){

                    comprobarRecordatorios();

                }

            }

        );

    }catch(error){

        console.error(
            "AgroCount: error iniciando eventos:",
            error
        );

    }

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarNotificaciones(){

    try{

        if(
            typeof registrarLog ===
            "function"
        ){

            registrarLog(
                "notificaciones.js cargado correctamente."
            );

        }


        iniciarComprobadorNotificaciones();

        iniciarEventosNotificaciones();


    }catch(error){

        console.error(
            "AgroCount: error inicializando notificaciones:",
            error
        );

    }

}


// ==========================================
// EXPORTAR
// ==========================================

window.soportaNotificaciones =
    soportaNotificaciones;

window.registrarServiceWorker =
    registrarServiceWorker;

window.solicitarPermisoNotificaciones =
    solicitarPermisoNotificaciones;

window.comprobarRecordatorios =
    comprobarRecordatorios;

window.enviarNotificacionRecordatorio =
    enviarNotificacionRecordatorio;

window.iniciarComprobadorNotificaciones =
    iniciarComprobadorNotificaciones;

window.detenerComprobadorNotificaciones =
    detenerComprobadorNotificaciones;

window.iniciarNotificaciones =
    iniciarNotificaciones;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================