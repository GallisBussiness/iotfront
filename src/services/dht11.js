import Api from "./Api";

export const getCapteurData = (idCapteur) => Api.get('/dht11/bycapteur/' + idCapteur).then(res => res.data);