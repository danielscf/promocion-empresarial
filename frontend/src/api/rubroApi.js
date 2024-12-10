import axios from 'axios'


const rubroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rubro',
  

}) 


export const getAllRubro = () => rubroApi.get('')
  