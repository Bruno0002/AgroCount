// ==========================================
// AgroCount V4
// Archivo: menu.js
// Menú lateral
// ==========================================

"use strict";

// ==========================================
// ELEMENTOS
// ==========================================

const menuLateral =
    document.getElementById(
        "menuLateral"
    );

const btnMenu =
    document.getElementById(
        "btnMenu"
    );

const botonesMenu =
    document.querySelectorAll(
        ".item-menu"
    );


// ==========================================
// ESTADO
// ==========================================

let menuAbierto = false;


// ==========================================
// ABRIR MENÚ
// ==========================================

function abrirMenu(){

    if(!menuLateral){

        console.error(
            "AgroCount: no se encontró #menuLateral"
        );

        return;

    }

    menuLateral.classList.add(
        "activo"
    );

    menuAbierto = true;

    if(btnMenu){

        btnMenu.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


// ==========================================
// CERRAR MENÚ
// ==========================================

function cerrarMenu(){

    if(!menuLateral){

        return;

    }

    menuLateral.classList.remove(
        "activo"
    );

    menuAbierto = false;

    if(btnMenu){

        btnMenu.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


// ==========================================
// ALTERNAR MENÚ
// ==========================================

function alternarMenu(){

    if(menuAbierto){

        cerrarMenu();

    }else{

        abrirMenu();

    }

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarMenu(){

    // ======================================
    // BOTÓN MENÚ
    // ======================================

    if(btnMenu){

        btnMenu.type = "button";

        btnMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        btnMenu.addEventListener(

            "click",

            function(event){

                event.preventDefault();

                event.stopPropagation();

                alternarMenu();

            }

        );

    }


    // ======================================
    // BOTONES DEL MENÚ
    // ======================================

    botonesMenu.forEach(

        function(boton){

            boton.addEventListener(

                "click",

                function(){

                    if(
                        window.innerWidth <= 900
                    ){

                        cerrarMenu();

                    }

                }

            );

        }

    );


    // ======================================
    // CERRAR AL TOCAR AFUERA
    // ======================================

    document.addEventListener(

        "click",

        function(event){

            if(!menuAbierto){

                return;

            }

            if(
                menuLateral &&
                !menuLateral.contains(
                    event.target
                ) &&
                btnMenu &&
                !btnMenu.contains(
                    event.target
                )
            ){

                cerrarMenu();

            }

        }

    );


    // ======================================
    // CERRAR CON ESCAPE
    // ======================================

    document.addEventListener(

        "keydown",

        function(event){

            if(
                event.key === "Escape"
            ){

                cerrarMenu();

            }

        }

    );


    registrarLog(
        "menu.js cargado correctamente."
    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.abrirMenu =
    abrirMenu;

window.cerrarMenu =
    cerrarMenu;

window.alternarMenu =
    alternarMenu;

window.iniciarMenu =
    iniciarMenu;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================