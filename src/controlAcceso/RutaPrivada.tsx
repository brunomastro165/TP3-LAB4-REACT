import { ReactNode, useState } from "react";
import { IUsuario } from "../entidades/IUsuario";
import { Navigate } from "react-router-dom";

export const RutaPrivada = ({ children }: { children: ReactNode }) => {

    //Reviso si hay un usuario loggeado en el sistema
    const [usuario, setUsuario] = useState<IUsuario>(localStorage.getItem('usuario') as unknown as IUsuario);


    //Si hay un usuario loggeado, entonces lo dejo pasar, sino, vuelve al inicio de la aplicación
    return usuario ? children : <Navigate to='/login' />;
};