import axios from 'axios'


const rolApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rol',
   

}) 



export const getAllRol = () => rolApi.get('')
  