import { getEventoById } from '@/api/eventoApi'
import { editEvento, fetchEventos } from '@/store/eventoSlice';
import React, { useState, useEffect } from 'react'
import { showSuccessMessage, showErrorMessage, alertPersonalizado } from '@/app/utils/messages';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const EventoEditForm = ({ closeModal, eventoId }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [evento, setevento] = useState(null)
    const dispatch = useDispatch()

    const [fileError, setFileError] = useState('');
    const [existingFileName, setExistingFileName] = useState('');
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['application/pdf'];

        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            setFileError('');

        } else {
            setSelectedFile(null);
            setFileError('Por favor, selecciona un archivo PDF válido.');
        }
    };

    useEffect(() => {

        const cargarDatosEvento = async () => {

            const response = await getEventoById(eventoId)
            const datos_evento = response.data
            setevento(response.data)
            setValue('eventoNombre', datos_evento?.eventoNombre)
            setValue('eventoDescripcion', datos_evento?.eventoDescripcion)
            setValue('eventoFechaInicio', datos_evento?.eventoFechaInicio)
            setValue('eventoFechaFin', datos_evento?.eventoFechaFin)
            setValue('eventoFechaFin', datos_evento?.eventoFechaFin)
            setValue('eventoHoraInicio', datos_evento?.eventoHoraInicio)
            setValue('eventoHoraFin', datos_evento?.eventoHoraFin)
            setValue('eventoLugar', datos_evento?.eventoLugar)
            setValue('tipoEvento', datos_evento?.tipoEvento)

            if (datos_evento.eventoPlantillaDiploma) {
                setExistingFileName(datos_evento?.eventoPlantillaDiploma);
            }

        }
        cargarDatosEvento()

    }, [eventoId, setValue])

    const onSubmit = async (data) => {

        const initialData = {
            eventoNombre: evento?.eventoNombre,
            eventoDescripcion: evento?.eventoDescripcion,
            eventoFechaInicio: evento?.eventoFechaInicio,
            eventoFechaFin: evento?.eventoFechaFin,
            eventoHoraInicio: evento?.eventoHoraInicio,
            eventoHoraFin: evento?.eventoHoraFin,
            eventoLugar: evento?.eventoLugar,
            tipoEvento: evento?.tipoEvento,
        };

        const formDataIsEqual = JSON.stringify(data) === JSON.stringify(initialData);

        if (formDataIsEqual) {
            alertPersonalizado('Sin cambios', 'No se han realizado cambios en el formulario.');
            return;
        }

        const formData = new FormData();
        formData.append('plantillaArchivo', selectedFile);
        formData.append('eventoDto', JSON.stringify(data));
        console.log("ID EVENTO:"+eventoId)
        try {
            const response = await dispatch(editEvento({formData,eventoId})).unwrap();
            console.log('Evento Editado:', response);
            showSuccessMessage('Editado exitosamente', 'La edicion se ha realizado con éxito.');
            dispatch(fetchEventos());
            reset();
            closeModal();
            setSelectedFile(null);
        } catch (error) {
            console.error('Error al editar el evento:', error);
            const errorMessage = error.message || 'Hubo un problema al realizar la edicion. Verifica los datos e intenta nuevamente.';
            showErrorMessage('Error en el registro', errorMessage);
        }
    };

    if (!evento || !evento.tipoEvento) {
        return <p>Cargando...</p>;
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del Evento */}
            <div className="mb-4">
                <label htmlFor="eventoNombre" className="block text-sm font-medium text-black mb-1">
                    Nombre del Evento
                </label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md text-black w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoNombre', { required: true, maxLength: 150 })}
                />
                {errors.eventoNombre && <span className="text-red-500">El nombre del evento es requerido</span>}
            </div>

            {/* Descripción */}
            <div className="mb-4">
                <label htmlFor="eventoDescripcion" className="block text-sm font-medium text-black mb-1">
                    Descripción
                </label>
                <textarea
                    className="border border-gray-300 rounded-md text-black w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoDescripcion', { require: true, maxLength: 255 })}
                ></textarea>
                {errors.eventoDescripcion && <span className="text-red-500">El descripcion del evento es requerido</span>}
            </div>

            {/* Fecha de Inicio */}
            <div className="mb-4">
                <label htmlFor="eventoFechaInicio" className="block text-sm font-medium text-black mb-1">
                    Fecha de Inicio
                </label>
                <input
                    type="date"
                    className="border border-gray-300 rounded-md w-full p-2 text-black focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoFechaInicio', { required: true })}
                />
                {errors.eventoFechaInicio && <span className="text-red-500">La fecha de inicio es requerida</span>}
            </div>

            {/* Fecha de Fin */}
            <div className="mb-4">
                <label htmlFor="eventoFechaFin" className="block text-sm font-medium text-black mb-1">
                    Fecha de Fin
                </label>
                <input
                    type="date"
                    className="border border-gray-300 rounded-md w-full p-2 text-black focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoFechaFin', { required: true })}
                />
                {errors.eventoFechaFin && <span className="text-red-500">La fecha de fin es requerida</span>}
            </div>

            {/* Hora de Inicio */}
            <div className="mb-4">
                <label htmlFor="eventoHoraInicio" className="block text-sm font-medium text-black mb-1">
                    Hora de Inicio
                </label>
                <input
                    type="time"
                    className="border border-gray-300 rounded-md w-ful text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoHoraInicio', { required: true })}
                />
                {errors.eventoHoraInicio && <span className="text-red-500">La hora de inicio es requerida</span>}
            </div>

            {/* Hora de Fin */}
            <div className="mb-4">
                <label htmlFor="eventoHoraFin" className="block text-sm font-medium text-black mb-1">
                    Hora de Fin
                </label>
                <input
                    type="time"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoHoraFin', { required: true })}
                />
                {errors.eventoHoraFin && <span className="text-red-500">La hora de fin es requerida</span>}
            </div>

            {/* Lugar */}
            <div className="mb-4">
                <label htmlFor="eventoLugar" className="block text-sm font-medium text-black mb-1">
                    Lugar
                </label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoLugar', { required: true, maxLength: 255 })}
                />
                {errors.eventoLugar && <span className="text-red-500">El lugar es requerido</span>}
            </div>

            {/* Tipo de Evento */}
            <div className="mb-4">
                <label htmlFor="tipoEvento" className="block text-sm font-medium text-black mb-1">
                    Tipo de Evento
                </label>
                <select
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('tipoEvento', { required: true })}
                >
                    <option value="">Selecciona un tipo de evento</option>
                    <option value="Feria">Feria</option>
                    <option value="Taller">Taller</option>
                    <option value="Capacitacion">Capacitación</option>
                </select>
                {errors.tipoEvento && <span className="text-red-500">El tipo de evento es requerido</span>}
            </div>

             {/* Plantilla de Diploma */}
             <div className="mb-4">
                <label htmlFor="eventoPlantillaDiploma" className="block text-sm font-medium text-black mb-1">
                  Modificar Plantilla de Diploma
                </label>
                <input
                    type="file"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                {fileError && <span className="text-red-500">{fileError}</span>}
                {existingFileName && (
                    <div className="flex items-center mt-2">
                        <p className="text-sm text-black mr-4">
                            Archivo actual: <strong>{existingFileName}</strong>
                        </p>
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/evento/ver/${existingFileName}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-indigo-600 hover:underline"
                        >
                            <FontAwesomeIcon icon={faDownload} className="mr-1" />
                            Descargar
                        </a>
                    </div>
                )}
            </div>

            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    onClick={closeModal}
                >
                    Cerrar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Registrar
                </button>
            </div>
        </form>
    )
}

export default EventoEditForm
