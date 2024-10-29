import axios from 'axios';

const tipoContribuyenteApi = axios.create({

    baseURL:'http://localhost:8080/tipoContribuyente'

}) 

export const getAllTipoContribuyente = () => tipoContribuyenteApi.get('')
  