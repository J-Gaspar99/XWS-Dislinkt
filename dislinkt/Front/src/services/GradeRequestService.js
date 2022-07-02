import axios from "axios";

const GRADEREQUESTS_API_BASE_URL = "http://localhost:8080/api/v1/graderequests";

class GradeRequestService {
    
    getGradeRequests(type){
        return axios.get(GRADEREQUESTS_API_BASE_URL+ '/' + type);        
    }

    createGradeRequest(grade){
        return axios.post(GRADEREQUESTS_API_BASE_URL,grade);
    }

    viewGradeRequestById(gradeId,type){
        return axios.get(GRADEREQUESTS_API_BASE_URL + '/' +type + '/'+ gradeId);
    }

    deleteGradeRequest(gradeId,type){
        return axios.delete(GRADEREQUESTS_API_BASE_URL + '/' + type + '/' + gradeId);
    }

}
export default new GradeRequestService();