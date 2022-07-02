import axios from 'axios';

const COTTAGE_API_BASE_URL = "http://localhost:8080/api/v1/cottages";

class Cottage{

getCottages(type){
    return axios.get( COTTAGE_API_BASE_URL + '/' + type );
}
createCottage(cottage){
    return axios.post(COTTAGE_API_BASE_URL, cottage);
}
getCottageById(cottageId,type){
    return axios.get(COTTAGE_API_BASE_URL + '/'+ type + '/' + cottageId);
}
updateCottage(cottage,cottageId){
    return axios.put(COTTAGE_API_BASE_URL + '/' + cottageId, cottage);
}
deleteCottage(cottageId,type){
    return axios.delete(COTTAGE_API_BASE_URL + '/' + type + '/' + cottageId);
}

}
export default new Cottage();
