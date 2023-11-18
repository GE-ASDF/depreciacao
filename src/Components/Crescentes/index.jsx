import {useForm, Controller} from "react-hook-form";
import {useDepreciationContext} from "../../Contexts/DepreciationData";
import {NumericFormat} from "react-number-format";
import { convertCurrency } from "../../helpers/helpers";

export default function Crescentes(){
    const {handleSubmit, reset, getValues, register, formState:{errors}} = useForm();
    const {setDepreciationData,calcularDepreciacao} = useDepreciationContext()
    
    const calc = ()=>{
        calcularDepreciacao(getValues(), reset)
    }
    console.log(getValues())
 
    return (
        <form onSubmit={handleSubmit(calc)}>
            <div className="form-group d-flex gap-3">
                <div className="form-group flex-1">
                <label htmlFor="">Vida útil do bem</label>
                <input type="text" defaultValue='1' {...register('maxLife',  {required:"Campo obrigatório", pattern:{value:/^\d+$/, message:"Deve ser um inteiro positivo."}})} placeholder="Digite a vida útil em anos" className="form-control" />
                <small>{errors.maxLife && errors.maxLife.message}</small>   
                </div>
                <div className="form-group flex-1">
                <label htmlFor="">Valor residual:</label>
                <input type="text"  defaultValue='0' {...register('residualValue',  {pattern:{value:/^\d*\.?\d+$/, message:"O valor residual deve ser um número positivo."}})} 
                    placeholder="Digite o valor residual" className="form-control" />
                <small>{errors.residualValue && errors.residualValue.message}</small>
                </div>
            </div>
            <div className="form-group flex-1">
            <label htmlFor="">Valor contábil do bem:</label>
                <input 
                type="text"  defaultValue='' {...register('bookValue',  {required:"Campo obrigatório", pattern:{value:/^\d*\.?\d+$/, message:"O valor contábil deve ser um número positivo."}})} 
                placeholder="Digite o valor contábil do bem" className="form-control" />
                <small>{errors.bookValue && errors.bookValue.message}</small>
            </div>   
            <div className="form-group mt-3 flex gap-2 justify-start align-center">
                <button className="btn btn-primary btn-sm">Calcular</button>
                <span onClick={()=> setDepreciationData(null)} className="btn  btn-danger">Resetar</span>
            </div>
           
        </form>
    )
}