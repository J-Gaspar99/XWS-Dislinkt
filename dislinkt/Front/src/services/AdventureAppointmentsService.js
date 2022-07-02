import axios from "axios";

const ADVENTURE_APPOINTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/adventureappointments";


class AdventureAppointmenrsService {

    getAdventureAppointments(){
        return axios.get(ADVENTURE_APPOINTMENTS_API_BASE_URL);
    }

    createAdventureAppointment(adventureAppointment){
        return axios.post(ADVENTURE_APPOINTMENTS_API_BASE_URL,adventureAppointment);
    }

    findAdventureAppointmentsById(adventureAppointmentId){
        return axios.get(ADVENTURE_APPOINTMENTS_API_BASE_URL + '/' +adventureAppointmentId);
    }

    deleteAdventureAppointment(adventureAppointmentId){
        return axios.delete(ADVENTURE_APPOINTMENTS_API_BASE_URL+'/'+adventureAppointmentId);
    }

}
export default new AdventureAppointmenrsService();
