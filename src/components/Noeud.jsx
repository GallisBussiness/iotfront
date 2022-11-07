import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getCapteursByNoeud } from "../services/capteurservice";
import CapteurDht11Data from "./CapteurDht11Data";
import CapteurPhData from "./CapteurPhData";

function Noeud() {
    const {id} = useParams()
    const qkc = ['get_capteurs_noeud', id]
    const {data: capteurs} = useQuery(qkc, () => getCapteursByNoeud(id))
  return (
    <>
    {capteurs?.map((cap,index) => (
      <div key={index}>
        {cap.type.nom === 'PH' ? <CapteurPhData capteur={cap}/> : cap.type.nom === 'DHT11' ? <CapteurDht11Data capteur={cap} /> : null}
      </div>
    ))}
    </>
  )
}

export default Noeud