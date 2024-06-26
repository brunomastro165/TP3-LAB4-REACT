import React from 'react'

const DondeEstamos = () => {
    return (
        <div className='pt-24 flex flex-col justify-center items-center h-screen overflow-hidden'>
            <h1 className='mb-24 text-xl font-bold'>Nuestras sucursales</h1>
            <div className='bg-white rounded-md shadow-xl'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4482425327956!2d-68.84314861194613!3d-32.88631510080801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1712956735292!5m2!1ses-419!2sar"
                    width="600" height="450"
                    loading="lazy" ></iframe>
            </div>
        </div>
    )
}

export default DondeEstamos