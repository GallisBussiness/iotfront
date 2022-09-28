import Api from "./Api";

export const createCulture = (data) => Api.post('/culture', data).then(res => res.data);
export const getCultures = () => Api.get('/culture').then(res => res.data);
export const updateCulture = (id,data) => Api.patch('/culture/' + id, data).then(res => res.data);
export const removeCulture = (id) => Api.delete('/culture/'+id).then(res => res.data);