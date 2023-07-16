import axios from "axios";
import { AuthData } from "../store/models/authdata";

function unauth(error: any) {
  if (error.response.status == 401) {
    sessionStorage.clear();
    window.location.href = "/login";
  }
}

export const Upload = async (form: any) => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios
    .post(
      import.meta.env.VITE_API_URL + "/auth/update/" + userData.user.id,
      form,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",

          Authorization: `Bearer ${userData.token}`,
        },
      }
    )
    .catch((error) => {
      unauth(error);
    });

  return response.data;
};

export const dataToko = async () => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios
    .get(import.meta.env.VITE_API_URL + "/namatoko", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
    .catch((error) => {
      unauth(error);
    });

  return response.data;
};
export const jenisMakananAll = async () => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios
    .get(import.meta.env.VITE_API_URL + "/jenismakanan", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
    .catch((error) => {
      unauth(error);
    });

  return response.data;
};

export const menuAll = async () => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios
    .get(import.meta.env.VITE_API_URL + "/menu", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
    .catch((error) => {
      unauth(error);
    });

  return response.data;
};

export const AddMenu = async (form: FormData) => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios
    .post(import.meta.env.VITE_API_URL + "/menu", form, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
    .catch((error) => {
      unauth(error);
    });

  console.log(response.data);

  return response.data;
};
