import axios from 'axios';

const ADVENTURE_API_BASE_URL = "http://localhost:8080/api/v1/adventures";

class AdventureService{

getAdventures(){
    return axios.get(ADVENTURE_API_BASE_URL);
}
createAdventure(adventure,type){
    return axios.post(ADVENTURE_API_BASE_URL + '/' + type, adventure);
}
getAdventureById(adventureId){
    return axios.get(ADVENTURE_API_BASE_URL + '/' + adventureId);
}
updateAdventure(adventure,adventureId,type){
    return axios.put(ADVENTURE_API_BASE_URL + '/' + type + '/' + adventureId,adventure);
}
deleteAdventure(adventureId,type){
    return axios.delete(ADVENTURE_API_BASE_URL+ '/' + type + '/' + adventureId);
}
}
export default new AdventureService();
