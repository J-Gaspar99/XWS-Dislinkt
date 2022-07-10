import axios from 'axios';

const CLIENTPOINTS_API_BASE_URL = "http://localhost:8080/api/v1/clientPoints";

class ClientPointsService {
    
    getClientPoints() {
        return axios.get(CLIENTPOINTS_API_BASE_URL);
    }

    createClientPoints(clientPoints){
            return axios.post(CLIENTPOINTS_API_BASE_URL,clientPoints);
    }

    getClientPointsById(clientPointsId){
        return axios.get(CLIENTPOINTS_API_BASE_URL+"/"+clientPointsId);
    }

    deleteClientPoints(clientPointsId){
        return axios.delete(CLIENTPOINTS_API_BASE_URL, + "/" + clientPointsId);
    }

}
export default new ClientPointsService();