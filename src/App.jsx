import { useState } from "react";
import DepreciationData from "./Components/DepreciationData";
import { useDepreciationContext } from "./Contexts/DepreciationData";
import { depreciationMethods } from "./helpers/helpers";


export default function App(){
  const {actualMethod, setActualMethod, depreciationData} = useDepreciationContext();

  return(
    <div className="w-screen h-screen p-4 overflow-hidden bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="card text-bg-dark h-auto max-h-full overflow-hidden py-2">
          <div className="card-header">
            <div className="flex items-center gap-1 justify-center">
              <div className="card-title">
                  <h1 className="text-1xl fw-bold text-right">Cálculo da depreciação: </h1>
              </div>
              <div className="form-group">
              <select onChange={(e)=> setActualMethod(e.target.value)} className="form-select" name="" id="">
                {depreciationMethods.map((d, i)=>{
                  return (
                    <option key={i} value={i}>{d.name}</option>
                    )
                  })}
              </select>
                </div>
            </div>
          </div>
          <div className="card-body">
            {depreciationMethods[actualMethod].element}
          </div>
          <div className="card-footer">
            {depreciationData &&
            <DepreciationData />
            }
          </div>
      </div>
    </div>
  )
}