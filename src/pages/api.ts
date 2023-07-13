import axios from "axios";
import { AuthData } from "../store/models/authdata";

export const Upload = async (form: any) => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/auth/update/" + userData.user.id,
    form,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${userData.token}`,
      },
    }
  );
  return response.data;
};

export const dataToko = async () => {
  const userData: AuthData = JSON.parse(
    sessionStorage.getItem("authdata") as string
  );
  const response = await axios.get(import.meta.env.VITE_API_URL + "/namatoko", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  });
  console.log("response.data", response.data);

  return response.data;
};
