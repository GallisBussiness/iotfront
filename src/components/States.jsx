import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getChamps } from "../services/champservice";
import Select from 'react-select'
import { getNoeudsByChamp } from "../services/noeudservice";

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { AiFillEye, AiOutlineSubnode } from "react-icons/ai";
import { GiTreeBranch } from "react-icons/gi";
 

function States() {

    const [champs,setChamps] = useState([])
    const [curChamp,setCurChamp] = useState({})
    const [layout, setLayout] = useState('grid');
    const qk = ['get_Champs']

    useQuery(qk, () => getChamps(), {
        onSuccess: (_) => {
            const newcl = _.map(c => ({value:c,label: c.nom}));
            setChamps(newcl);
        } 
    });

    const {mutate: getNoeuds, data: noeuds} = useMutation((id) => getNoeudsByChamp(id));

  const confChamp = (v) => {
    setCurChamp(v)
    getNoeuds(v.value._id);
  }

  const renderListItem = (data) => {
        return (
          <div className="w-full shadow-lg">
            <div className="flex flex-col justify-center items-center">
               <AiOutlineSubnode className="h-36 w-full bg-white text-green-600 rounded-full"/>
               <div className="text-lg font-bold my-2">
                {data.nom}
               </div>
               <div className="flex items-center">
                <button className="inline-block px-6 py-2 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> <AiFillEye className="h-6 w-6 text-white"/></button>
            <button className="inline-block px-6 py-2 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"><GiTreeBranch  className="h-6 w-6 text-white"/></button>
                </div>
               </div>
          </div>
        );
    }

    const renderGridItem = (data) => {
        return (
           <div className="w-full md:w-1/4 shadow-lg">
               <div className="flex flex-col justify-center items-center">
               <AiOutlineSubnode className="h-36 w-full bg-white text-green-600 rounded-full"/>
               <div className="text-lg font-bold my-2 flex items-center space-x-5">
                <div className="text-lg font-bold"> {data.nom}</div>
                <div className="flex items-center">
                <button className="inline-block px-6 py-2 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> <AiFillEye className="h-6 w-6 text-white"/></button>
            <button className="inline-block px-6 py-2 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"><GiTreeBranch  className="h-6 w-6 text-white"/></button>
                </div>
               </div>
               </div>
           </div>
        );
    }

    const itemTemplate = (n, layout) => {
        if (!n) {
            return;
        }

        if (layout === 'list')
            return renderListItem(n);
        else if (layout === 'grid')
            return renderGridItem(n);
    }

    const renderHeader = () => {
      return (
          <div className="grid grid-nogutter">
              <div className="col-6" style={{textAlign: 'right'}}>
                  <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
              </div>
          </div>
      );
  }

  const header = renderHeader();


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
<div className="my-10 flex flex-col mx-10 justify-center space-y-5">
  <h1 className="text-3xl font-bold uppercase">Selectionnez le champs</h1>
<div className="w-1/3 h-full">
  <Select
 options={champs}
 value={curChamp}
 onChange={(v) => confChamp(v)}
    />  
</div>

<div className="w-full">
            <div className="card">
                <DataView value={noeuds} layout={layout} header={header}
                        itemTemplate={itemTemplate} />
            </div>
        </div>
</div>
    </>
  )
}

export default States