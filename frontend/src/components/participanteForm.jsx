import { findEmprendedorByDni, findEmprendedorByRuc } from "@/api/emprendedorApi";
import { createParticipacion } from "@/api/participacionApi";
import { showErrorMessage, showSuccessMessage } from "@/app/utils/messages";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ParticipanteForm = ({ closeModal, eventoId }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [emprendedores, setEmprendedores] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [emprendedorId, setemprendedorId] = useState(null)
    const [criterioBusqueda, setCriterioBusqueda] = useState("ruc");

    const onSubmit = (data) => {
        const nuevoEmprendedor = {
            id: emprendedorId,
            razonSocial: data.emprendedorRazonSocial,
        };
        setEmprendedores([...emprendedores, nuevoEmprendedor]);
        reset();
        setBusqueda('')
    };

    const eliminarEmprendedor = (id) => {
        setEmprendedores(emprendedores.filter((emp) => emp.id !== id));
    };

    const handleRegistrar = async () => {
        try {
            for (const emprendedor of emprendedores) {
                const participacion = {
                    "eventoId": eventoId,
                    "emprendedorId": emprendedor.id
                }
                await createParticipacion(participacion)
            }
            setEmprendedores([])
            showSuccessMessage('Registro exitoso', 'El registro de los participantes se ha realizado con éxito');
            closeModal()
        } catch (error) {
            console.error('Error al registrar a los participantes:', error);
            const errorMessage = error.message || 'Hubo un problema al realizar el registro. Verifica los datos e intenta nuevamente.';
            showErrorMessage('Error en el registro', errorMessage);
        }


    }

    const handleBuscar = async () => {
        if (!busqueda) {
            alert("Por favor, ingresa un valor para buscar.");
            return;
        }
        let datos = '';
        try {
            if (criterioBusqueda === 'dni') {
                if (!/^\d{8}$/.test(busqueda)) {
                    alert("El DNI debe tener 8 dígitos.");
                    return;
                }
                const response = await findEmprendedorByDni(busqueda);
                datos = response.data;
                setemprendedorId(datos.emprendedorId)
                setValue('emprendedorRazonSocial', datos.emprendedorRazonSocial);
            } else if (criterioBusqueda === 'ruc') {
                if (!/^\d{11}$/.test(busqueda)) {
                    alert("El RUC debe tener 11 dígitos.");
                    return;
                }
                const response = await findEmprendedorByRuc(busqueda);
                datos = response.data;
                setemprendedorId(datos.emprendedorId)
                setValue('emprendedorRazonSocial', datos.emprendedorRazonSocial);
            }
        } catch (error) {
            console.error("Error al buscar el emprendedor:", error);
            alert("No se encontró ningún emprendedor con los datos proporcionados.");
        }
    };

    return (
        <>
            {/* Buscar por RUC o DNI */}
            <div className="mb-4 flex items-center">
                <select
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-500 mr-2"
                    value={criterioBusqueda}
                    onChange={(e) => setCriterioBusqueda(e.target.value)}
                >
                    <option value="ruc">RUC</option>
                    <option value="dni">DNI</option>
                </select>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-1/2 focus:outline-none focus:ring focus:ring-indigo-500 mr-2"
                    placeholder={`Ingresa el ${criterioBusqueda}`}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleBuscar}
                >
                    Buscar
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1">
                        Razón Social
                    </label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                        {...register('emprendedorRazonSocial', { required: true, maxLength: 150 })}
                    />
                    {errors.emprendedorRazonSocial && <span className="text-red-500">Este campo es requerido</span>}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Agregar
                </button>

            </form>

            {/* Tabla de emprendedores */}
            <table className="min-w-full mt-6 border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Razón Social</th>
                        <th className="border px-4 py-2">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {emprendedores.map((emprendedor) => (
                        <tr key={emprendedor.id}>
                            <td className="border px-4 py-2">{emprendedor.id}</td>
                            <td className="border px-4 py-2">{emprendedor.razonSocial}</td>
                            <td className="border px-4 py-2 text-center">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-600 cursor-pointer h-6 w-6 ml-3"
                                    onClick={() => eliminarEmprendedor(emprendedor.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    onClick={closeModal}
                >
                    Cerrar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleRegistrar}>
                    Registrar
                </button>
            </div>
        </>
    )
}

export default ParticipanteForm
