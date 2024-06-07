import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { IPedido } from '../../entidades/IPedido';
import { getPedidos } from '../../api/Fetch';

// Componente de gráfico de barras
const BarChartComponent = () => {

    const [barData, setBarData] = useState<any>(null);
    
    const [barError, setBarError] = useState<string | null>(null);

    const fetchData = async (url, setData, setError) => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Hubo un fallo en la red');
          const data = await response.json();
          console.log("Datos del gráfico")
          console.log(data)
          if (!Array.isArray(data)) throw new Error('Formato inválido');
          
          const transformedData = data.map(item => ({
            name: `${item[1]}/${item[0]}`,  // mes/año
            cantidad: item[2]  // cantidad de pedidos
          }));
          
          setData(transformedData);
        } catch (error) {
          setError(error.message);
        }
      };
    
      useEffect(() => {
        fetchData('http://localhost:8080/pedidos/group-by-month-year', setBarData, setBarError);
      }, []);
    
      console.log(barData)

    // // Función para procesar los datos para el gráfico de barras
    // function processData(data: IPedido[]) {
    //     // Crear un objeto para almacenar los resultados
    //     const result: { [key: string]: number } = {};

    //     // Recorrer cada pedido
    //     data.forEach(pedido => {
    //         // Obtener el año y el mes del pedido
    //         const date = new Date(pedido.fecha);
    //         const year = date.getFullYear();
    //         const month = date.getMonth() + 1;

    //         // Crear la clave para el año y el mes
    //         const key = `${year}-${month}`;

    //         // Si la clave no existe en el resultado, inicializarla
    //         if (!result[key]) {
    //             result[key] = 0;
    //         }

    //         // Incrementar la cantidad de pedidos para el año y el mes
    //         result[key]++;
    //     });

    //     // Convertir el resultado a un array de objetos
    //     const arrayResult = Object.keys(result).map(key => ({ name: key, cantidad: result[key] }));

    //     // Ordenar el array de objetos por fecha de manera descendente
    //     arrayResult.sort((a, b) => {
    //         const dateA = new Date(a.name);
    //         const dateB = new Date(b.name);
    //         return dateB.getTime() - dateA.getTime();
    //     });

    //     return arrayResult;
    // }

    // // Aquí debes procesar tus datos para obtener la cantidad de pedidos por mes y año
    // const processedData = processData(pedidos);

    return (
        <div className='bg-black m-4 p-2 rounded-xl border-4'>
            <h1 className='text-white font-semibold text-xl text-center mb-4 m-4 p-2 rounded-xl'>Nuestras ventas por mes y año</h1>
            <BarChart width={500} height={300} data={barData} className=''>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent


