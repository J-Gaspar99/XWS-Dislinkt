import axios from 'axios';

const SHIP_API_BASE_URL = "http://localhost:8080/api/v1/ships";

class ShipService{

getShips(type){
    return axios.get( SHIP_API_BASE_URL + '/' + type);
}
createShip(ship){
    return axios.post(SHIP_API_BASE_URL, ship);
}
getShipById(shipId){
    return axios.get(SHIP_API_BASE_URL + '/' + shipId);
}
updateShip(ship,shipId){
    return axios.put(SHIP_API_BASE_URL + '/' + shipId, ship);
}
deleteShip(shipId,type){
    return axios.delete(SHIP_API_BASE_URL+ '/' + type + '/' + shipId);
}
}
export default new ShipService();
