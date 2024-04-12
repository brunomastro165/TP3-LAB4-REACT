import React from 'react'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { Instrumento } from '../entidades/Instrumentos';
import LoadingMessage from './LoadingMessage/LoadingMessage';

const ContainerCards = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/instrumentos/all");
            const data = await response.json();

            //Le puse esto porque sino carga tan rápido que no se ve la pantallita de carga
            setTimeout(() => {
                setInstrumentos(data);
                setIsDataFetched(true);
            }, 1000);
        }
        fetchData();
    }, [isDataFetched]);

    return (
        <div className='md:m-0 m-5 pt-24'>
            <div className='w-full h-auto flex flex-col justify-center items-center'>

                {isDataFetched ? (
                    <>{instrumentos.map((instrumento: Instrumento) => (
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
                    ))}</>
                ) : (
                    <>
                        <LoadingMessage />
                    </>
                )}

            </div>
        </div>
    )
}

export default ContainerCards