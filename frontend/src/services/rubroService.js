import axios from 'axios';

const rubroApi = axios.create({

    baseURL:'http://localhost:8080/rubro'

}) 

export const getAllRubro = () => rubroApi.get('')
  