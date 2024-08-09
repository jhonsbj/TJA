define([], function () {
    const values = {
        id: null,
        clave: null,
        nombre: null,
        apellido_paterno: null,
        apellido_materno: null,
        correo_electronico: null,
        fecha_creacion: null,
        usuario_creo: null,
        fecha_actualizacion: null,
        usuario_actualizacion: null,
        persona_id: null,
        last_login: null,
        estatus: true,

    };

    const filtros = {
        p_search: null,
        p_estatus: null,
        p_correo: null,
        p_fecha_creacion: null,
    };

    return {
        values: values,
        filtros: filtros,
    };
});
