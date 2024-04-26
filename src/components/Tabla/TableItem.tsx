import React, { FC, useState } from 'react'
import { Instrumento } from '../../entidades/Instrumentos'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { deleteInstrumento, fetchDataById } from '../../api/Fetch';
import FormInstrumento from './Form';



const TableItem: FC<Instrumento> = ({ activo, cantidadVendida, categoria, costoEnvio, descripcion, id, imagen, instrumento, marca, modelo, precio }) => {


    const [open, setOpen] = useState<boolean>(false);

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
        activo: false,
        categoria: {
            denominacion: ''
        }
    });

    const openPUT = async () => {

        const PUTvalues = await fetchDataById(id);

        setFormValues(PUTvalues);

        setOpen(true);
    }

    const openDELETE = async () => {

        const DELETEvalues = await fetchDataById(id);
        await deleteInstrumento(DELETEvalues);
    }

    return (
        <>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xl">

                <td className="px-6 py-4">
                    {instrumento}
                </td>
                <td className="px-6 py-4">
                    {modelo}
                </td>
                <td className="px-6 py-4">
                    {categoria.denominacion}
                </td>
                <td className="px-6 py-4">
                    {precio}
                </td>
                <td className="px-6 py-4 flex flex-row items-center text-3xl space-x-4">
                    <MdOutlineModeEdit onClick={() => openPUT()} className='hover:text-blue-600' />
                    <MdDeleteOutline className='hover:text-red-600' onClick={() => openDELETE()} />
                </td>
            </tr>

            {open &&
                <div className='w-full h-full'>
                    <FormInstrumento open={open} setOpen={setOpen} values={formValues} />
                </div>}

        </>
    )
}

export default TableItem