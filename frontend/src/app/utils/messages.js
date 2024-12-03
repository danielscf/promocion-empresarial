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

export const alertPersonalizado = (titulo,texto) => {
    Swal.fire({
        icon: 'warning',
        title: titulo,
        text: texto,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33'
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
