import React, { FC, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Instrumento } from '../../entidades/Instrumentos';
import { postInstrumento } from '../../api/Fetch';
import { IFormInstrumento } from '../../entidades/IFormInstrumento';



const FormInstrumento: FC<IFormInstrumento> = ({ open, setOpen, values }) => {

    const ejemplo = async (instrumento) => {
        const response = await postInstrumento(instrumento);
    }

    const handleSubmit = (values: Instrumento) => {
        // Aquí puedes manejar la lógica de envío del formulario
        ejemplo(values);
    };


    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>

            <Form className='inset-0  flex items-center justify-center fixed p-5 bg-black bg-opacity-15 z-50 overflow-y-auto'>

                <div className='flex flex-col justify-center items-center text-center   mt-24 bg-white w-1/2'>


                    <div className=' flex flex-row space-x-4 self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="instrumento" className='text-start font-bold'>Instrumento:</label>
                            <Field id="instrumento" name="instrumento" placeholder={values.instrumento} className="p-2 outline-none border-b" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="marca" className='text-start font-bold'>Marca:</label>
                            <Field id="marca" name="marca" placeholder={values.marca} className="p-2 outline-none border-b" />
                        </div>
                    </div>



                    <div className=' flex flex-row space-x-4 self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="modelo" className='text-start font-bold'>Modelo:</label>
                            <Field id="modelo" name="modelo" placeholder={values.modelo} className="p-2 outline-none border-b" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="imagen" className='text-start font-bold'>Imagen:</label>
                            <Field id="imagen" name="imagen" placeholder={values.imagen} className="p-2 outline-none" />
                        </div>
                    </div>


                    <div className=' flex flex-row space-x-4 self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="precio" className='text-start font-bold'>Precio:</label>
                            <Field id="precio" name="precio" placeholder={values.precio} className="p-2 outline-none border-b" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="costoEnvio" className='text-start font-bold'>Costo Envío:</label>
                            <Field id="costoEnvio" name="costoEnvio" placeholder={values.costoEnvio} className="p-2 outline-none border-b " />
                        </div>
                    </div>


                    <div className=' flex flex-row space-x-4 self-center my-4'>

                        <div className='flex flex-col justify-start   '>
                            <label htmlFor="cantidadVendida" className='text-start font-bold'>Cantidad Vendida:</label>
                            <Field id="cantidadVendida" name="cantidadVendida" placeholder={values.cantidadVendida} className="p-2 outline-none border-b" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="descripcion" className='text-start font-bold'>Descripción:</label>
                            <Field id="descripcion" name="descripcion" placeholder={values.descripcion} className="p-2 outline-none border-b" />
                        </div>
                    </div>


                    <div className=' flex flex-row space-x-4 self-center my-4'>

                        <div className='flex flex-col justify-start   '>

                            <label htmlFor="activo">Activo:</label>
                            <Field id="activo" name="activo" type="checkbox" />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="categoria">Categoría:</label>
                            <Field as="select" id="categoria" name="categoria.denominacion">
                                <option value="cuerda">Cuerda</option>
                                <option value="viento">Viento</option>
                                <option value="percusión">Percusión</option>
                                <option value="teclado">Teclado</option>
                                <option value="electrónico">Electrónico</option>
                            </Field>


                        </div>
                    </div>

                    <div className='flex flex-row space-x-4'>
                        <button type="submit"
                            className='bg-green-600 p-5 rounded-md text-white font-bold active:scale-95 transition-all my-5'
                            onClick={() => {
                                setTimeout(() => {
                                    setOpen(false)
                                }, 500)
                            }} >
                            Enviar
                        </button>
                        <button className='bg-red-600 p-5 rounded-md text-white font-bold active:scale-95 transition-all my-5'
                            onClick={() => setOpen(false)}>
                            CERRAR
                        </button>
                    </div>
                </div>

            </Form>
        </Formik>
    );
};

export default FormInstrumento;