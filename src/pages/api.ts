import axios from "axios"
import { AuthData } from "../store/models/authdata";





export const Upload = async (form:any) => {
    const userData: AuthData = JSON.parse(localStorage.getItem('authdata') as string);
const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/update/"+userData.user.id, form,{headers:{
    'Accept': 'application/json',
          "Content-Type": "multipart/form-data",
          
        'Authorization': `Bearer ${userData.token}`
        }});
return response.data;
}