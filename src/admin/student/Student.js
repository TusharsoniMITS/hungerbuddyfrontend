import { useState } from "react";

import StudentInteterface from "./StudentInterface";
import StudentDisplay from "./StudentDisplay";

export default function Student(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <StudentInteterface refresh={refresh} setRefresh={setRefresh}/>
        <StudentDisplay refresh={refresh} setRefresh={setRefresh}/>

        {/* <SectionInterface refresh={refresh} setRefresh={setRefresh}/>
        <SectionDisplay refresh={refresh} setRefresh={setRefresh}/> */}
        {/* <BatchInterface refresh={refresh} setRefresh={setRefresh}/>
        <BatchDisplay refresh={refresh} setRefresh={setRefresh}/> */}
        {/* <CategoyInterface refresh={refresh} setRefresh={setRefresh}/>
        <DisplayAll refresh={refresh} setRefresh={setRefresh}/> */}
    </div>)
}