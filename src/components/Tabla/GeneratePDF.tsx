import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { FC, useEffect, useRef, useState } from "react";
import { Instrumento } from "../../entidades/Instrumentos";


const GeneratePDF: FC<Instrumento> = ({ activo, cantidadVendida, categoria, costoEnvio, descripcion, id, imagen, instrumento, marca, modelo, precio }) => {
  const pdfContentRef = useRef(null);

  const [mostrar, setMostrar] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMostrar(false)
    }, 5000);
  }, [mostrar])


  const generatePDF = async () => {

    console.log("sex")

    setTimeout(async() => {
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
        const imgWidth = 190;
        const imgHeight = 190;
        const pageHeight = 295;

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
      } catch (error) {
        console.error('Error al generar PDF:', error);
      }
    }, 1);
  };


  return (
    <div >

      {mostrar &&
        <div className=" p-4 fixed inset-0 flex justify-center items-center flex-col bg-black bg-opacity-40" ref={pdfContentRef}>
          <div className="bg-white p-5 rounded-xl">
            <p className="text-lg font-bold text-black">Activo: {activo}</p>
            <p className="text-lg text-black">Cantidad Vendida: {cantidadVendida}</p>
            <p className="text-lg text-black">Categoria: {categoria.denominacion}</p>
            <p className="text-lg text-black">Costo de Envío: {costoEnvio}</p>
            <p className="text-lg text-black">Descripción: {descripcion}</p>
            <p className="text-lg text-black">ID: {id}</p>
            <img src={imagen} alt="Imagen" className="w-32 h-32" />
            <p className="text-lg text-black">Instrumento: {instrumento}</p>
            <p className="text-lg text-black">Marca: {marca}</p>
            <p className="text-lg text-black">Modelo: {modelo}</p>
            <p className="text-lg text-black">Precio: {precio}</p>
          </div>
        </div>}

      <button onClick={() => { setMostrar(true), generatePDF() }} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Generate PDF
      </button>
    </div>
  );
};

export default GeneratePDF;