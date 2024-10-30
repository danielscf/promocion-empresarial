import Swal from 'sweetalert2';

export const showSuccessMessage = (title = 'Registro exitoso', text = 'El registro se ha realizado con éxito.') => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
};

export const showPendingMessage = (message = 'El registro esta en proceso...') => {
    Swal.fire({
        title: 'Espere por favor',
        text: message,
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false
    });
}

export const showErrorMessage = (title = 'Error en el registro', text = 'Hubo un problema al realizar el registro.') => {
    Swal.fire({
        title,
        text,
        icon: 'error', 
        confirmButtonText: 'Aceptar'
    });
};
