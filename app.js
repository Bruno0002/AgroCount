// ==========================================
// AgroCount V4
// Archivo: app.js
// Inicialización principal del sistema
// ==========================================

"use strict";

// ==========================================
// INICIALIZACIÓN
// ==========================================

function iniciarSistema(){

    try{

        registrarLog(
            "Iniciando sistema..."
        );

        actualizarCarga(
            10
        );


        // ======================================
        // ALMACENAMIENTO
        // ======================================

        try{

            inicializarStorage();

        }catch(error){

            console.error(
                "AgroCount: error inicializando almacenamiento:",
                error
            );

        }

        actualizarCarga(
            20
        );


        // ======================================
        // MENÚ
        // ======================================

        try{

            iniciarMenu();

        }catch(error){

            console.error(
                "AgroCount: error iniciando menú:",
                error
            );

        }


        // ======================================
        // NAVEGACIÓN
        // ======================================

        try{

            iniciarNavegacion();

        }catch(error){

            console.error(
                "AgroCount: error iniciando navegación:",
                error
            );

        }

        actualizarCarga(
            35
        );


        // ======================================
        // RESUMEN
        // ======================================

        try{

            iniciarResumen();

        }catch(error){

            console.error(
                "AgroCount: error iniciando resumen:",
                error
            );

        }


        // ======================================
        // POTREROS
        // ======================================

        try{

            iniciarPotreros();

        }catch(error){

            console.error(
                "AgroCount: error iniciando potreros:",
                error
            );

        }


        // ======================================
        // VACUNOS
        // ======================================

        try{

            iniciarVacunos();

        }catch(error){

            console.error(
                "AgroCount: error iniciando vacunos:",
                error
            );

        }


        // ======================================
        // OVINOS
        // ======================================

        try{

            iniciarOvinos();

        }catch(error){

            console.error(
                "AgroCount: error iniciando ovinos:",
                error
            );

        }

        actualizarCarga(
            55
        );


        // ======================================
        // EXISTENCIAS
        // ======================================

        try{

            iniciarExistencias();

        }catch(error){

            console.error(
                "AgroCount: error iniciando existencias:",
                error
            );

        }


        // ======================================
        // SANIDAD
        // ======================================

        try{

            iniciarSanidad();

        }catch(error){

            console.error(
                "AgroCount: error iniciando sanidad:",
                error
            );

        }


        // ======================================
        // REGISTROS
        // ======================================

        try{

            iniciarRegistros();

        }catch(error){

            console.error(
                "AgroCount: error iniciando registros:",
                error
            );

        }


        // ======================================
        // CONFIGURACIÓN
        // ======================================

        try{

            iniciarConfiguracion();

        }catch(error){

            console.error(
                "AgroCount: error iniciando configuración:",
                error
            );

        }


        // ======================================
        // ACTUALIZAR RESUMEN
        // ======================================

        try{

            actualizarResumen();

        }catch(error){

            console.error(
                "AgroCount: error actualizando resumen:",
                error
            );

        }


        // ======================================
        // ACTUALIZAR EXISTENCIAS
        // ======================================

        try{

            actualizarExistencias();

        }catch(error){

            console.error(
                "AgroCount: error actualizando existencias:",
                error
            );

        }


        actualizarCarga(
            90
        );


        // ======================================
        // CARGA COMPLETADA
        // ======================================

        actualizarCarga(
            100
        );


        // ======================================
        // OCULTAR PANTALLA DE CARGA
        // ======================================

        setTimeout(

            function(){

                try{

                    ocultarPantallaCarga();

                }catch(error){

                    console.error(
                        "AgroCount: error ocultando pantalla de carga:",
                        error
                    );

                }


                try{

                    registrarLog(
                        "Sistema iniciado correctamente."
                    );

                }catch(error){

                    console.error(
                        "AgroCount: error registrando inicio:",
                        error
                    );

                }


                // ==================================
                // RECORDATORIOS
                // ==================================
                /*
                 * Se inicializan después de cargar
                 * completamente la aplicación.
                 *
                 * Un error aquí no puede bloquear
                 * el arranque de AgroCount.
                 */

                try{

                    if(
                        typeof iniciarRecordatorios ===
                        "function"
                    ){

                        iniciarRecordatorios();

                    }else{

                        console.warn(
                            "AgroCount: iniciarRecordatorios() no disponible."
                        );

                    }

                }catch(error){

                    console.error(
                        "AgroCount: error iniciando recordatorios:",
                        error
                    );

                }


                // ==================================
                // NOTIFICACIONES
                // ==================================
                /*
                 * Se inicializan después de los
                 * recordatorios.
                 *
                 * Un error del sistema de
                 * notificaciones no debe impedir
                 * que AgroCount funcione.
                 */

                try{

                    if(
                        typeof iniciarNotificaciones ===
                        "function"
                    ){

                        iniciarNotificaciones();

                    }else{

                        console.warn(
                            "AgroCount: iniciarNotificaciones() no disponible."
                        );

                    }

                }catch(error){

                    console.error(
                        "AgroCount: error iniciando notificaciones:",
                        error
                    );

                }

            },

            500

        );

    }catch(error){

        console.error(
            "AgroCount: error crítico iniciando sistema:",
            error
        );


        /*
         * Intentamos ocultar la pantalla
         * de carga incluso si algún módulo
         * produjo un error inesperado.
         */

        try{

            ocultarPantallaCarga();

        }catch(errorCarga){

            console.error(
                "AgroCount: no se pudo ocultar pantalla de carga:",
                errorCarga
            );

        }

    }

}


// ==========================================
// INICIAR SISTEMA
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        iniciarSistema();

    }

);

// ==========================================
// SERVICE WORKER · PWA
// ==========================================

if ("serviceWorker" in navigator){

    window.addEventListener(
        "load",
        function(){

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(function(registro){

                    console.log(
                        "AgroCount: Service Worker registrado correctamente.",
                        registro.scope
                    );

                })
                .catch(function(error){

                    console.error(
                        "AgroCount: error registrando Service Worker:",
                        error
                    );

                });

        }
    );

}


// ==========================================
// FIN DEL ARCHIVO
// ==========================================
