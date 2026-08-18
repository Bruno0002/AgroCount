// ==========================================
// AgroCount V4
// Archivo: registros.js
// Historial de movimientos
// ==========================================

"use strict";

// ==========================================
// ELEMENTO PRINCIPAL
// ==========================================

const contenidoRegistros =
    document.getElementById(
        "contenidoRegistros"
    );


// ==========================================
// DATOS
// ==========================================

let registros =
    obtenerRegistros();

let registrosFiltrados =
    copiarLista(
        registros
    );


// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparTextoRegistros(
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
// OBTENER EMOJI SEGÚN TIPO
// ==========================================

function obtenerEmojiRegistro(
    tipo
){

    const texto =
        String(
            tipo ?? ""
        )
        .toLowerCase()
        .trim();


    if(
        texto.includes("vacuno") ||
        texto.includes("bovino")
    ){

        return "🐄";

    }


    if(
        texto.includes("ovino") ||
        texto.includes("oveja") ||
        texto.includes("cordero")
    ){

        return "🐑";

    }


    if(
        texto.includes("potrero")
    ){

        return "🌱";

    }


    if(
        texto.includes("sanidad") ||
        texto.includes("vacuna") ||
        texto.includes("tratamiento") ||
        texto.includes("salud")
    ){

        return "💉";

    }


    if(
        texto.includes("venta") ||
        texto.includes("vendido")
    ){

        return "💰";

    }


    if(
        texto.includes("registro") ||
        texto.includes("sistema")
    ){

        return "🕘";

    }


    return "🕘";

}


// ==========================================
// RENDERIZAR ESTRUCTURA
// ==========================================

function renderizarRegistros(){

    if(!contenidoRegistros){

        return;

    }


    contenidoRegistros.innerHTML = `

        <!-- ==================================
             BUSCADOR
        =================================== -->

        <div class="registros-buscador">

            <span
                class="emoji-registro-busqueda"
                aria-hidden="true">

                🔎

            </span>

            <input
                type="search"
                id="buscarRegistro"
                placeholder="Buscar registro..."
                autocomplete="off">

        </div>


        <!-- ==================================
             CABECERA HISTORIAL
        =================================== -->

        <div class="registros-listado-cabecera">

            <div>

                <h3>

                    Historial

                </h3>

                <p>

                    Movimientos registrados en AgroCount

                </p>

            </div>

        </div>


        <!-- ==================================
             LISTA
        =================================== -->

        <div
            id="listaRegistros"
            class="lista-registros">

        </div>

    `;


    actualizarListaRegistros();

    iniciarBuscadorRegistros();

}


// ==========================================
// ACTUALIZAR LISTA
// ==========================================

function actualizarListaRegistros(){

    const lista =
        document.getElementById(
            "listaRegistros"
        );


    if(!lista){

        return;

    }


    // ======================================
    // SIN REGISTROS
    // ======================================

    if(
        registrosFiltrados.length === 0
    ){

        lista.innerHTML = `

            <div class="registro-vacio">

                <div class="registro-vacio-icono">

                    <span
                        class="emoji-registro"
                        aria-hidden="true">

                        🕘

                    </span>

                </div>

                <div>

                    <strong>

                        No hay registros

                    </strong>

                    <p>

                        Los movimientos de AgroCount
                        aparecerán aquí.

                    </p>

                </div>

            </div>

        `;

        return;

    }


    // ======================================
    // REGISTROS
    // ======================================

    lista.innerHTML =

        registrosFiltrados.map(

            function(item){

                const tipo =
                    escaparTextoRegistros(
                        item?.tipo ||
                        "Registro"
                    );


                const descripcion =
                    escaparTextoRegistros(
                        item?.descripcion ||
                        "Sin descripción"
                    );


                const fecha =
                    escaparTextoRegistros(
                        item?.fecha ||
                        "Sin fecha"
                    );


                const emoji =
                    obtenerEmojiRegistro(
                        item?.tipo
                    );


                return `

                    <div class="registro-item">


                        <div class="registro-item-icono">

                            <span
                                class="emoji-registro"
                                aria-hidden="true">

                                ${emoji}

                            </span>

                        </div>


                        <div class="registro-item-contenido">

                            <div
                                class="registro-item-cabecera">

                                <strong>

                                    ${tipo}

                                </strong>

                                <span
                                    class="registro-fecha">

                                    ${fecha}

                                </span>

                            </div>


                            <p
                                class="registro-descripcion">

                                ${descripcion}

                            </p>

                        </div>


                    </div>

                `;

            }

        ).join("");

}


// ==========================================
// AGREGAR REGISTRO
// ==========================================

function agregarRegistro(

    tipo,

    descripcion

){

    registros.unshift({

        id:
            generarId(),

        tipo:
            tipo ||
            "Registro",

        descripcion:
            descripcion ||
            "Sin descripción",

        fecha:
            new Date()
            .toLocaleString()

    });


    guardarRegistros(

        registros

    );


    registrosFiltrados =
        copiarLista(
            registros
        );


    actualizarListaRegistros();

}


// ==========================================
// BUSCADOR
// ==========================================

function iniciarBuscadorRegistros(){

    const buscador =
        document.getElementById(
            "buscarRegistro"
        );


    if(!buscador){

        return;

    }


    buscador.oninput =

        function(){

            const texto =

                this.value
                .trim()
                .toLowerCase();


            registrosFiltrados =

                registros.filter(

                    function(item){

                        const tipo =

                            String(
                                item?.tipo ||
                                ""
                            )
                            .toLowerCase();


                        const descripcion =

                            String(
                                item?.descripcion ||
                                ""
                            )
                            .toLowerCase();


                        const fecha =

                            String(
                                item?.fecha ||
                                ""
                            )
                            .toLowerCase();


                        return (

                            tipo.includes(
                                texto
                            )

                            ||

                            descripcion.includes(
                                texto
                            )

                            ||

                            fecha.includes(
                                texto
                            )

                        );

                    }

                );


            actualizarListaRegistros();

        };

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarRegistros(){

    renderizarRegistros();

    registrarLog(

        "registros.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.agregarRegistro =
    agregarRegistro;


window.renderizarRegistros =
    renderizarRegistros;


window.actualizarListaRegistros =
    actualizarListaRegistros;


window.iniciarRegistros =
    iniciarRegistros;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================