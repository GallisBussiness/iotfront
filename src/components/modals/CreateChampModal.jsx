import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { InputNumber } from 'primereact/inputnumber'
import Select from 'react-select'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getNoAdminUsers} from '../../services/userservice';

const schema = yup.object({
    nom: yup.string()
    .required(),
   user: yup.object().required(),
   superficie: yup.number().required(),
  }).required();



function CreateChampModal({ isOpen, onResolve, onReject }) {


    const [users,setUsers] = useState([])
    const qku = ['get_Users']

    useQuery(qku, () => getNoAdminUsers(), {
        onSuccess: (_) => {
            const newcl = _.map(c => ({value:c._id,label: `${c.prenom} ${c.nom}`}));
            setUsers(newcl);
        } 
    });

  const defaultValues = {nom: '', user: '', superficie: 0};
  const {control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    defaultValues
  });

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

const onCreate = data => {
   const {user} = data;
    onResolve({...data, user: user.value});
  };

  return (
    <>
    <Dialog header="Création de champs" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
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
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="user" className="form-label">Propriétaire</label>
            <Controller control={control} name="user" render={({field}) => (
                 <Select
                 {...field}
                 options={users}
               />
             )}/>
              {getFormErrorMessage('user')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="superficie" className="form-label">Superficie</label>
            <Controller control={control} name="superficie" render={({field}) => (
                <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)}  mode="decimal" />
             )}/>
              {getFormErrorMessage('superficie')} 
            </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateChampModal)