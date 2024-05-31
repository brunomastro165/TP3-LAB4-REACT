import { Field, Form, Formik } from 'formik';
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { downloadExcel } from '../../api/Fetch';


interface IExcelOptions {
    setExcel: Dispatch<SetStateAction<boolean>>
}

const ExcelOptions: FC<IExcelOptions> = ({ setExcel }) => {


    const [fechaInicio, setFechaInicio] = useState<string>('');

    const [fechaFin, setFechaFin] = useState<string>('');


    const handleSubmit = async (values) => {
        const { fechaInicio, fechaFin } = values;
        await downloadExcel('2020-1-1', '2024-12-12');
    }

    return (
        <div className='inset-0 bg-black w-full fixed flex  justify-center items-center z-50 bg-opacity-50'>
            <Formik className='bg-white flex flex-col justify-center items-center p-5 rounded-xl'
                initialValues={{ fechaInicio: '', fechaFin: '' }}
                onSubmit={handleSubmit}>
                <>
                    <button className='text-start btn' onClick={() => setExcel(false)}>X</button>
                    <Form className='flex flex-col'>
                        <Field name="fechaInicio" type="date" />
                        <Field name="fechaFin" type="date" />
                        <button type="submit">Descargar Excel</button>
                    </Form>
                </>
            </Formik>
        </div>
    )
}
export default ExcelOptions