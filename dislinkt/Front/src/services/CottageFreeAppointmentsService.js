import axios from "axios";

const COTTAGE_FREE_APPOINTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/cottagefreeappointments";


class CottageFreeAppointmenrsService {

    getCottageFreeAppointments(){
        return axios.get(COTTAGE_FREE_APPOINTMENTS_API_BASE_URL);
    }

    createCottageFreeAppointment(cottageAppointment){
        return axios.post(COTTAGE_FREE_APPOINTMENTS_API_BASE_URL,cottageAppointment);
    }

    findCottageFreeAppointmentsByCottageId(cottagetId){
        return axios.get(COTTAGE_FREE_APPOINTMENTS_API_BASE_URL + '/cottage/' + cottagetId);
    }

    findCottageFreeAppointmentsById(cottageAppointmentId){
        return axios.get(COTTAGE_FREE_APPOINTMENTS_API_BASE_URL + '/' +cottageAppointmentId);
    }

    deleteCottageFreeAppointment(cottageAppointmentId){
        return axios.delete(COTTAGE_FREE_APPOINTMENTS_API_BASE_URL+'/'+cottageAppointmentId);
    }

}
export default new CottageFreeAppointmenrsService();
