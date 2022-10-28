import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChamps } from "../services/champservice";
import Select from 'react-select'
import { getNoeudsByChamp, updateNoeud } from "../services/noeudservice";
import { AiFillEye, AiOutlineSubnode } from 'react-icons/ai'
import AssociateCultureModal from './modals/AssociateCultureModal'
import { GiTreeBranch } from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast'
import ModalContainer from 'react-modal-promise'

function States() {

    const [champs,setChamps] = useState([])
    const [curChamp,setCurChamp] = useState({})
    const navigate = useNavigate()
    const qk = ['get_Champs']
    const toast = useRef();
    const qc = useQueryClient()
    useQuery(qk, () => getChamps(), {
        onSuccess: (_) => {
            const newcl = _.map(c => ({value:c,label: c.nom}));
            setChamps(newcl);
        } 
    });

    const {mutate: getNoeuds, data: noeuds} = useMutation((id) => getNoeudsByChamp(id));

    const {mutate: update} = useMutation((data) => updateNoeud(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Noeud', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Noeud', detail: 'Mis à jour échouée !!'});
         }
  })

  const confChamp = (v) => {
    setCurChamp(v)
    getNoeuds(v.value._id);
  }
  const associateCulture = (d) => {
    AssociateCultureModal({noeud: d}).then((dt => {
        const {_id,...rest} = dt;
        update({_id,data: rest});
    }));
}

  const handleViewNoeud = (id) => navigate(`/dashboard/noeuds/${id}`);

  return (
    <>
     <div className="flex flex-wrap mt-6 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
              <h5 className="font-bold text-3xl">Statistiques</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/img/iot.png" alt="iot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="my-10 flex flex-col mx-10 items-center justify-center space-y-10">
  <h1 className="text-3xl font-bold uppercase">Selectionnez le champs</h1>
<div className="w-1/3 h-full">
  <Select
 options={champs}
 value={curChamp}
 onChange={(v) => confChamp(v)}
    />  
</div>
<div className="w-full my-5 mx-10 flex flex-wrap space-x-2">
    {noeuds?.map((n,i) => (
          <div key={i} className="w-full md:w-1/4 shadow-lg">
      <div className="flex flex-col justify-center items-center">
      <AiOutlineSubnode className="h-36 w-full bg-white text-green-600 rounded-full"/>
      <div className="text-lg font-bold my-2 flex items-center space-x-5">
      <div className="text-lg font-bold"> {n.nom}</div>
      <div className="flex items-center">
      <button onClick={() => handleViewNoeud(n._id)} className="inline-block px-6 py-2 font-bold text-center
      text-white uppercase align-middle transition-all rounded-lg cursor-pointer
      bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
      tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
      hover:shadow-soft-xs mr-2"> <AiFillEye className="h-6 w-6 text-white"/></button>
      <button onClick={() => associateCulture(n)} className="inline-block px-6 py-2 font-bold text-center
      text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
      from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
      bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"><GiTreeBranch  className="h-6 w-6 text-white"/></button>
      </div>
      </div>
      </div>
      </div> 
    )
    )}
</div>
</div>
  <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default States