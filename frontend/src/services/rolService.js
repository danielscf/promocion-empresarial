import axios from 'axios';

const rolApi = axios.create({

    baseURL:'http://localhost:8080/rol'

}) 

export const getAllRol = () => rolApi.get('')
  