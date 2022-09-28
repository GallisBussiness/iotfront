import Api from "./Api";

export const createType = (data) => Api.post('/type', data).then(res => res.data);
export const getTypes = () => Api.get('/type').then(res => res.data);
export const updateType = (id,data) => Api.patch('/type/' + id, data).then(res => res.data);
export const removeType = (id) => Api.delete('/type/'+id).then(res => res.data);