import axios from 'axios';

const SHIPOWNER_API_BASE_URL = "http://localhost:8080/api/v1/shipowners";

class ShipOwnerService{

getShipOwners(){
    return axios.get( SHIPOWNER_API_BASE_URL);
}
createShipOwner(shipowner){
    return axios.post(SHIPOWNER_API_BASE_URL, shipowner);
}
getShipOwnerById(shipownerId){
    return axios.get(SHIPOWNER_API_BASE_URL + '/' + shipownerId);
}
updateShipOwner(shipowner,shipownerId){
    return axios.put(SHIPOWNER_API_BASE_URL + '/' + shipownerId, shipowner);
}
deleteShipOwner(shipownerId){
    return axios.delete(SHIPOWNER_API_BASE_URL+ '/' + shipownerId);
}
}
export default new ShipOwnerService();
