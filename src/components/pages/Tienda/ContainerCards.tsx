import React from 'react'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { Instrumento } from '../../../entidades/Instrumentos';
import LoadingMessage from '../../LoadingMessage/LoadingMessage';
import { fetchAllData } from '../../../api/Fetch';

const ContainerCards = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllData();
                setInstrumentos(data);
                setIsDataFetched(true);
            } catch (error) {
                setIsDataFetched(true);
                setNotFound(true);
            }
        }
        fetchData();
    }, [isDataFetched]);

    return (
        <>
            <div className='md:m-0  pt-24 min-h-screen '>
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

            {notFound && <div className='flex flex-col justify-center items-center h-screen p-5 shadow-lg rounded-md'>
                <h1 className='text-2xl p-5 shadow-lg rounded-md'>No se encontraron instrumentos </h1>
            </div>}
        </>
    )
}

export default ContainerCards