import axios from 'axios';

const REGISTRATIONREQUESTS_API_BASE_URL = "http://localhost:8080/api/v1/registrationrequests";

const USERS_API_BASE_URL = "http://localhost:8080/api/v1/users";


class RegistrationRequestsService{

getRegistrationRequests(type){
    return axios.get( REGISTRATIONREQUESTS_API_BASE_URL + '/' + type );
}

createRegistrationRequest(request){
    return axios.post(REGISTRATIONREQUESTS_API_BASE_URL, request);
}


createUser(request,type){
    return axios.post(USERS_API_BASE_URL + '/' + type, request);
}

viewRequest(id){
    return axios.put(REGISTRATIONREQUESTS_API_BASE_URL + '/' + id);
}

getRegistrationRequestById(requestId,type){
    return axios.get(REGISTRATIONREQUESTS_API_BASE_URL + '/' + type + '/' + requestId);
}

deleteRegistrationRequest(requestId,type){
    return axios.delete(REGISTRATIONREQUESTS_API_BASE_URL + '/delete/' + type + '/'+ requestId);
}

}
export default new RegistrationRequestsService();
