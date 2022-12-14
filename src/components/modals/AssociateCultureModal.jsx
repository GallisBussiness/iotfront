import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { create } from 'react-modal-promise'
import { getCultures } from '../../services/cultureservice';
import { useState } from 'react';
import { Radio } from '@mantine/core';

const schema = yup.object({
   culture: yup.string().required(),
  }).required();

function AssociateCultureModal({ isOpen, onResolve, onReject, noeud }) {
  const [cul,setCul] = useState([])

    const qk = ['get_Cultures']

      useQuery(qk, () => getCultures(), {
      onSuccess: (_) => {
        const newcl = _.map(c => ({value:c._id,label: c.nom}));
        setCul(newcl);
    } 
    });

    const defaultValues = {culture: ''};
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

  const onCreate = data => {
      onResolve({_id: noeud?._id, ...data});
    };
  return (
    <>
     <Dialog header="Modification de Noeud" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
            <div className="mb-3">
            <Controller control={control} name="culture" render={({field}) => (
                  <Radio.Group
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  name="Cultures Favorables"
                  orientation="vertical"
                  label="Selectionez la culture"
                  error={errors.culture && errors.culture.message}
                  withAsterisk
                >
                 
                 {cul?.map((c,i) => (
                   <Radio key={i} value={c.value} label={c.label} />
                 ))}
                </Radio.Group>
            )} /> 
            </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2">ASSOCIER CULTURE</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    
    </>
  )
}

export default create(AssociateCultureModal)