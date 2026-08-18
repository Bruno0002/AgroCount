// ==========================================
// AgroCount V3
// Archivo: navegacion.js
// Navegación principal + botón volver
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const secciones =
    document.querySelectorAll(
        ".seccion"
    );

const itemsMenu =
    document.querySelectorAll(
        ".item-menu"
    );

const tituloSeccion =
    document.getElementById(
        "tituloSeccion"
    );

const subtituloSeccion =
    document.getElementById(
        "subtituloSeccion"
    );

// ==========================================
// DATOS
// ==========================================

const TITULOS = {

    inicio:
        "Inicio",

    potreros:
        "Potreros",

    vacunos:
        "Vacunos",

    ovinos:
        "Ovinos",

    existencias:
        "Existencias",

    sanidad:
        "Sanidad",

    registros:
        "Registros",

    configuracion:
        "Configuración"

};

// ==========================================
// CREAR BOTÓN VOLVER
// ==========================================

function crearBotonVolver(){

    const cabeceras =
        document.querySelectorAll(
            ".cabecera-seccion"
        );

    cabeceras.forEach(

        function(cabecera){

            // Evitar duplicarlo

            if(
                cabecera.querySelector(
                    ".btn-volver-inicio"
                )
            ){

                return;

            }

            const boton =
                document.createElement(
                    "button"
                );

            boton.type =
                "button";

            boton.className =
                "btn-volver-inicio";

            boton.setAttribute(
                "aria-label",
                "Volver al inicio"
            );

            boton.setAttribute(
                "title",
                "Volver al inicio"
            );

            boton.innerHTML = `

                <span
                    class="material-symbols-rounded">

                    chevron_left

                </span>

            `;

            boton.addEventListener(

                "click",

                function(){

                    mostrarSeccion(
                        "inicio"
                    );

                }

            );

            /*
             * La flecha queda al comienzo
             * de la cabecera.
             */

            cabecera.insertBefore(

                boton,

                cabecera.firstChild

            );

        }

    );

}


// ==========================================
// MOSTRAR / OCULTAR FLECHA
// ==========================================

function actualizarBotonVolver(

    nombre

){

    const botones =
        document.querySelectorAll(
            ".btn-volver-inicio"
        );

    botones.forEach(

        function(boton){

            if(
                nombre === "inicio"
            ){

                boton.classList.add(
                    "oculto"
                );

            }else{

                boton.classList.remove(
                    "oculto"
                );

            }

        }

    );

}


// ==========================================
// FUNCIONES
// ==========================================

function mostrarSeccion(

    nombre

){

    secciones.forEach(

        function(seccion){

            seccion.classList.remove(

                "activa"

            );

        }

    );

    const activa =
        document.getElementById(
            nombre
        );

    if(

        activa

    ){

        activa.classList.add(

            "activa"

        );

    }

    itemsMenu.forEach(

        function(item){

            item.classList.remove(

                "activo"

            );

        }

    );

    const botonActivo =
        document.querySelector(

            '.item-menu[data-seccion="' +

            nombre +

            '"]'

        );

    if(

        botonActivo

    ){

        botonActivo.classList.add(

            "activo"

        );

    }

    if(

        tituloSeccion

    ){

        tituloSeccion.textContent =

            TITULOS[nombre] ||

            "AgroCount";

    }

    if(

        subtituloSeccion

    ){

        subtituloSeccion.textContent =

            "Gestión Ganadera";

    }

    // ==========================================
    // FLECHA VOLVER
    // ==========================================

    actualizarBotonVolver(

        nombre

    );

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarNavegacion(){

    /*
     * Primero creamos las flechas
     * de las secciones secundarias.
     */

    crearBotonVolver();

    itemsMenu.forEach(

        function(item){

            item.addEventListener(

                "click",

                function(){

                    mostrarSeccion(

                        this.dataset.seccion

                    );

                }

            );

        }

    );

    mostrarSeccion(

        "inicio"

    );

    registrarLog(

        "navegacion.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.mostrarSeccion =
    mostrarSeccion;

window.iniciarNavegacion =
    iniciarNavegacion;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================