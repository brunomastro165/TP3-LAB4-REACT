import React, { useEffect, useState } from 'react'
import { deleteInstrumento, fetchAllData, fetchDataById, postInstrumento, putInstrumento } from '../../api/Fetch';
import { Instrumento } from '../../entidades/Instrumentos';
import TableItem from './TableItem';
import FormInstrumento from './Form';
import ExcelOptions from './ExcelOptions';


const Table = () => {

  const [data, setData] = useState<Instrumento[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);

  const [excel, setExcel] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<Instrumento>({
    id: 0,
    instrumento: '',
    marca: '',
    modelo: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    descripcion: '',
    activo: true,
    categoria: {
      denominacion: ''
    }
  });

  const openPUT = () => {
    setOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllData();
      setData(response)
      setLoading(false);
    }

    fetchData();
  }, [loading, open])

  return (
    <>
      <div className='w-full flex justify-center items-center text-end fixed z-50  ' onClick={() => { openPUT() }}>

        <button className='p-3 rounded-md bg-green-600 active:scale-95 transition-all text-white text-2xl'>Agregar</button>
      </div>
      <div className="relative overflow-x-auto   cursor-pointer m-5  p-2 border rounded-lg shadow mt-24 h-1/2" >

        <table className="w-full text-sm text-left rtl:text-right text-gray-500  rounded-xl overflow-y-auto ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Instrumento
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>

            {data.map((i: Instrumento) => (
              <TableItem activo={i.activo}
                cantidadVendida={i.cantidadVendida}
                categoria={i.categoria}
                costoEnvio={i.costoEnvio}
                descripcion={i.descripcion}
                id={i.id}
                imagen={i.imagen}
                instrumento={i.instrumento}
                marca={i.marca}
                modelo={i.modelo}
                precio={i.precio}
                key={i.id} />
            ))}


          </tbody>
        </table>
      </div>

      <button className='p-4 btn btn-success text-white ml-4' onClick={() => setExcel(true)}>Generar excel de pedidos</button>

      {open && <FormInstrumento open={open} setOpen={setOpen} values={formValues} />}

      {excel && <ExcelOptions setExcel={setExcel}/>}
    </>
  )
}

export default Table