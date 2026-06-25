import { useState } from "react";
import SectionInterface from "./SectionInterface";
import SectionDisplay from "./SectionDisplay";

export default function Section(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <SectionInterface refresh={refresh} setRefresh={setRefresh}/>
        <SectionDisplay refresh={refresh} setRefresh={setRefresh}/>
        {/* <BatchInterface refresh={refresh} setRefresh={setRefresh}/>
        <BatchDisplay refresh={refresh} setRefresh={setRefresh}/> */}
        {/* <CategoyInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/> */}
    </div>)
}