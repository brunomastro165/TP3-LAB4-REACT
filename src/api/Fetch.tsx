import { IPedido } from "../entidades/IPedido";
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



