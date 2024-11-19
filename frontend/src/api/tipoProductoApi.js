import axios from 'axios'

const tipoProductoApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoProducto'

}) 

export const getAllTipoProducto = () => tipoProductoApi.get('')