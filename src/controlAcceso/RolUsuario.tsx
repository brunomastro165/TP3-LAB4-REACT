import { Navigate, Outlet } from 'react-router-dom';
import { IRol } from '../entidades/IRol';
import { IUsuario } from '../entidades/IUsuario';
import { useState } from 'react';

interface Props {
    rol: IRol;
}

function RolUsuario({ rol }: Props) {

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: IUsuario = JSON.parse(jsonUsuario) as IUsuario;
    //si el usuario está loggeado y es además administrador, se deja pasar
    if ((usuarioLogueado && usuarioLogueado.rol === rol)) {
        return <Outlet />;
    } else if (usuarioLogueado) {
        return <Navigate replace to='/login' />;
    } else {
        return <Navigate replace to='/login' />;
    }

}
export default RolUsuario;