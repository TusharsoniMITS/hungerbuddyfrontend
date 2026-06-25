import { useState } from "react";
import BatchInterface from "./BatchInterface";
import BatchDisplay from "./BatchDisplay";

export default function Batch(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <BatchInterface refresh={refresh} setRefresh={setRefresh}/>
        <BatchDisplay refresh={refresh} setRefresh={setRefresh}/>
        {/* <CategoyInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/> */}
    </div>)
}