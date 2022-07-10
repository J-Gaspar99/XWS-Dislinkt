import axios from "axios";

const COMPLAINTS_API_BASE_URL = "http://localhost:8080/api/v1/complaints";

class ComplaintsService {
    
    getComplaints(type){
        return axios.get(COMPLAINTS_API_BASE_URL + '/' + type);        
    }

    createComplaint(complaint){
        return axios.post(COMPLAINTS_API_BASE_URL,complaint);
    }

    viewComplaintById(complaintId,type){
        return axios.get(COMPLAINTS_API_BASE_URL + '/' + type + '/' + complaintId);
    }

    deleteComplaint(complaintId,type){
        return axios.delete(COMPLAINTS_API_BASE_URL + '/' + type + '/' + complaintId);
    }

}
export default new ComplaintsService();