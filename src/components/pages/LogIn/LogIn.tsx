import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { iniciarSesion, postUsuario } from '../../../api/Fetch';
import { IUsuario } from '../../../entidades/IUsuario';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineGppGood } from "react-icons/md";
import { useCarrito } from '../../../hooks/useCarrito';


const LogIn = () => {

  const [action, setAction] = useState<string>('');

  const [success, setSuccess] = useState<string>('');

  const [error, setError] = useState<boolean>(true);

  const navigate = useNavigate()

  const { limpiarCarrito, update, switchUpdate } = useCarrito()

  const validationSchema = Yup.object({
    nombreUsuario: Yup.string()
      .required('El nombre de usuario es requerido'),
    clave: Yup.string()
      .required('La clave es requerida'),
    rol: Yup.string()
      .required('El rol es requerido'),
  });

  useEffect(() => {
    switchUpdate()
    limpiarCarrito()
  }, [])

  const handleSubmit = async (values: IUsuario) => {
    if (action === 'registro') {
      try {
        const res = await postUsuario(values);
        limpiarCarrito()
        //Se guarda el usuario en el localStorage, para que en el resto del código se sepa si hay un usuario loggeado o no
        localStorage.setItem('usuario', JSON.stringify(res));
        setSuccess('Registrado')
        setTimeout(() => {
          switchUpdate()
          navigate("/")
        }, 1000);

      } catch (error) {
        setSuccess('Error al registrarse')
        console.error(error)
      }
    }
    else if (action === 'inicio') {
      try {
        const res = await iniciarSesion(values);
        limpiarCarrito()
        localStorage.setItem('usuario', JSON.stringify(res));
        localStorage.removeItem('carrito')
        setSuccess('Loggeado')
        setTimeout(() => {
          switchUpdate()
          navigate("/")
        }, 1000);
      } catch (error) {
        setSuccess('Error al loggearse')
        console.error(error)
      }

    }
  };

  return (

    <>
      <div className=''>LogOut</div>
      <div className='h-screen flex space-y-6 flex-col justify-center w-full items-center bg-slate-100'>
        <Formik
          initialValues={{ nombreUsuario: '', clave: '', rol: '', id: 0, activo: true }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col gap-4 rounded-sm w-1/3 py-16 px-4 border bg-white '>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold'>MUSICAL HENDRIX</h1>
              </div>
              <div className='flex flex-row w-full justify-center items-center space-x-2'>
                <label className="input input-bordered flex items-center w-full gap-2">
                  <Field type="text" name="nombreUsuario" placeholder="Nombre de Usuario" />
                </label>
                <label className="input input-bordered flex items-center w-full gap-2">
                  <Field type="password" name="clave" placeholder="Clave" />
                </label>
              </div>
              <Field as="select" id="rol" name="rol" className="select  select-bordered flex items-center gap-2">
                <option value="">Selecciona tu rol</option>
                <option value="administrador">Administrador</option>
                <option value="cliente">Cliente</option>
              </Field>
              <button type="submit" onClick={() => setAction("registro")} className='btn btn-primary'>
                Registrarse
              </button>
              <button className='btn btn-outline' type="submit" onClick={() => setAction("inicio")}>
                Iniciar sesión
              </button>

              {(errors.nombreUsuario || errors.clave || errors.rol) &&
                <h1 className='text-center'>Tienes errores en tu formulario</h1>
              }
            </Form>
          )}
        </Formik>

        <div className='card border'>
          {success === 'Registrado' ? (
            <div role="alert" className="alert alert-success">
              <FaRegCheckCircle className='text-3xl text-white' />
              <span className='text-white font-semibold'>Te has registrado correctamente</span>
            </div>
          )
            : success === 'Loggeado' ? (
              <div role="alert" className="alert alert-success">
                <FaRegCheckCircle className='text-3xl text-white' />
                <span className='text-white font-semibold'>Bienvenido de nuevo!</span>
              </div>
            ) : success === 'Error al registrarse' ? (
              <div role="alert" className="alert alert-error">
                <MdErrorOutline className='text-3xl text-white' />
                <span className='text-white font-semibold'>Ha habido un error en tu registro</span>
              </div>
            ) : success === 'Error al loggearse' ? (
              <div role="alert" className="alert alert-success">
                <MdErrorOutline className='text-3xl text-white' />
                <span className='text-white font-semibold'>Comprueba tu usuario y contraseña</span>
              </div>
            ) : (
              <div role="alert" className="alert alert-info">
                <MdOutlineGppGood className='text-3xl text-white' />
                <span className='text-white font-semibold'>Ingresa tus datos o registrate para poder continuar</span>
              </div>
            )}


        </div>
      </div>
    </>
  );
};

export default LogIn;