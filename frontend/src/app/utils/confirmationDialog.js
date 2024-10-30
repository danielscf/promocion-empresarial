import Swal from 'sweetalert2';

export const showConfirmation = async (title = '¿Deseas eliminar este registro?', confirmText = 'Sí', cancelText = 'No') => {
    const result = await Swal.fire({
        title,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        icon: 'warning'
    });

    if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        return true;
    } else {
        Swal.fire('Cancelado', 'La acción fue cancelada.', 'info');
        return false;
    }
};
