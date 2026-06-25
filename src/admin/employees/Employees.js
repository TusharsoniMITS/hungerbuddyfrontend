import { useState } from "react";
import EmployeesInterface from "./EmployeesInterface";
import EmployeesDisplay from "./EmployeesDisplay";

export default function Employees(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <EmployeesInterface refresh={refresh} setRefresh={setRefresh}/>
        <EmployeesDisplay refresh={refresh} setRefresh={setRefresh}/>

        {/* <StudentInteterface refresh={refresh} setRefresh={setRefresh}/>
        <StudentDisplay refresh={refresh} setRefresh={setRefresh}/> */}

        {/* <SectionInterface refresh={refresh} setRefresh={setRefresh}/>
        <SectionDisplay refresh={refresh} setRefresh={setRefresh}/> */}
        {/* <BatchInterface refresh={refresh} setRefresh={setRefresh}/>
        <BatchDisplay refresh={refresh} setRefresh={setRefresh}/> */}
        {/* <CategoyInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/> */}
    </div>)
}