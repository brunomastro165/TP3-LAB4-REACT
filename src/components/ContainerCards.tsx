import React from 'react'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { Instrumento } from '../entidades/Instrumentos';

const ContainerCards = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/data/instrumentos.json");
            const data = await response.json();
            setInstrumentos(data.instrumentos);
            setIsDataFetched(true);
        }
        fetchData();
    }, [isDataFetched]);

    return (
        <div className='md:m-0 m-5'>
        <div className='w-full h-auto flex flex-col justify-center items-center'>
            {instrumentos.map((instrumento: Instrumento) => (
                <CardItem
                    key={instrumento.id}
                    id={instrumento.id}
                    instrumento={instrumento.instrumento}
                    cantidadVendida={instrumento.cantidadVendida}
                    costoEnvio={instrumento.costoEnvio}
                    descripcion={instrumento.descripcion}
                    imagen={instrumento.imagen}
                    marca={instrumento.marca}
                    modelo={instrumento.modelo}
                    precio={instrumento.precio}
                />
            ))}
        </div>
        </div>
    )
}

export default ContainerCards