import Api from "./Api";

export const createNoeud = (data) => Api.post('/noeud', data).then(res => res.data);
export const getNoeuds = () => Api.get('/noeud').then(res => res.data);
export const getNoeud = (id) => Api.get('/noeud/' + id).then(res => res.data);
export const getNoeudsByChamp = (id) => Api.get('/noeud/getnoeudbychamp/' + id).then(res => res.data);
export const updateNoeud = (id,data) => Api.patch('/noeud/' + id, data).then(res => res.data);
export const removeNoeud = (id) => Api.delete('/noeud/'+id).then(res => res.data);