import { useState } from "react";
import { useQuery } from "react-query";
import { getChamps } from "../services/champservice";
import Select from 'react-select'

function States() {

    const [champs,setChamps] = useState([])
    const [curChamp,setCurChamp] = useState({})
    const qk = ['get_Champs']

    useQuery(qk, () => getChamps(), {
        onSuccess: (_) => {
            const newcl = _.map(c => ({value:c,label: c.nom}));
            setChamps(newcl);
        } 
    });

    console.log(champs)

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
<div className="my-10 flex items-center justify-center">
<div className="w-full">
  <Select
 options={champs}
 value={curChamp}
 onChange={(v) => setCurChamp(v)}
    />  
</div>

</div>
    </>
  )
}

export default States