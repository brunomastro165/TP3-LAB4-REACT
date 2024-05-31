import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { IPedido } from '../../entidades/IPedido';
import { fetchAllData, getPedidos } from '../../api/Fetch';
import { Instrumento } from '../../entidades/Instrumentos';


// Componente de gráfico de pastel
const PieChartComponent = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        const traerInstrumentos = async () => {
            const res = await fetchAllData();
            setInstrumentos(res);
        };
        traerInstrumentos();
    }, []);

    // Función para procesar los datos para el gráfico de pastel
    // Función para procesar los datos para el gráfico de barras
    function processData(data: Instrumento[]) {
        // Crear un objeto para almacenar los resultados
        const result: { [key: string]: number } = {};

        // Recorrer cada instrumento
        data.forEach(instrumento => {
            // Si el instrumento no existe en el resultado, inicializarlo
            if (!result[instrumento.instrumento]) {
                result[instrumento.instrumento] = 0;
            }

            // Incrementar la cantidad vendida para el instrumento
            result[instrumento.instrumento] += instrumento.cantidadVendida;
        });

        // Convertir el resultado a un array de objetos
        const arrayResult = Object.keys(result).map(key => ({ name: key, cantidad: Number(result[key]) }));

        return arrayResult;
    }
    const processedData = processData(instrumentos);

    // Colores para cada segmento del gráfico de pastel
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    console.log(processedData)
    return (
        <div className='bg-black m-4 p-2 rounded-xl border-4'>
            <h1 className='text-white font-semibold text-center text-xl mb-4 m-4 p-2 rounded-xl'>Nuestros instrumentos más vendidos</h1>
            <PieChart width={500} height={300}>
                <Pie
                    data={processedData}
                    cx={250}
                    cy={150}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="cantidad"
                >
                    {
                        processedData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;