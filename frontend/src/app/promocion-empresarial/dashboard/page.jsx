'use client'

import React,{useState,useEffect} from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { getAllEvento } from "@/api/eventoApi";
import { getAllEmprendedores } from "@/api/emprendedorApi";

export default function DashboardPage() {

    const [emprendedores, setEmprendedores] = useState([])
    const [eventos, setEventos] = useState([])

    useEffect(() => {
      
        const fetchData = async() => {
 
            const resEvento = await getAllEvento()
            const resEmprendedor = await getAllEmprendedores()
            setEmprendedores(resEmprendedor.data)
            setEventos(resEvento.data)
        
        }
       fetchData()
      
    }, [])

    const filtroEmprendedores = emprendedores.filter(e => e.usuario.usuarioEstado === 2)
    
    // Datos para gráficos
    const eventosPorTipo = eventos.reduce((acc, evento) => {
        acc[evento.tipoEvento] = (acc[evento.tipoEvento] || 0) + 1;
        return acc;
    }, {});

    //console.log(eventosPorTipo)

    const today = new Date(); 
    const eventosFuturos = eventos.filter((evento) => {
        const eventoFechaInicio = new Date(evento.eventoFechaInicio); 
        return eventoFechaInicio >= today; 
    });

    const tiposEventoLabels = Object.keys(eventosPorTipo);
    const tiposEventoData = Object.values(eventosPorTipo);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

            {/* Indicadores Clave */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Emprendedores</h2>
                    <p className="text-2xl font-bold text-blue-600">
                        {filtroEmprendedores.length}
                    </p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Eventos</h2>
                    <p className="text-2xl font-bold text-green-600">{eventos.length}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Tipos de Eventos</h2>
                    <p className="text-2xl font-bold text-purple-600">
                        {tiposEventoLabels.length}
                    </p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Eventos por Tipo</h2>
                    <Pie
                        data={{
                            labels: tiposEventoLabels,
                            datasets: [
                                {
                                    data: tiposEventoData,
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                        "#4CAF50",
                                    ],
                                },
                            ],
                        }}
                    />
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Participaciones por Tipo de Evento</h2>
                    <Bar
                        data={{
                            labels: tiposEventoLabels, // Tipos de evento como Feria, Taller, etc.
                            datasets: [
                                {
                                    label: "Participaciones",
                                    data: tiposEventoLabels.map((tipo) =>
                                        eventos
                                            .filter((evento) => evento.tipoEvento === tipo)
                                            .reduce(
                                                (total, evento) => total + evento.participacionIds.length,
                                                0
                                            )
                                    ),
                                    backgroundColor: "#36A2EB",
                                },
                            ],
                        }}
                    />
                </div>

            </div>

             {/* Tabla de Eventos */}
             <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">Eventos Próximos</h2>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Lugar</th>
                            <th className="px-4 py-2">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosFuturos.map((evento) => (
                            <tr key={evento.eventoId} className="border-t">
                                <td className="px-4 py-2">{evento.eventoNombre}</td>
                                <td className="px-4 py-2">
                                    {evento.eventoFechaInicio} - {evento.eventoFechaFin}
                                </td>
                                <td className="px-4 py-2">{evento.eventoLugar}</td>
                                <td className="px-4 py-2">{evento.tipoEvento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
