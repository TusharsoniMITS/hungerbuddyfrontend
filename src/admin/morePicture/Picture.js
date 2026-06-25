import { useState } from "react";
import PictureInterface from "./PictureInterface";
import PictureDisplay from "./PictureDisplay";

export default function Picture(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <PictureInterface refresh={refresh} setRefresh={setRefresh}/>
        <PictureDisplay refresh={refresh} setRefresh={setRefresh}/>
    </div>)
}