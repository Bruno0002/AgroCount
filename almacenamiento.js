// ==========================================
// AgroCount V4
// Archivo: almacenamiento.js
// ==========================================

"use strict";

// ==========================================
// CLAVES LOCALSTORAGE
// ==========================================

const CLAVES_STORAGE = {

    VERSION:
        "agrocount_version",

    CONFIGURACION:
        "agrocount_configuracion",

    POTREROS:
        "agrocount_potreros",

    VACUNOS:
        "agrocount_vacunos",

    OVINOS:
        "agrocount_ovinos",

    REGISTROS:
        "agrocount_registros",

    SANIDAD:
        "agrocount_sanidad"

};

// ==========================================
// FUNCIONES BASE
// ==========================================

function existeStorage(
    clave
){

    return localStorage.getItem(
        clave
    ) !== null;

}

function leerStorage(
    clave,
    valorPorDefecto
){

    try{

        const datos =
            localStorage.getItem(
                clave
            );

        if(
            datos === null
        ){

            return valorPorDefecto;

        }

        return JSON.parse(
            datos
        );

    }catch(error){

        registrarLog(
            "Error leyendo",
            clave,
            error
        );

        return valorPorDefecto;

    }

}

function guardarStorage(
    clave,
    datos
){

    try{

        localStorage.setItem(
            clave,
            JSON.stringify(
                datos
            )
        );

        return true;

    }catch(error){

        registrarLog(
            "Error guardando",
            clave,
            error
        );

        return false;

    }

}

// ==========================================
// VERSIÓN
// ==========================================

function obtenerVersion(){

    return leerStorage(
        CLAVES_STORAGE.VERSION,
        "4.0.0"
    );

}

function guardarVersion(
    version
){

    return guardarStorage(
        CLAVES_STORAGE.VERSION,
        version
    );

}

// ==========================================
// CONFIGURACIÓN
// ==========================================

function obtenerConfiguracion(){

    return leerStorage(
        CLAVES_STORAGE.CONFIGURACION,
        {}
    );

}

function guardarConfiguracion(
    configuracion
){

    return guardarStorage(
        CLAVES_STORAGE.CONFIGURACION,
        configuracion
    );

}

// ==========================================
// POTREROS
// ==========================================

function obtenerPotreros(){

    return leerStorage(
        CLAVES_STORAGE.POTREROS,
        []
    );

}

function guardarPotreros(
    potreros
){

    return guardarStorage(
        CLAVES_STORAGE.POTREROS,
        potreros
    );

}

// ==========================================
// VACUNOS
// ==========================================

function obtenerVacunos(){

    return leerStorage(
        CLAVES_STORAGE.VACUNOS,
        []
    );

}

function guardarVacunos(
    vacunos
){

    return guardarStorage(
        CLAVES_STORAGE.VACUNOS,
        vacunos
    );

}

// ==========================================
// OVINOS
// ==========================================

function obtenerOvinos(){

    return leerStorage(
        CLAVES_STORAGE.OVINOS,
        []
    );

}

function guardarOvinos(
    ovinos
){

    return guardarStorage(
        CLAVES_STORAGE.OVINOS,
        ovinos
    );

}

// ==========================================
// SANIDAD
// ==========================================

function obtenerSanidad(){

    return leerStorage(
        CLAVES_STORAGE.SANIDAD,
        []
    );

}

function guardarSanidad(
    sanidad
){

    return guardarStorage(
        CLAVES_STORAGE.SANIDAD,
        sanidad
    );

}

// ==========================================
// REGISTROS
// ==========================================

function obtenerRegistros(){

    return leerStorage(
        CLAVES_STORAGE.REGISTROS,
        []
    );

}

function guardarRegistros(
    registros
){

    return guardarStorage(
        CLAVES_STORAGE.REGISTROS,
        registros
    );

}

// ==========================================
// LIMPIAR REGISTROS ANTIGUOS
// ==========================================

function limpiarRegistrosAntiguos(){

    const registros =
        obtenerRegistros();

    if(
        !Array.isArray(registros)
    ){

        guardarRegistros([]);

        return;

    }

    const registrosLimpios =
        registros.filter(

            function(item){

                if(
                    !item ||
                    typeof item !== "object"
                ){

                    return false;

                }

                const tipo =
                    String(
                        item.tipo ?? ""
                    ).trim();

                const descripcion =
                    String(
                        item.descripcion ?? ""
                    ).trim();

                /*
                 * Eliminamos únicamente
                 * registros que no tienen
                 * información real.
                 */

                if(
                    !tipo &&
                    !descripcion
                ){

                    return false;

                }

                /*
                 * También eliminamos los
                 * registros genéricos creados
                 * por versiones anteriores.
                 */

                if(
                    tipo === "Registro" &&
                    descripcion === "Sin descripción"
                ){

                    return false;

                }

                return true;

            }

        );

    if(
        registrosLimpios.length !==
        registros.length
    ){

        guardarRegistros(
            registrosLimpios
        );

        registrarLog(
            "Registros antiguos limpiados."
        );

    }

}

// ==========================================
// EXPORTAR
// ==========================================

window.CLAVES_STORAGE =
    CLAVES_STORAGE;

window.existeStorage =
    existeStorage;

window.leerStorage =
    leerStorage;

window.guardarStorage =
    guardarStorage;

window.obtenerVersion =
    obtenerVersion;

window.guardarVersion =
    guardarVersion;

window.obtenerConfiguracion =
    obtenerConfiguracion;

window.guardarConfiguracion =
    guardarConfiguracion;

window.obtenerPotreros =
    obtenerPotreros;

window.guardarPotreros =
    guardarPotreros;

window.obtenerVacunos =
    obtenerVacunos;

window.guardarVacunos =
    guardarVacunos;

window.obtenerOvinos =
    obtenerOvinos;

window.guardarOvinos =
    guardarOvinos;

window.obtenerSanidad =
    obtenerSanidad;

window.guardarSanidad =
    guardarSanidad;

window.obtenerRegistros =
    obtenerRegistros;

window.guardarRegistros =
    guardarRegistros;

window.limpiarRegistrosAntiguos =
    limpiarRegistrosAntiguos;

// ==========================================
// INICIALIZAR STORAGE
// ==========================================

function inicializarStorage(){

    if(
        !existeStorage(
            CLAVES_STORAGE.VERSION
        )
    ){

        guardarVersion(
            "4.0.0"
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.CONFIGURACION
        )
    ){

        guardarConfiguracion(
            {}
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.POTREROS
        )
    ){

        guardarPotreros(
            []
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.VACUNOS
        )
    ){

        guardarVacunos(
            []
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.OVINOS
        )
    ){

        guardarOvinos(
            []
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.SANIDAD
        )
    ){

        guardarSanidad(
            []
        );

    }

    if(
        !existeStorage(
            CLAVES_STORAGE.REGISTROS
        )
    ){

        guardarRegistros(
            []
        );

    }

    /*
     * Limpieza única de registros
     * heredados de versiones anteriores.
     */

    limpiarRegistrosAntiguos();

    registrarLog(
        "almacenamiento.js cargado correctamente."
    );

}

window.inicializarStorage =
    inicializarStorage;

// ==========================================
// FIN DEL ARCHIVO
// ==========================================