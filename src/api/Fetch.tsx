import { IPedido } from "../entidades/IPedido";
import { IUsuario } from "../entidades/IUsuario";
import { Instrumento } from "../entidades/Instrumentos";

//Llamada a la API del backend que trae todos los instrumentos
export const fetchAllData = async () => {
    const response = await fetch("http://localhost:8080/instrumentos/all");
    const data = await response.json();
    return data;
}

//Llamada a la API del backend que trae el instrumento que pido por ID
export const fetchDataById = async (id: number) => {
    const response = await fetch(`http://localhost:8080/instrumentos/${id}`);
    const data = await response.json();
    return data;
}

export const postInstrumento = async (instrumento: Instrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const postPedido = async (pedido: IPedido) => {
    const response = await fetch('http://localhost:8080/pedidos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response)
    return await response.json();
}

export const downloadExcel = async (fechaInicio: string, fechaFin: string) => {
    try {
        const response = await fetch(`http://localhost:8080/excel/export?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'pedidos.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the Excel file:', error);
    }
};


export const getPedidos = async () => {
    const response = await fetch('http://localhost:8080/pedidos/all');
    const data = await response.json();
    return data;
}

export const postUsuario = async (usuario: IUsuario) => {
    const response = await fetch('http://localhost:8080/usuarios/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const iniciarSesion = async (usuario: IUsuario) => {
    const response = await fetch('http://localhost:8080/usuarios/getUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const putInstrumento = async (instrumento: Instrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}


export const deleteInstrumento = async (instrumento: Instrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/delete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}


export async function createPreferenceMP(pedido?: IPedido) {
    console.log("ESTE ES EL PEDIDO")
    console.log(pedido)
    const urlServer = "http://localhost:8080/instrumentos/api/create_preference_mp";
    const method: string = "POST";
    const response = await fetch(urlServer, {
        method: method,
        body: JSON.stringify(pedido),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.id) {
        return data;
    } else {
        throw new Error('Error: Response is undefined or id is not present in the response');
    }
}



