import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export default function Dashboard() {
    const context = useContext(AuthContext);


    return (<>{context.authdata.user.email}</>);
}

