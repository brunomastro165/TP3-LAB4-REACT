import React from 'react'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { Instrumento } from '../../../entidades/Instrumentos';
import LoadingMessage from '../../LoadingMessage/LoadingMessage';
import { fetchAllData } from '../../../api/Fetch';

const ContainerCards = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllData();
            setInstrumentos(data);
            setIsDataFetched(true);
        }
        fetchData();
    }, [isDataFetched]);

    return (
        <div className='md:m-0  pt-24'>
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