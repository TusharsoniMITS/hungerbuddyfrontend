import { useState } from "react";
import CategoyInterface from "./CategoryInterface";
import DisplayAll from "./DisplayAll";

export default function Category(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <CategoyInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/>
    </div>)
}