import Api from "./Api";

export const createChamps = (data) => Api.post('/champs', data).then(res => res.data);
export const getChamps = () => Api.get('/champs').then(res => res.data);
export const updateChamps = (id,data) => Api.patch('/champs/' + id, data).then(res => res.data);
export const removeChamps = (id) => Api.delete('/champs/'+id).then(res => res.data);