import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import MyLayout from "../../component/mylayout";
import Button from "../../component/button";
import Form from "../../component/Form";

export default function Dashboard() {
    const context = useContext(AuthContext);

    const dataLofinFromLocal = sessionStorage.getItem('authdata');
    if (dataLofinFromLocal === null) {
        window.location.href = '/login';

    }





    return (<>
        <MyLayout >
            <div className="text-white">{dataLofinFromLocal}</div>


            <div><Button>hello</Button></div>


            <div>
                <div className="h-10"></div>
                <Form title="username" name="username" placeholder="@gamusl"></Form>
            </div>
        </MyLayout>

    </>);
}

