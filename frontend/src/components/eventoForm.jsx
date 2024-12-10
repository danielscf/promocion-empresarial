import { fetchEventos } from '@/store/eventoSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage, alertPersonalizado } from '@/app/utils/messages';
import { addNewEvento } from '@/store/eventoSlice';

const EventoForm = ({ closeModal, register, handleSubmit, errors, reset }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const currentDate = new Date().toISOString().split('T')[0];

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        setStartDate(selectedStartDate);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleHoraInicioChange = (e) => {
        const selectedHoraInicio = e.target.value;
        setHoraInicio(selectedHoraInicio);

        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours) * 60 + parseInt(minutes);
        };

        if (timeToMinutes(horaFin) <= timeToMinutes(selectedHoraInicio)) {
            setHoraInicio(horaFin);
        }
    };

    const handleHoraFinChange = (e) => {
        const selectedHoraFin = e.target.value;
        setHoraFin(selectedHoraFin);

        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours) * 60 + parseInt(minutes);
        };

        if (timeToMinutes(horaInicio) >= timeToMinutes(selectedHoraFin)) {
            setHoraFin(horaInicio);
        }
    };
    
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

    const onSubmit = async (data) => {
        if (!selectedFile) {
            setFileError('Es necesario adjuntar un archivo PDF válido.');
            return;
        }

        const formData = new FormData();
        formData.append('plantillaArchivo', selectedFile);
        formData.append('eventoDto', JSON.stringify(data));

        try {
            const response = await dispatch(addNewEvento(formData)).unwrap();
            console.log('Evento registrado:', response);
            showSuccessMessage('Registro exitoso', 'El registro se ha realizado con éxito.');
            dispatch(fetchEventos());
            reset();
            closeModal();
            setSelectedFile(null);
        } catch (error) {
            console.error('Error al registrar el evento:', error);
            const errorMessage = error.message || 'Hubo un problema al realizar el registro. Verifica los datos e intenta nuevamente.';
            showErrorMessage('Error en el registro', errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del Evento */}
            <div className="mb-4">
                <label htmlFor="eventoNombre" className="block text-sm font-medium text-black mb-1">
                    Nombre del Evento
                </label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
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
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoDescripcion', { required: true, maxLength: 255 })}
                ></textarea>
                {errors.eventoDescripcion && <span className="text-red-500">La descripcion del evento es requerido</span>}
            </div>

            {/* Fecha de Inicio */}
            <div className="mb-4">
                <label htmlFor="eventoFechaInicio" className="block text-sm font-medium text-black mb-1">
                    Fecha de Inicio
                </label>
                <input
                    type="date"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoFechaInicio', { required: true })}
                    value={startDate}
                    min={currentDate}
                    max={endDate}
                    onChange={handleStartDateChange}
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
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    value={endDate}
                    min={ startDate || currentDate}
                    {...register('eventoFechaFin', { required: "La fecha de fin es requerida", })}
                    onChange={handleEndDateChange}
                />
                {errors.eventoFechaFin && (
                    <span className="text-red-500">{errors.eventoFechaFin.message}</span>
                )}
            </div>

            {/* Hora de Inicio */}
            <div className="mb-4">
                <label htmlFor="eventoHoraInicio" className="block text-sm font-medium text-black mb-1">
                    Hora de Inicio
                </label>
                <input
                    type="time"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('eventoHoraInicio', { required: true })}
                    value={horaInicio}
                    onChange={handleHoraInicioChange}
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
                    value={horaFin}
                    onChange={handleHoraFinChange}
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
                    id="tipoEvento"
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
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
                    Plantilla de Diploma
                </label>
                <input
                    type="file"
                    className="border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                {fileError && <span className="text-red-500">{fileError}</span>}
            </div>
            <p className="text-sm text-gray-700 mt-2">
                * Solo se permiten archivos en formato PDF y con un tamaño máximo de 1 MB.
            </p>
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    onClick={() => {

                        closeModal()
                        reset()
                    }}
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

export default EventoForm
