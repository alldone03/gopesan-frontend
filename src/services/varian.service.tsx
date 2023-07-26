import axios from "axios"


import { unauth } from "../pages/api";
import { AuthData } from "../store/models/authdata";
import qs from "qs";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})


export const GetAllMenu = async () => {
    const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
    );

    const response = await axios.get(import.meta.env.VITE_API_URL + "/menu", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token || ""}`,
        },
    }).catch((err) => {
        console.log(err);
        unauth(err);
    });
    return response?.data;
}

export const GetAllVarian = async () => {
    const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
    );
    const response = await axios.get(import.meta.env.VITE_API_URL + "/varian", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token || ""}`,
        },
    }).catch((err) => {
        console.log(err);
        unauth(err);
    });
    return response?.data;
}

export const StoreVarian = async (data: FormData) => {
    const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
    );
    const response = await axios.post(import.meta.env.VITE_API_URL + "/varian", data, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userData?.token || ""}`,
        },
    }).catch((err) => {
        console.log(err);
        unauth(err);
    });
    return response?.data;
}

export const UpdateVarian = async (id: number, data: any) => {
    const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
    );
    const response = await axios.put(import.meta.env.VITE_API_URL + "/varian/" + id, qs.stringify(data), {
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${userData.token}`
        },
    }).catch((err) => {
        console.log(err);
        unauth(err);
    });
    return response?.data;
}

export const DeleteVarian = async (id: number) => {
    const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
    );

    const response = axios.delete(import.meta.env.VITE_API_URL + `/varian/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    }).catch((err) => {
        console.log(err);
        unauth(err);
    });
    return response?.data;


}