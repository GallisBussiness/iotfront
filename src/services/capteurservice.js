import Api from "./Api";

export const createCapteur = (data) => Api.post('/capteur', data).then(res => res.data);
export const getCapteurs = () => Api.get('/capteur').then(res => res.data);
export const updateCapteur = (id,data) => Api.patch('/capteur/' + id, data).then(res => res.data);
export const removeCapteur = (id) => Api.delete('/capteur/'+id).then(res => res.data);