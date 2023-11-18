import { createContext, useContext, useState } from "react";
import { depreciationMethods } from "../helpers/helpers";

export const DepreciationData = createContext();

export const DepreciationDataProvider = ({children})=>{
    const [depreciationData, setDepreciationData] = useState(null);
    const [actualMethod, setActualMethod] = useState(0);
    const calcularDepreciacao = (data, reset)=>{
        const calcDepreciation = depreciationMethods[actualMethod]
        if(calcDepreciation){
        try{
            setDepreciationData(calcDepreciation.calc(data));
        }catch(err){
            setDepreciationData(null);
            reset()
            alert(err)
        }
        }
    }
    return(
        <DepreciationData.Provider value={{depreciationData,actualMethod,setDepreciationData,setActualMethod, calcularDepreciacao}}>
            {children}
        </DepreciationData.Provider>
    )
}

export const useDepreciationContext = ()=> useContext(DepreciationData);