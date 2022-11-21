import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getCapteursByNoeud } from "../services/capteurservice";
import CapteurDht11Data from "./CapteurDht11Data";
import CapteurPhData from "./CapteurPhData";
import CapteurHfeuillesData from "./CapteurHfeuillesData";
import CapteurHsolData from "./CapteurHsolData";


function Noeud() {
    const {id} = useParams()
    const qkc = ['get_capteurs_noeud', id]
    const {data: capteurs} = useQuery(qkc, () => getCapteursByNoeud(id))
  return (
    <>
    <div className="flex items-center justify-between">
    {capteurs?.map((cap,index) => (
      <div key={index}>
      <div className="w-full">
        {cap.type.nom === 'PH' ? <CapteurPhData capteur={cap}/> :  cap.type.nom === 'HSOL' ? <CapteurHsolData capteur={cap} /> : cap.type.nom === 'HFEUILLES' ? <CapteurHfeuillesData capteur={cap} /> : null}
      </div>
      </div>
    ))}
      
    </div>
    <div className="my-6">
    {capteurs?.map((cap,index) => (
      <div key={index}>
      <div className="w-full">
        {cap.type.nom === 'DHT11' &&  <CapteurDht11Data capteur={cap} />}
      </div>
      </div>
    ))}
    </div>
    </>
  )
}

export default Noeud