



import Button from "../../component/button";
import Card from "../../component/card";
import Form from "../../component/Form";
import Layout2 from "../../component/layout2";


export default function Dashboard() {


    const dataLofinFromLocal = sessionStorage.getItem('authdata');



    return (<>
        <Layout2 >
            {/* <Card></Card> */}
            <div className="text-white ">{dataLofinFromLocal}</div>

            <div><Button>hello</Button></div>
            <div>
                <div className="h-10"></div>
                <Form title="username" name="username" placeholder="@gamusl"></Form>
            </div>
        </Layout2>

    </>);
}

