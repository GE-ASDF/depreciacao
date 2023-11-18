import Crescentes from "../Components/Crescentes";

export const createYears = (maxLife)=> [...Array(Number(maxLife)).keys()].map(year => year + 1)

export const convertCurrency = (num, locale = 'pt-br', currency = 'BRL')=>{
    return num.toLocaleString(locale, {style:"currency", currency})
}
export const sumMaxLife  = (years)=> years.reduce((acc, i) => acc + i, 0)

export const depreciationMethods = [
    {
      name: "Método das quotas crescentes",
      element:<Crescentes />,
      calc:({maxLife, bookValue, residualValue})=>{
        const years = createYears(maxLife);
        let depreciacaoAcumulada = 0;
        const data = years.map(year =>{
          const valorDepreciacao = ((bookValue - residualValue) / maxLife)
          depreciacaoAcumulada += valorDepreciacao
          return {
            ano: year,
            valorDepreciacao:convertCurrency(valorDepreciacao),
            depreciacaoAcumulada: convertCurrency(depreciacaoAcumulada),
            valorDoBem: convertCurrency(bookValue - depreciacaoAcumulada),
          }
        })
        const metadata = {bookValue:convertCurrency(bookValue), maxLife, residualValue:convertCurrency(residualValue)};
        let result = {data, metadata};
        return result;
      }
    },
    {
        name:"Método das quotas decrescentes",
        element:<Crescentes />,
        calc:({maxLife, bookValue, residualValue})=>{
            const years = createYears(maxLife);
            const sumMaxLifeReduced = sumMaxLife(years)
            const reversedYears =  years.slice().reverse();
            let depreciacaoAcumulada = 0;
            const valorDepreciavel = bookValue - residualValue;
            const data = years.map(year =>{
            const indice = (reversedYears[years.indexOf(year)] / sumMaxLifeReduced);
            const valorDepreciacao = valorDepreciavel * indice
            depreciacaoAcumulada += valorDepreciacao
            return {
              ano: year,
              valorDepreciacao:convertCurrency(valorDepreciacao),
              depreciacaoAcumulada: convertCurrency(depreciacaoAcumulada),
              valorDoBem: convertCurrency(bookValue - depreciacaoAcumulada),
            }
          })
          const metadata = {bookValue:convertCurrency(bookValue), maxLife, residualValue:convertCurrency(residualValue)};
          let result = {data, metadata};
          return result;
        }
    }
  ];