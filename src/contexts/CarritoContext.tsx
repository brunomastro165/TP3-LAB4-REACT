import { ReactNode, createContext, useEffect, useState } from "react";
import { Instrumento } from "../entidades/Instrumentos";
import { IDetallePedido } from "../entidades/IDetallePedido";

interface CartContextType {
    carrito: IDetallePedido[],
    addCarrito: (product: IDetallePedido) => void,
    removeCarrito: (product: IDetallePedido) => void,
    removeItem: (product: IDetallePedido) => void,
    limpiarCarrito: () => void,
    update: boolean,
    switchUpdate: () => void,
}

export const CartContext = createContext<CartContextType>({
    carrito: [],
    addCarrito: () => { },
    removeCarrito: () => { },
    removeItem: () => { },
    limpiarCarrito: () => { },
    update: false,
    switchUpdate: () => { },
})

export function CarritoContextProvider({ children }: { children: ReactNode }) {


    const [update, setUpdate] = useState<boolean>(false);

    const switchUpdate = () => {
        setUpdate(!update);
    }

    const [carrito, setCarrito] = useState<IDetallePedido[]>(() => {
        const localData = localStorage.getItem('carrito');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const addCarrito = async (product: IDetallePedido) => {
        let existe: boolean = false;

        carrito.forEach(async (element: IDetallePedido) => {
            if (element.instrumento.id === product.instrumento.id) {
                existe = true;
                return existe;
            }
        });

        if (existe) {
            const CarritoClonado = structuredClone(carrito.filter(item => item.instrumento.id !== product.instrumento.id))
            CarritoClonado.push(product)
            setCarrito(CarritoClonado)
        }
        else {
            setCarrito(prevCart => [...prevCart, product])
        }

        console.log(carrito)
    }

    const removeCarrito = async (product: IDetallePedido) => {
        await setCarrito(prevCart => prevCart.filter(item => item.instrumento.id !== product.instrumento.id))
    }

    const removeItemCarrito = async (product: IDetallePedido) => {
        let existe: boolean = false;

        carrito.forEach(async (element: IDetallePedido) => {
            if (element.instrumento.id === product.instrumento.id) {
                existe = true;
                return existe;
            }
        });

        if (existe) {
            product.cantidad -= 1
            const CarritoClonado = structuredClone(carrito.filter(item => item.instrumento.id !== product.instrumento.id))
            CarritoClonado.push(product)
            setCarrito(CarritoClonado)
        }
        else {
            setCarrito(prevCart => prevCart.filter(item => item.instrumento.id !== product.instrumento.id))
        }
    }

    const limpiarCarrito = () => {
        setCarrito([])
    }


    return (
        <CartContext.Provider value={{ carrito, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, switchUpdate, update }}>
            {children}
        </CartContext.Provider>
    );

}