import { useDepreciationContext } from "../../Contexts/DepreciationData"

export default function DepreciationData(){
    const {depreciationData} = useDepreciationContext();
    return (
        <div className="card text-bg-dark overflow-auto max-h-96">
            <div className="card-body">
            <table className="table table-dark table-bordered">
                <thead>
                <tr>
                    <th>Ano</th>
                    <th>Despesa de depreciação</th>
                    <th>Depreciação acumulada</th>
                    <th>Valor do bem</th>
                </tr>
                </thead>
                <tbody>
                {depreciationData.data.length > 0 && depreciationData.data.map(el =>{
                    return (
                    <tr key={el.ano}>
                        <td>{el.ano}</td>
                        <td>{el.valorDepreciacao}</td>
                        <td>{el.depreciacaoAcumulada}</td>
                        <td>{el.valorDoBem}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
    )
}