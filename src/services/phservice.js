import Api from "./Api";

export const createPh = (data) => Api.post('/ph', data).then(res => res.data);
export const getPhs = (idCapteur) => Api.get('/ph/bycapteur/' + idCapteur).then(res => res.data);