import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select'

import { create } from 'react-modal-promise'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getNoeuds } from '../../services/noeudservice';
import { getTypes } from '../../services/typeservice';


const schema = yup.object({
  nom: yup.string()
  .required(),
 noeud: yup.object().required(),
 type: yup.object().required(),
}).required();


function UpdateCapteurModal({ isOpen, onResolve, onReject, capteur }) {

  const [Noeuds,setNoeuds] = useState([])
  const qkc = ['get_Noeuds']

  useQuery(qkc, () => getNoeuds(), {
      onSuccess: (_) => {
          const newcl = _.map(c => ({value:c._id,label: c.nom}));
          setNoeuds(newcl);
      } 
  });
  const [types,setTypes] = useState([])
  const qk = ['get_Types']

  useQuery(qk, () => getTypes(), {
    onSuccess: (_) => {
        const newcl = _.map(c => ({value:c._id,label: c.nom}));
        setTypes(newcl);
    } 
});
  const defaultValues = {nom: capteur?.nom, noeud: capteur?.noeud,type: capteur?.type};
  const {control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    defaultValues
  });

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

const onCreate = data => {
  const {noeud} = data;
    onResolve({_id: noeud._id,...data, noeud: noeud.value});
  };
  return (
    <>
        <Dialog header="Modification de Capteur" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="nom" className="form-label">Nom</label>
            <Controller control={control} name="nom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nom" placeholder="Entrer le nom" />
             )}/>
              {getFormErrorMessage('nom')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="type" className="form-label">Type de Capteur</label>
            <Controller control={control} name="type" render={({field}) => (
                    <Select
                    {...field}
                    options={types}
                  />
            )} />
              {getFormErrorMessage('type')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="noeud" className="form-label">Noeud</label>
            <Controller control={control} name="noeud" render={({field}) => (
                    <Select
                    {...field}
                    options={Noeuds}
                  />
            )} />
              {getFormErrorMessage('noeud')} 
            </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2">Mettre à jour</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateCapteurModal)