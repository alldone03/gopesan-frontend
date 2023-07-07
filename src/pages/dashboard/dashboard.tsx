import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import MyLayout from "../../component/mylayout";

export default function Dashboard() {
    const context = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {

        if (context.authdata.user.email === '') {
            navigate('/login');
        }
    })


    return (<>
        <MyLayout >
            <div>hello</div>
        </MyLayout>

    </>);
}

