import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { IPedido } from '../../entidades/IPedido';
import { getPedidos } from '../../api/Fetch';

// Componente de gráfico de barras
const BarChartComponent = () => {

    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    useEffect(() => {

        const traerPedidos = async () => {
            const res = await getPedidos();
            setPedidos(res);
        }
        traerPedidos();

    }, [])

    console.log(pedidos)


    // Función para procesar los datos para el gráfico de barras
    function processData(data: IPedido[]) {
        // Crear un objeto para almacenar los resultados
        const result: { [key: string]: number } = {};

        // Recorrer cada pedido
        data.forEach(pedido => {
            // Obtener el año y el mes del pedido
            const date = new Date(pedido.fecha);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            // Crear la clave para el año y el mes
            const key = `${year}-${month}`;

            // Si la clave no existe en el resultado, inicializarla
            if (!result[key]) {
                result[key] = 0;
            }

            // Incrementar la cantidad de pedidos para el año y el mes
            result[key]++;
        });

        // Convertir el resultado a un array de objetos
        return Object.keys(result).map(key => ({ name: key, cantidad: result[key] }));
    }

    // Aquí debes procesar tus datos para obtener la cantidad de pedidos por mes y año
    const processedData = processData(pedidos);

    return (
        <BarChart width={500} height={300} data={processedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
    );
};

export default BarChartComponent


