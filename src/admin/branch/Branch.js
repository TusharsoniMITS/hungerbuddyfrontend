import { useState } from "react";
import BranchInterface from "./BranchInterface";
import BranchDisplay from "./BranchDisplay";

export default function Branch(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <BranchInterface refresh={refresh} setRefresh={setRefresh}/>
        <BranchDisplay efresh={refresh} setRefresh={setRefresh}/>
    </div>)
}