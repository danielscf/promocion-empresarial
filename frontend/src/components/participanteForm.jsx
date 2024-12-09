import { findEmprendedorByDni, findEmprendedorByRuc } from "@/api/emprendedorApi";
import { createParticipacion, getAllParticipantes } from "@/api/participacionApi";
import { alertPersonalizado, showErrorMessage, showSuccessMessage } from "@/app/utils/messages";
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
    const [disable, setdisable] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false);
    const [dniError, setDniError] = useState("");
    const [rucError, setRucError] = useState("");

    const onSubmit = (data) => {

        const existeEmprendedor = emprendedores.some(emprendedor => emprendedor.razonSocial === data.emprendedorRazonSocial)
        //console.log(existeEmprendedor)
        if (existeEmprendedor) {
            reset()
            setBusqueda('')
            setdisable(false)
            disable
            alertPersonalizado('Datos repetidos', 'Este emprendedor ya se agrego')
            return
        }
        const nuevoEmprendedor = {
            id: emprendedorId,
            razonSocial: data.emprendedorRazonSocial,
        };
        setEmprendedores([...emprendedores, nuevoEmprendedor]);
        reset();
        setBusqueda('')
        setdisable(false)
    };

    const eliminarEmprendedor = (id) => {
        setEmprendedores(emprendedores.filter((emp) => emp.id !== id));
    };

    const handleRegistrar = async () => {
        if (isRegistering) return;
        setIsRegistering(true);

        const response = await getAllParticipantes(eventoId)
        const participantesActuales = response.data;
        console.log("Participantes:", JSON.stringify(participantesActuales));
        const idsParticipantesActuales = participantesActuales.map(participante => participante.emprendedor.emprendedorRazonSocial);
        console.log("Arrays razon social:", JSON.stringify(idsParticipantesActuales));

        let registraronParticipantes = false;

        try {
            for (const emprendedor of emprendedores) {
                if (idsParticipantesActuales.some(razonSocial => razonSocial === emprendedor.razonSocial)) {
                    alertPersonalizado('Participante registrado', `El emprendedor con razon social ${emprendedor.razonSocial} ya está registrado. Se omitirá.`);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    console.warn(`El emprendedor con ID ${emprendedor.id} ya está registrado. Se omitirá.`);
                    continue;
                }

                const participacion = {
                    "eventoId": eventoId,
                    "emprendedorId": emprendedor.id
                };
                await createParticipacion(participacion);
                registraronParticipantes = true;
            }

            if (registraronParticipantes) {
                showSuccessMessage('Registro exitoso', 'El registro de los participantes se ha realizado con éxito');
            } else {
                alertPersonalizado('Sin registros', 'No se registraron participantes nuevos');
            }
            setEmprendedores([]);
            closeModal();
        } catch (error) {
            console.error('Error al registrar a los participantes:', error);
            const errorMessage = error.message || 'Hubo un problema al realizar el registro. Verifica los datos e intenta nuevamente.';
            showErrorMessage('Error en el registro', errorMessage);
        } finally {
            setIsRegistering(false);
        }
    }


    const restringirCantidadDigitos = (e, criterioBusqueda) => {
        const digitos = e.target.value.replace(/\D/g, "");
        const limite = criterioBusqueda === 'ruc' ? 11 : 8;
        const mensaje = criterioBusqueda === 'ruc' ? 'El RUC debe tener 11 dígitos' : 'El DNI debe tener 8 dígitos';

        if (digitos.length > limite) {
            e.target.value = digitos.slice(0, limite);
        }
        if (digitos.length > limite) {
            if (criterioBusqueda === "dni") setDniError(mensaje);
            if (criterioBusqueda === "ruc") setRucError(mensaje);
            setTimeout(() => {
                if (criterioBusqueda === "dni") setDniError("");
                if (criterioBusqueda === "ruc") setRucError("");
            }, 2000);
        }
       
    };

    const handleBuscar = async () => {
        if (!busqueda) {
            alertPersonalizado("", "Por favor, ingresa un valor para buscar.");
            return;
        }

        const validaciones = {
            dni: { regex: /^\d{8}$/, mensaje: "El DNI debe tener 8 dígitos.", apiCall: findEmprendedorByDni },
            ruc: { regex: /^\d{11}$/, mensaje: "El RUC debe tener 11 dígitos.", apiCall: findEmprendedorByRuc }
        };

        const { regex, mensaje, apiCall } = validaciones[criterioBusqueda] || {};

        if (!regex || !regex.test(busqueda)) {
            alertPersonalizado('', mensaje);
            return;
        }

        try {
            const response = await apiCall(busqueda);
            const datos = response.data;
            setemprendedorId(datos.emprendedorId);
            setdisable(true);
            setValue('emprendedorRazonSocial', datos.emprendedorRazonSocial);
        } catch (error) {
            console.error("Error al buscar el emprendedor:", error);
            alertPersonalizado("", "No se encontró ningún emprendedor con los datos proporcionados.");
        }
    };

    return (
        <>
            {/* Buscar por RUC o DNI */}
            <div className="mb-4 flex items-center">
                <select
                    className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring focus:ring-indigo-500 mr-2"
                    value={criterioBusqueda}
                    onChange={(e) => setCriterioBusqueda(e.target.value)}
                >
                    <option value="ruc">RUC</option>
                    <option value="dni">DNI</option>
                </select>
                <input
                    type="text"
                    className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border rounded-md p-2 w-1/2 focus:outline-none focus:ring focus:ring-indigo-500 mr-2 placeholder-gray-500`}
                    placeholder={`Ingresa el ${criterioBusqueda}`}
                    readOnly={disable}
                    value={busqueda}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    onChange={(e) => {
                        restringirCantidadDigitos(e, criterioBusqueda)
                        setBusqueda(e.target.value)
                    }}
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleBuscar}
                >
                    Buscar
                </button>
            </div>
            <div className="text-center">
                {rucError && <span className="text-red-500 text-sm mt-1">{rucError}</span>}
                {dniError && <span className="text-red-500 text-sm mt-1">{dniError}</span>}
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="razonSocial" className="block text-sm font-medium text-black mb-1">
                        Razón Social
                    </label>
                    <input
                        type="text"
                        className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none focus:ring focus:ring-indigo-500`}
                        {...register('emprendedorRazonSocial', { required: true, maxLength: 150 })}
                        readOnly={disable} />
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
                            <td className="border text-black px-4 py-2">{emprendedor.id}</td>
                            <td className="border text-black px-4 py-2">{emprendedor.razonSocial}</td>
                            <td className="border  px-4 py-2 text-center">
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
                <button
                    type="button"
                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isRegistering ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleRegistrar}
                    disabled={isRegistering}
                >
                    {isRegistering ? 'Registrando...' : 'Registrar'}
                </button>
            </div>
        </>
    )
}

export default ParticipanteForm
