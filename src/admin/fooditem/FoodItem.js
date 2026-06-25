import { useState } from "react";
import FoodItemInterface from "./FoodItemInterface";
import FoodItemDisplay from "./FoodItemDisplay";

export default function FoodItem(){
    const [refresh,setRefresh]=useState(false)
    return(<div>
        <FoodItemInterface/>
        <FoodItemDisplay/>
    </div>)
}