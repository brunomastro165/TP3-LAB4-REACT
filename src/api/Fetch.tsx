
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


