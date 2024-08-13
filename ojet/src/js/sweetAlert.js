define(['sweetalert2'], function (Swal) {

    const confirmText = 'Aceptar';
    const cancelText = 'Cancelar';
    const colorAccept = '#005208';
    const colorCancel = '#8e1900';


    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });


    function rowInfo(text = "Seleccione un registro para poder editar.") {
        Toast.fire({
            icon: "info",
            title: "Información",
            text: text
        });
    }

    function confirm(title, html) {
        return Swal.fire({
            title: title,
            html: html,
            width: 600,
            confirmButtonText: confirmText,
            confirmButtonColor: colorAccept,
            cancelButtonText: cancelText,
            cancelButtonColor: colorCancel,
            reverseButtons: true,
            showCancelButton: true,
            allowOutsideClick: false,
        });
    };
    

    function msgUpdated(title, text) {
        Swal.fire({
            icon: "success",
            title: title,
            text: text,
            showCancelButton: false,
            confirmButtonText: confirmText,
            allowOutsideClick:false,

        });
    };


    function msgError(title, text) {
        Swal.fire({
            icon: "error",
            title: title,
            text: text,
            showCancelButton: false,
            confirmButtonText: confirmText,
            allowOutsideClick:false,
        });
    };

    return {
        rowInfo: rowInfo,
        confirm: confirm,
        msgUpdated: msgUpdated,
        msgError: msgError,
    }
});