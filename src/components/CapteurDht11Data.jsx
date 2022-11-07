import { useQuery } from "react-query"
import { getCapteurData } from "../services/dht11"

function CapteurDht11Data({capteur}) {

    const key = ['getData',capteur._id]
    const {data} = useQuery(key, () => getCapteurData(capteur._id))
    const PhTemplate = (c) => (
     <>
       <div className="h-60 w-72 flex items-center justify-center bg-slate-800 text-white text-xl">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-white">Température : {c.temperature}</h1>
            <h1 className="text-white">Humidité : {c.humidite}</h1>
        </div>
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

export default CapteurDht11Data