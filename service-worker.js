// ==========================================
// AgroCount V4
// Archivo: service-worker.js
// Notificaciones del sistema
// ==========================================

"use strict";


// ==========================================
// INSTALACIÓN
// ==========================================

self.addEventListener(

    "install",

    function(){

        self.skipWaiting();

    }

);


// ==========================================
// ACTIVACIÓN
// ==========================================

self.addEventListener(

    "activate",

    function(evento){

        evento.waitUntil(

            self.clients.claim()

        );

    }

);


// ==========================================
// MENSAJES DESDE AGROCOUNT
// ==========================================

self.addEventListener(

    "message",

    function(evento){

        const datos =
            evento.data;


        if(
            !datos ||
            datos.tipo !==
            "MOSTRAR_NOTIFICACION"
        ){

            return;

        }


        const titulo =
            datos.titulo ||
            "Recordatorio AgroCount";


        const opciones = {

            body:
                datos.cuerpo ||
                "Tienes un recordatorio pendiente.",

            icon:
                "./icon-192.png",

            badge:
                "./icon-192.png",

            tag:
                datos.tag ||
                "agrocount-recordatorio",

            renotify:
                false,

            data: {

                url:
                    "./"

            }

        };


        evento.waitUntil(

            self.registration.showNotification(

                titulo,

                opciones

            )

        );

    }

);


// ==========================================
// CLIC EN NOTIFICACIÓN
// ==========================================

self.addEventListener(

    "notificationclick",

    function(evento){

        evento.notification.close();


        evento.waitUntil(

            self.clients.matchAll({

                type:
                    "window",

                includeUncontrolled:
                    true

            })

            .then(

                function(clientes){

                    for(
                        const cliente
                        of clientes
                    ){

                        if(
                            "focus"
                            in cliente
                        ){

                            return cliente.focus();

                        }

                    }


                    if(
                        self.clients.openWindow
                    ){

                        return self.clients.openWindow(
                            "./"
                        );

                    }

                }

            )

        );

    }

);


// ==========================================
// FIN
// ==========================================