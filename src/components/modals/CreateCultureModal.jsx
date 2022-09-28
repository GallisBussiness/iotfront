import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea} from 'primereact/inputtextarea'

const schema = yup.object({
    nom: yup.string()
    .required(),
   phsol: yup.number().required(),
   humiditesolmin: yup.number().required(),
   humiditesolmax: yup.number().required(),
   humiditefeuille: yup.number().required(),
   description: yup.string(),
  }).required();


function CreateCultureModal({ isOpen, onResolve, onReject }) {

    const defaultValues = {nom: '', phsol: 0, humiditesolmin: 0, humiditesolmax: 0, humiditefeuille: 0, description: ''};
      const {control, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

      const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onCreate = data => {
        onResolve(data);
      };

  return (
    <>
       <Dialog header="Création de culture" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
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
            <label htmlFor="phsol" className="form-label">PH du sol</label>
            <Controller control={control} name="phsol" render={({field}) => (
                <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)}  />
            // <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300 bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nom" placeholder="Entrer le nom" autoFocus />
             )}/>
              {getFormErrorMessage('phsol')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="humiditesolmin" className="form-label">Humidité minimum du sol</label>
            <Controller control={control} name="humiditesolmin" render={({field}) => (
                <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)}  />
             )}/>
              {getFormErrorMessage('humiditesolmin')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="humiditesolmax" className="form-label">Humidité maximum du sol</label>
            <Controller control={control} name="humiditesolmax" render={({field}) => (
                <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)}  />
             )}/>
              {getFormErrorMessage('humiditesolmax')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="humiditefeuille" className="form-label">Humidité des feuilles</label>
            <Controller control={control} name="humiditefeuille" render={({field}) => (
                <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)}  />
             )}/>
              {getFormErrorMessage('humiditefeuille')} 
            </div>

            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="description" className="form-label">Description</label>
            <Controller control={control} name="description" render={({field}) => (
            <InputTextarea rows={5} cols={30} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
             )}/>
              {getFormErrorMessage('description')} 
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

export default create(CreateCultureModal)