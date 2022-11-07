import { useQuery } from "react-query"
import { getCapteurData } from "../services/dht11"

function CapteurPhData({capteur}) {
    const key = ['getData',capteur._id]
    const {data} = useQuery(key, () => getCapteurData(capteur._id))
    const PhTemplate = (c) => (
     <>
       <div className="h-60 w-60 flex items-center justify-center bg-slate-800 text-white text-2xl">
         {c.valeur}
       </div>
     </>
    );


  return (
    <>
    <div className="my-20 mx-10">
       <h1 className="text-3xl font-bold uppercase">Données PH du Capteur {capteur?.nom}</h1>
        {data && PhTemplate(data[data.length - 1])}
    </div>
        </>
  )
}

export default CapteurPhData