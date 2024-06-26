import React, { FC, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Instrumento } from '../../entidades/Instrumentos';
import { postInstrumento } from '../../api/Fetch';
import { IFormInstrumento } from '../../entidades/IFormInstrumento';



const FormInstrumento: FC<IFormInstrumento> = ({ open, setOpen, values }) => {

    const enviar = async (instrumento: Instrumento) => {
        const response = await postInstrumento(instrumento);
    }

    const handleSubmit = async (values: Instrumento) => {
        await enviar(values);
        setOpen(false);
    };

    console.log(values)

    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>

            <Form className='inset-0  flex items-center justify-center fixed p-5 bg-black bg-opacity-15 z-50 overflow-y-auto'>

                <div className='flex flex-col justify-center items-center text-center  mt-40 rounded-xl bg-white w-1/2 shadow-xl p-5'>

                    <h1 className='text-2xl'>Agrega tu instrumento:</h1>

                    <div className=' flex flex-col w-full md:flex-row md:space-x-4 p-5 self-center my-4'>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="instrumento" className='text-start '>Instrumento:</label>
                            <Field id="instrumento" required type="text" name="instrumento" placeholder={values.instrumento} className="p-2 outline-none border-b focus:border-b-black transition-all" />
                        </div>

                        <div className='flex w-full flex-col '>
                            <label htmlFor="marca" className='text-start'>Marca:</label>
                            <Field id="marca" name="marca" type="text" required placeholder={values.marca} className="p-2 outline-none border-b transition-all focus:border-b-black " />
                        </div>
                    </div>


                    <div className=' flex flex-col w-full md:flex-row md:space-x-4 p-5  self-center my-4'>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="modelo" className='text-start '>Modelo:</label>
                            <Field id="modelo" name="modelo" type="text" required placeholder={values.modelo} className="p-2 outline-none border-b focus:border-b-black transition-all" />
                        </div>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="imagen" className='text-start '>Imagen:</label>
                            <Field id="imagen" name="imagen" type="text" required placeholder="URL DE LA IMAGEN" className="p-2 outline-none focus:border-b-black transition-all" />
                        </div>
                    </div>


                    <div className=' flex flex-col w-full md:flex-row md:space-x-4 p-5  self-center my-4'>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="precio" className='text-start '>Precio:</label>
                            <Field id="precio" name="precio" type="number" required placeholder={values.precio} className="p-2 outline-none border-b focus:border-b-black transition-all" />
                        </div>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="costoEnvio" className='text-start'>Costo Envío:</label>
                            <Field id="costoEnvio" name="costoEnvio" type="number" required placeholder={values.costoEnvio} className="p-2 outline-none border-b focus:border-b-black transition-all" />
                        </div>
                    </div>


                    <div className=' flex flex-col w-full md:flex-row md:space-x-4 p-5  self-center my-4'>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="cantidadVendida" className='text-start'>Cantidad Vendida:</label>
                            <Field id="cantidadVendida" name="cantidadVendida" required type="number" placeholder={values.cantidadVendida} className="p-2 outline-none border-b focus:border-b-black transition-all " />
                        </div>

                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="descripcion" className='text-start '>Descripción:</label>
                            <Field id="descripcion" name="descripcion" type="text" required placeholder={values.descripcion} className="p-2 outline-none border-b focus:border-b-black transition-all" />
                        </div>
                    </div>


                    <div className=' flex flex-col w-full md:flex-row md:space-x-4 p-5  self-center my-4'>



                        <div className='flex flex-col w-full justify-start   '>
                            <label htmlFor="categoria" className='text-xl'>Categoría:</label>
                            <Field as="select" id="categoria" name="categoria.denominacion" className="p-2 select mt-2   transition-all rounded ">
                                <option value="">Opciones</option>
                                <option value="cuerda">Cuerda</option>
                                <option value="viento">Viento</option>
                                <option value="percusión">Percusión</option>
                                <option value="teclado">Teclado</option>
                                <option value="electrónico">Electrónico</option>
                            </Field>


                        </div>
                    </div>

                    <div className='flex flex-row space-x-4 mt-5'>
                        <button type="submit"
                            className='bg-green-600 hover:bg-green-500 rounded-md text-white font-bold active:scale-95 transition-all  btn btn-wide' >
                            Enviar
                        </button>
                        <button className='bg-red-600 hover:bg-red-500 rounded-md text-white font-bold active:scale-95 transition-all btn btn-wide'
                            onClick={() => setOpen(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>

            </Form>
        </Formik>
    );
};

export default FormInstrumento;