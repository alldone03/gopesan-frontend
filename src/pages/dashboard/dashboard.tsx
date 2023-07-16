import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import MyLayout from "../../component/mylayout";

export default function Dashboard() {
    const context = useContext(AuthContext);

    const dataLofinFromLocal = sessionStorage.getItem('authdata');
    if (dataLofinFromLocal === null) {
        window.location.href = '/login';

    }





    return (<>
        <MyLayout >
            <div className="text-white">{dataLofinFromLocal}</div>
        </MyLayout>

    </>);
}

