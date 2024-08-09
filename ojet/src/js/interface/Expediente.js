define([], function () {
    const value = {
        id: null,
        numero_expediente: null,
        tipo_proceso_id: null,
        tipo_documento_id: null,
        usuario_creo_id: null,
        fecha_registro: null,
        ponencia_id: null,
        usuario_actualizo_id: null,
        fecha_actualiazo: null,
        digitalizado: null,
        estatus: null,
        descripcion: null,
    };

    const search = {
        p_search: null,
    };

    const label = {
        numero_expediente: "Número de expediente",
    };

    return {
        value: value,
        label: label,
        search: search,
    };
});
