import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getCapteursByNoeud } from "../services/capteurservice";
import { getNoeud } from "../services/noeudservice";

function Noeud() {
    const {id} = useParams()
    const qkn = ['get_noeud', id];
    const qkc = ['get_capteurs_noeud', id]
    const {data: noeud} = useQuery(qkn, () => getNoeud(id))
    const {data: capteurs} = useQuery(qkc, () => getCapteursByNoeud(id))
  return (
    <>
    {JSON.stringify(capteurs)}
    </>
  )
}

export default Noeud