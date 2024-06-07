import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { IPedido } from '../../entidades/IPedido';
import { fetchAllData, getPedidos } from '../../api/Fetch';
import { Instrumento } from '../../entidades/Instrumentos';


// Componente de gráfico de pastel
const PieChartComponent = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    const [pieData, setPieData] = useState<any>(null);

    const [pieError, setPieError] = useState<string | null>(null);

    const fetchData = async (url, setData, setError) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error('Invalid data format');

            const transformedData = data.map(item => ({
                name: item[0],  // instrument name
                value: item[1]  // quantity sold
            }));

            setData(transformedData);
        } catch (error) {
            setError(error.message);
        }
    };

    console.log(pieData)
    useEffect(() => {
        fetchData('http://localhost:8080/instrumentos/group-by-instrument', setPieData, setPieError);
    }, []);

    // Colores para cada segmento del gráfico de pastel
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className='bg-black m-4 p-2 rounded-xl border-4'>
            <h1 className='text-white font-semibold text-center text-xl mb-4 m-4 p-2 rounded-xl'>
                Nuestros instrumentos más vendidos
            </h1>
            <PieChart width={500} height={300}>
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>
            {pieError && <p className='text-red-500'>{pieError}</p>}
        </div>
    );
};

export default PieChartComponent;