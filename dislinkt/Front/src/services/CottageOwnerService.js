import axios from 'axios';

const COTTAGEOWNER_API_BASE_URL = "http://localhost:8080/api/v1/cottageowners";

class CottageOwnerService{

getCottageOwners(){
    return axios.get( COTTAGEOWNER_API_BASE_URL);
}
createCottageOwner(cottageowner){
    return axios.post(COTTAGEOWNER_API_BASE_URL, cottageowner);
}
getCottageOwnerById(cottageownerId){
    return axios.get(COTTAGEOWNER_API_BASE_URL + '/' + cottageownerId);
}
updateCottageOwner(cottageowner,cottageownerId){
    return axios.put(COTTAGEOWNER_API_BASE_URL + '/' + cottageownerId, cottageowner);
}
deleteCottageOwner(cottageownerId){
    return axios.delete(COTTAGEOWNER_API_BASE_URL+ '/' + cottageownerId);
}
}
export default new CottageOwnerService();
