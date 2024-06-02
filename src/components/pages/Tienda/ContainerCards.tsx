import React from 'react'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { Instrumento } from '../../../entidades/Instrumentos';
import LoadingMessage from '../../LoadingMessage/LoadingMessage';
import { fetchAllData } from '../../../api/Fetch';

const ContainerCards = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    const [instrumentosFiltrados, setInstrumentosFiltrados] = useState<Instrumento[]>(instrumentos);

    const [filtro, setFiltro] = useState<string>('Todos');

    const [isDataFetched, setIsDataFetched] = useState(false);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllData();
                setInstrumentos(data);
                setInstrumentosFiltrados(data)
                setIsDataFetched(true);
            } catch (error) {
                setIsDataFetched(true);
                setNotFound(true);
            }
        }
        fetchData();
    }, [isDataFetched]);


    useEffect(() => {

        if (filtro === 'Todos') {
            setInstrumentosFiltrados(instrumentos)
        }
        else {
            const filter: Instrumento[] = instrumentos.filter((instrumento) => instrumento.categoria.denominacion === filtro)
            setInstrumentosFiltrados(filter)
        }

    }, [filtro])

    

    return (
        <>
            <div className='md:m-0  pt-24 min-h-screen '>

                <div className="dropdown fixed m-4">
                    <div tabIndex={0} role="button" className="btn bg-blue-600 hover:bg-blue-700 text-white">Categorías</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu  mt-2 shadow bg-blue-600 rounded-box text-white w-52">
                        <li onClick={() => setFiltro('Todos')}><a>Todos</a></li>
                        <li onClick={() => setFiltro('cuerda')}><a>Cuerda</a></li>
                        <li onClick={() => setFiltro('viento')}><a>Viento</a></li>
                        <li onClick={() => setFiltro('percusión')}><a>Percusión</a></li>
                        <li onClick={() => setFiltro('teclado')}><a>Teclado</a></li>
                        <li onClick={() => setFiltro('electrónico')}><a>Electrónico</a></li>
                    </ul>
                </div>

                <div className='w-full h-auto flex flex-col justify-center items-center'>

                    {isDataFetched ? (
                        <>{instrumentosFiltrados.map((instrumento: Instrumento) => (
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
                                activo={instrumento.activo}
                                categoria={instrumento.categoria}
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