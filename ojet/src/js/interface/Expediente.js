define([], function () {
    const values = {
        id: null,
        numero_expediente: null,
        promocion_id: null,
        tipo_documento_id: null,
        usuario_creo_id: null,
        fecha_registro: null,
        ponencia_id: null,
        usuario_actualizo_id: null,
        fecha_actualiazo: null,
        digitalizado: null,
        estatus: null,
        descripcion: null,
        municipio_id: null,
        dependencia_id: null,
        num_actores: null,
        num_representantes: null,
        actRep: [],
    };

    const actRep = {
        nombre: null,
        apellido_paterno: null,
        apellido_materno: null,
    };

    const filtros = {
        p_search: null,
    };

    return {
        values: values,
        actRep: actRep,
        filtros: filtros,
    };
});
