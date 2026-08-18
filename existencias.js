// ==========================================
// AgroCount V4
// Archivo: existencias.js
// Existencias · Diseño profesional
// ==========================================

"use strict";

// ==========================================
// ELEMENTO PRINCIPAL
// ==========================================

const contenidoExistencias =
    document.getElementById(
        "contenidoExistencias"
    );


// ==========================================
// DATOS
// ==========================================

let resumenExistencias = {

    vacunos: 0,

    ovinos: 0,

    total: 0,

    categoriasVacunos: {},

    categoriasOvinos: {},

    razasVacunos: {},

    razasOvinos: {},

    potreros: {}

};


// ==========================================
// EMOJIS DE ANIMALES
// ==========================================
// Mismos emojis utilizados en el menú.
// ==========================================

const EMOJI_VACUNOS = "🐄";

const EMOJI_OVINOS = "🐑";


// ==========================================
// ICONO SVG — POTRERO
// ==========================================

function iconoPotreroSVG(){

    return `

        <svg
            class="icono-existencia-svg"
            viewBox="0 0 64 64"
            aria-hidden="true">

            <path
                d="
                    M32 54
                    C31 43 31 33 32 22
                "
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
            />

            <path
                d="
                    M32 35
                    C24 31 20 26 20 20
                "
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
            />

            <path
                d="
                    M32 40
                    C40 36 44 31 45 25
                "
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
            />

            <path
                d="
                    M32 28
                    C27 23 26 18 28 13
                "
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
            />

            <path
                d="
                    M32 29
                    C37 24 38 19 36 14
                "
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
            />

        </svg>

    `;

}


// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparTextoExistencias(valor){

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
// NOMBRE SEGURO
// ==========================================

function nombreExistencias(
    valor,
    defecto
){

    const texto =
        String(
            valor ?? ""
        ).trim();

    return texto ||
        defecto;

}


// ==========================================
// SUMAR EXISTENCIA
// ==========================================

function sumarExistencia(
    objeto,
    nombre
){

    const clave =
        nombreExistencias(
            nombre,
            "Sin especificar"
        );

    objeto[clave] =
        (
            objeto[clave] || 0
        ) + 1;

}


// ==========================================
// ACTUALIZAR EXISTENCIAS
// ==========================================

function actualizarExistencias(){

    const vacunos =
        obtenerVacunos();

    const ovinos =
        obtenerOvinos();

    resumenExistencias = {

        vacunos:
            vacunos.length,

        ovinos:
            ovinos.length,

        total:
            vacunos.length +
            ovinos.length,

        categoriasVacunos: {},

        categoriasOvinos: {},

        razasVacunos: {},

        razasOvinos: {},

        potreros: {}

    };


    // ======================================
    // VACUNOS
    // ======================================

    vacunos.forEach(

        function(vacuno){

            sumarExistencia(

                resumenExistencias
                    .categoriasVacunos,

                vacuno.categoria

            );

            sumarExistencia(

                resumenExistencias
                    .razasVacunos,

                vacuno.raza

            );

            sumarExistencia(

                resumenExistencias
                    .potreros,

                vacuno.potrero

            );

        }

    );


    // ======================================
    // OVINOS
    // ======================================

    ovinos.forEach(

        function(ovino){

            sumarExistencia(

                resumenExistencias
                    .categoriasOvinos,

                ovino.categoria

            );

            sumarExistencia(

                resumenExistencias
                    .razasOvinos,

                ovino.raza

            );

            sumarExistencia(

                resumenExistencias
                    .potreros,

                ovino.potrero

            );

        }

    );


    renderizarExistencias();

}


// ==========================================
// CREAR LISTA
// ==========================================

function crearListaExistencias(
    datos
){

    const claves =
        Object.keys(
            datos || {}
        );


    if(
        claves.length === 0
    ){

        return `

            <div class="existencias-vacio">

                <span>

                    Sin datos registrados.

                </span>

            </div>

        `;

    }


    claves.sort(

        function(a,b){

            return String(a)
                .localeCompare(
                    String(b),
                    "es",
                    {
                        sensitivity:
                            "base"
                    }
                );

        }

    );


    return `

        <div class="lista-existencias">

            ${claves.map(

                function(clave){

                    return `

                        <div
                            class="fila-existencia">

                            <span
                                class="nombre-existencia">

                                ${
                                    escaparTextoExistencias(
                                        clave
                                    )
                                }

                            </span>

                            <strong
                                class="cantidad-existencia">

                                ${
                                    datos[clave]
                                }

                            </strong>

                        </div>

                    `;

                }

            ).join("")}

        </div>

    `;

}


// ==========================================
// CREAR PANEL
// ==========================================

function crearPanelExistencias(

    titulo,

    tipo,

    datos

){

    let icono = "";


    // ======================================
    // ICONO DEL PANEL
    // ======================================

    if(
        tipo === "vacuno"
    ){

        icono = `

            <span
                class="emoji-existencia"
                aria-hidden="true">

                ${EMOJI_VACUNOS}

            </span>

        `;

    }

    else if(
        tipo === "ovino"
    ){

        icono = `

            <span
                class="emoji-existencia"
                aria-hidden="true">

                ${EMOJI_OVINOS}

            </span>

        `;

    }

    else if(
        tipo === "potrero"
    ){

        icono =
            iconoPotreroSVG();

    }


    return `

        <div
            class="panel-existencias">

            <div
                class="panel-existencias-cabecera">

                <div
                    class="panel-existencias-icono">

                    ${icono}

                </div>

                <div>

                    <h3>

                        ${titulo}

                    </h3>

                    <p>

                        Distribución actual

                    </p>

                </div>

            </div>

            ${crearListaExistencias(
                datos
            )}

        </div>

    `;

}


// ==========================================
// RENDERIZAR
// ==========================================

function renderizarExistencias(){

    if(
        !contenidoExistencias
    ){

        return;

    }


    contenidoExistencias.innerHTML = `

        <!-- ==================================
             RESUMEN GENERAL
        =================================== -->

        <div
            class="existencias-resumen">


            <!-- VACUNOS -->

            <div
                class="existencia-card">

                <div
                    class="existencia-card-icono">

                    <span
                        class="emoji-existencia"
                        aria-hidden="true">

                        ${EMOJI_VACUNOS}

                    </span>

                </div>

                <div>

                    <span>

                        Vacunos

                    </span>

                    <strong>

                        ${resumenExistencias.vacunos}

                    </strong>

                </div>

            </div>


            <!-- OVINOS -->

            <div
                class="existencia-card">

                <div
                    class="existencia-card-icono">

                    <span
                        class="emoji-existencia"
                        aria-hidden="true">

                        ${EMOJI_OVINOS}

                    </span>

                </div>

                <div>

                    <span>

                        Ovinos

                    </span>

                    <strong>

                        ${resumenExistencias.ovinos}

                    </strong>

                </div>

            </div>


            <!-- TOTAL -->

            <div
                class="
                    existencia-card
                    existencia-card-total
                ">

                <div
                    class="existencia-card-icono">

                    <span
                        class="material-symbols-rounded">

                        inventory_2

                    </span>

                </div>

                <div>

                    <span>

                        Total de animales

                    </span>

                    <strong>

                        ${resumenExistencias.total}

                    </strong>

                </div>

            </div>

        </div>


        <!-- ==================================
             DISTRIBUCIÓN DEL RODEO
        =================================== -->

        <div
            class="existencias-seccion">

            <div
                class="existencias-titulo">

                <div>

                    <h3>

                        Distribución del rodeo

                    </h3>

                    <p>

                        Cantidad de animales según categoría y raza

                    </p>

                </div>

            </div>


            <div
                class="grid-existencias">


                <!-- CATEGORÍAS VACUNOS -->

                ${crearPanelExistencias(

                    "Categorías Vacunos",

                    "vacuno",

                    resumenExistencias
                        .categoriasVacunos

                )}


                <!-- CATEGORÍAS OVINOS -->

                ${crearPanelExistencias(

                    "Categorías Ovinos",

                    "ovino",

                    resumenExistencias
                        .categoriasOvinos

                )}


                <!-- RAZAS VACUNAS -->

                ${crearPanelExistencias(

                    "Razas Vacunas",

                    "vacuno",

                    resumenExistencias
                        .razasVacunos

                )}


                <!-- RAZAS OVINAS -->

                ${crearPanelExistencias(

                    "Razas Ovinas",

                    "ovino",

                    resumenExistencias
                        .razasOvinos

                )}

            </div>

        </div>


        <!-- ==================================
             ANIMALES POR POTRERO
        =================================== -->

        <div
            class="existencias-seccion">

            <div
                class="existencias-titulo">

                <div>

                    <h3>

                        Animales por potrero

                    </h3>

                    <p>

                        Distribución actual del rodeo

                    </p>

                </div>

            </div>


            <div
                class="
                    panel-existencias
                    panel-potrero
                ">

                <div
                    class="panel-existencias-cabecera">

                    <div
                        class="panel-existencias-icono">

                        ${iconoPotreroSVG()}

                    </div>

                    <div>

                        <h3>

                            Potreros

                        </h3>

                        <p>

                            Animales registrados

                        </p>

                    </div>

                </div>

                ${crearListaExistencias(

                    resumenExistencias
                        .potreros

                )}

            </div>

        </div>

    `;

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarExistencias(){

    actualizarExistencias();

    registrarLog(

        "existencias.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.actualizarExistencias =
    actualizarExistencias;

window.renderizarExistencias =
    renderizarExistencias;

window.iniciarExistencias =
    iniciarExistencias;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================