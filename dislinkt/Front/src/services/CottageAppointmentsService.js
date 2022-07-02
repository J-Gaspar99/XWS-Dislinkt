import axios from "axios";

const COTTAGE_APPOINTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/cottageappointments";


class CottageAppointmenrsService {

    getCottageAppointments(){
        return axios.get(COTTAGE_APPOINTMENTS_API_BASE_URL);
    }

    createCottageAppointment(cottageAppointment){
        return axios.post(COTTAGE_APPOINTMENTS_API_BASE_URL,cottageAppointment);
    }

    findCottageAppointmentsById(cottageAppointmentId){
        return axios.get(COTTAGE_APPOINTMENTS_API_BASE_URL + '/' +cottageAppointmentId);
    }

    deleteCottageAppointment(cottageAppointmentId){
        return axios.delete(COTTAGE_APPOINTMENTS_API_BASE_URL+'/'+cottageAppointmentId);
    }

}
export default new CottageAppointmenrsService();
