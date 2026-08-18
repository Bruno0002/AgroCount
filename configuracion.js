// ==========================================
// AgroCount V4
// Archivo: configuracion.js
// Configuración del establecimiento
// ==========================================

"use strict";

// ==========================================
// ELEMENTO PRINCIPAL
// ==========================================

const contenidoConfiguracion =
    document.getElementById(
        "contenidoConfiguracion"
    );


// ==========================================
// DATOS
// ==========================================

let configuracion =
    obtenerConfiguracion();


// ==========================================
// ESCAPAR TEXTO
// ==========================================

function escaparTextoConfiguracion(
    valor
){

    return String(
        valor == null
            ? ""
            : valor
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
// ESTADO DE NOTIFICACIONES
// ==========================================

function obtenerEstadoNotificacionesConfiguracion(){

    try{

        if(
            typeof soportaNotificaciones !==
            "function"
        ){

            return "no-disponible";

        }


        if(
            !soportaNotificaciones()
        ){

            return "no-disponible";

        }


        if(
            Notification.permission ===
            "granted"
        ){

            return "activadas";

        }


        if(
            Notification.permission ===
            "denied"
        ){

            return "bloqueadas";

        }


        return "pendientes";

    }catch(error){

        console.error(
            "Error obteniendo estado de notificaciones:",
            error
        );

        return "no-disponible";

    }

}


// ==========================================
// TEXTO DEL ESTADO
// ==========================================

function obtenerTextoEstadoNotificaciones(){

    const estado =
        obtenerEstadoNotificacionesConfiguracion();


    if(
        estado === "activadas"
    ){

        return "Activadas";

    }


    if(
        estado === "bloqueadas"
    ){

        return "Bloqueadas";

    }


    if(
        estado === "pendientes"
    ){

        return "No activadas";

    }


    return "No disponibles";

}


// ==========================================
// CLASE DEL ESTADO
// ==========================================

function obtenerClaseEstadoNotificaciones(){

    const estado =
        obtenerEstadoNotificacionesConfiguracion();


    if(
        estado === "activadas"
    ){

        return "estado-configuracion activo";

    }


    if(
        estado === "bloqueadas"
    ){

        return "estado-configuracion bloqueado";

    }


    return "estado-configuracion";

}


// ==========================================
// RENDERIZAR
// ==========================================

function renderizarConfiguracion(){

    if(!contenidoConfiguracion){

        return;

    }


    configuracion =
        obtenerConfiguracion();


    const nombre =
        escaparTextoConfiguracion(
            configuracion.nombreEstablecimiento
        );


    const propietario =
        escaparTextoConfiguracion(
            configuracion.propietario
        );


    const estadoNotificaciones =
        obtenerTextoEstadoNotificaciones();


    const claseEstadoNotificaciones =
        obtenerClaseEstadoNotificaciones();


    let botonNotificaciones = "";


    // ======================================
    // BOTÓN DE NOTIFICACIONES
    // ======================================

    if(
        estadoNotificaciones ===
        "Activadas"
    ){

        botonNotificaciones = `

            <button
                type="button"
                id="btnNotificaciones"
                class="btn-secundario">

                <span
                    class="material-symbols-rounded">

                    notifications_active

                </span>

                Notificaciones activadas

            </button>

        `;

    }else if(
        estadoNotificaciones ===
        "Bloqueadas"
    ){

        botonNotificaciones = `

            <p
                class="configuracion-ayuda">

                Las notificaciones están bloqueadas
                por el navegador. Debes permitirlas
                desde la configuración del navegador.

            </p>

        `;

    }else if(
        estadoNotificaciones ===
        "No disponibles"
    ){

        botonNotificaciones = `

            <p
                class="configuracion-ayuda">

                Este navegador no admite
                notificaciones.

            </p>

        `;

    }else{

        botonNotificaciones = `

            <button
                type="button"
                id="btnNotificaciones"
                class="btn-principal">

                <span
                    class="material-symbols-rounded">

                    notifications

                </span>

                Activar notificaciones

            </button>

        `;

    }


    contenidoConfiguracion.innerHTML = `

        <!-- ==================================
             DATOS DEL ESTABLECIMIENTO
        =================================== -->

        <div class="configuracion-panel">

            <div class="configuracion-cabecera">

                <div class="configuracion-icono">

                    <span
                        class="emoji-configuracion"
                        aria-hidden="true">

                        ⚙️

                    </span>

                </div>

                <div>

                    <h3>

                        Datos del establecimiento

                    </h3>

                    <p>

                        Información principal de AgroCount

                    </p>

                </div>

            </div>


            <form
                id="formConfiguracion"
                class="formulario-configuracion">


                <!-- ==============================
                     NOMBRE
                =============================== -->

                <div class="campo">

                    <label
                        for="nombreEstablecimiento">

                        Nombre del establecimiento

                    </label>

                    <input
                        type="text"
                        id="nombreEstablecimiento"
                        value="${nombre}"
                        placeholder="Ej.: Don Mauricio"
                        autocomplete="off">

                </div>


                <!-- ==============================
                     PROPIETARIO
                =============================== -->

                <div class="campo">

                    <label
                        for="propietarioEstablecimiento">

                        Propietario

                    </label>

                    <input
                        type="text"
                        id="propietarioEstablecimiento"
                        value="${propietario}"
                        placeholder="Nombre del propietario"
                        autocomplete="off">

                </div>


                <!-- ==============================
                     ACCIONES
                =============================== -->

                <div class="acciones-configuracion">

                    <button
                        type="submit"
                        class="btn-principal">

                        <span
                            class="material-symbols-rounded">

                            save

                        </span>

                        Guardar configuración

                    </button>

                </div>

            </form>

        </div>


        <!-- ==================================
             NOTIFICACIONES
        =================================== -->

        <div class="configuracion-card">

            <div class="configuracion-card-icono">

                <span
                    class="material-symbols-rounded">

                    notifications

                </span>

            </div>

            <div class="configuracion-card-contenido">

                <div class="configuracion-card-titulo">

                    <h3>

                        Notificaciones

                    </h3>

                    <span
                        class="${claseEstadoNotificaciones}">

                        ${estadoNotificaciones}

                    </span>

                </div>

                <p>

                    Recibe un aviso cuando llegue
                    la fecha y hora de un recordatorio.

                </p>

                <div
                    class="acciones-configuracion"
                    style="margin-top:12px;">

                    ${botonNotificaciones}

                </div>

            </div>

        </div>


        <!-- ==================================
             INFORMACIÓN DEL ALMACENAMIENTO
        =================================== -->

        <div class="configuracion-card">

            <div class="configuracion-card-icono">

                <span
                    class="emoji-configuracion"
                    aria-hidden="true">

                    💾

                </span>

            </div>

            <div class="configuracion-card-contenido">

                <div class="configuracion-card-titulo">

                    <h3>

                        Almacenamiento

                    </h3>

                    <span class="estado-configuracion">

                        Activo

                    </span>

                </div>

                <p>

                    Los datos de AgroCount se guardan
                    localmente en este dispositivo.

                </p>

            </div>

        </div>


        <!-- ==================================
             INFORMACIÓN DE AGROCOUNT
        =================================== -->

        <div class="configuracion-card">

            <div class="configuracion-card-icono">

                <span
                    class="emoji-configuracion"
                    aria-hidden="true">

                    ℹ️

                </span>

            </div>

            <div class="configuracion-card-contenido">

                <h3>

                    Información

                </h3>

                <p>

                    AgroCount V4

                </p>

                <span class="configuracion-version">

                    Gestión Ganadera

                </span>

            </div>

        </div>

    `;


    iniciarFormularioConfiguracion();

    iniciarBotonNotificaciones();

}


// ==========================================
// GUARDAR CONFIGURACIÓN
// ==========================================

function guardarConfiguracionFormulario(
    evento
){

    evento.preventDefault();


    const campoNombre =
        document.getElementById(
            "nombreEstablecimiento"
        );


    const campoPropietario =
        document.getElementById(
            "propietarioEstablecimiento"
        );


    if(
        !campoNombre ||
        !campoPropietario
    ){

        return;

    }


    configuracion = {

        nombreEstablecimiento:

            capitalizar(
                campoNombre.value
            ),

        propietario:

            capitalizar(
                campoPropietario.value
            )

    };


    const guardado =
        guardarConfiguracion(
            configuracion
        );


    if(!guardado){

        mostrarNotificacion(

            "No se pudo guardar la configuración.",

            "error"

        );

        return;

    }


    mostrarNotificacion(

        "Configuración guardada correctamente.",

        "exito"

    );


    // ======================================
    // ACTUALIZAR INICIO
    // ======================================

    if(
        typeof actualizarResumen ===
        "function"
    ){

        actualizarResumen();

    }

}


// ==========================================
// INICIAR FORMULARIO
// ==========================================

function iniciarFormularioConfiguracion(){

    const formulario =
        document.getElementById(
            "formConfiguracion"
        );


    if(!formulario){

        return;

    }


    formulario.addEventListener(

        "submit",

        guardarConfiguracionFormulario

    );

}


// ==========================================
// INICIAR BOTÓN NOTIFICACIONES
// ==========================================

function iniciarBotonNotificaciones(){

    const boton =
        document.getElementById(
            "btnNotificaciones"
        );


    if(!boton){

        return;

    }


    boton.onclick =
        async function(){

            if(
                typeof solicitarPermisoNotificaciones !==
                "function"
            ){

                mostrarNotificacion(

                    "El sistema de notificaciones no está disponible.",

                    "error"

                );

                return;

            }


            const activadas =
                await solicitarPermisoNotificaciones();


            if(
                activadas
            ){

                renderizarConfiguracion();

            }

        };

}


// ==========================================
// INICIALIZAR
// ==========================================

function iniciarConfiguracion(){

    renderizarConfiguracion();

    registrarLog(

        "configuracion.js cargado correctamente."

    );

}


// ==========================================
// EXPORTAR
// ==========================================

window.renderizarConfiguracion =
    renderizarConfiguracion;


window.iniciarConfiguracion =
    iniciarConfiguracion;


window.guardarConfiguracionFormulario =
    guardarConfiguracionFormulario;


// ==========================================
// FIN DEL ARCHIVO
// ==========================================