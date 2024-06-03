import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { FC, useEffect, useRef, useState } from "react";
import { Instrumento } from "../../entidades/Instrumentos";
import { FaRegFilePdf } from "react-icons/fa6";

const GeneratePDF: FC<Instrumento> = ({ activo, cantidadVendida, categoria, costoEnvio, descripcion, id, imagen, instrumento, marca, modelo, precio }) => {
  const pdfContentRef = useRef(null);

  const [mostrar, setMostrar] = useState<boolean>(false);

  useEffect(() => {
    if (mostrar) {
      generatePDF();
    }
  }, [mostrar]);

  const generatePDF = async () => {

    console.log("sex")


    const element = pdfContentRef.current;

    if (!element) {
      console.error('Element not found!');
      return;
    }

    try {

      // Generar el canvas usando html2canvas
      const canvas = await html2canvas(element, { scale: 2 });

      // Convertir el canvas a una URL de datos JPEG
      const imgData = canvas.toDataURL('image/jpeg');

      // Iniciar un nuevo documento PDF
      const pdf = new jsPDF();

      // Configurar dimensiones de imagen y página
      const imgWidth = 200;
      const imgHeight = 200;
      const pageHeight = 1000;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Si la imagen es más alta que la página, añadir una nueva página
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Guardar el PDF
      pdf.save('Instrumento.pdf');

      console.log('PDF generado exitosamente.');
      setMostrar(false)
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setMostrar(false)
    }

  };

  function envio() {
    if (costoEnvio === "0") {
      return <h3 className='text-green-500 flex justify-start flex-row'><img src="/assets/img/camion.png" />Envío gratis a todo el país</h3>
    }
    else {
      return <h3 className='text-orange-500'>Costo de envío ${costoEnvio}</h3>
    }
  }

  return (
    <div >

      {mostrar &&
        <div className=" fixed inset-0 opacity-0 flex justify-center items-center flex-col bg-black bg-opacity-40" >
          <div
            className='overflow-y-scroll md:overflow-hidden flex w-full xl:w-2/3 flex-col justify-center md:justify-center items-center h-auto border-b m-2 p-5 mt-24 overflow-hidden bg-white'
            ref={pdfContentRef}
          >
            <div className='flex w-full flex-col  justify-center items-center '>
              {/* <div className='flex  w-full shadow-black  mx-8'>
                <img src={imagen}
                  className=' h-48 w-96 rounded-xl' />
              </div> */}

              <div className=' space-y-2 w-full '>
                <h1 className='font-normal text-xl md:text-2xl'>{instrumento}</h1>
                <h3 className='text-gray-900 font-semibold'>Lo que tenés que saber sobre este producto</h3>
                <h3 className='text-blue-500 font-bold'>Marca: <span className='text-gray-900 font-normal'>{marca}</span></h3>
                <h3 className='text-blue-500 font-bold'>Modelo: <span className='text-gray-900 font-normal'>{modelo}</span></h3>
                <h3 className='text-gray-900 font-bold w-full'>Descripcion: <span className='text-gray-900 font-normal '>{descripcion}</span></h3>
              </div>


              <div className='border p-5 rounded-md space-y-2 w-full shadow-md m-12 transition-all duration-700'>
                <h3>{envio()}</h3>
                <h2 className='font-semibold text-lg text-blue-600'>Stock disponible</h2>
                <h2 className='text-xl  font-light md:text-3xl'>${precio}</h2>
                <h2>Disponible en <span className='text-blue-600'>12</span> cuotas</h2>
              </div>
            </div>
          </div>
        </div>}

      <button onClick={() => { setMostrar(true) }} className=" text-gray-500 hover:text-red-600 transition-all ">
        <FaRegFilePdf />
      </button>
    </div>
  );
};

export default GeneratePDF;