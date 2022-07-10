import axios from "axios";

const ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/adventurefreeappointments";


class AdventureFreeAppointmenrsService {

    getAdventureFreeAppointments(){
        return axios.get(ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL);
    }

    createAdventureFreeAppointment(adventureAppointment){
        return axios.post(ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL,adventureAppointment);
    }

    findAdventureFreeAppointmentsByAdventureId(adventureId){
        return axios.get(ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL + '/adventure/' + adventureId);
    }

    findAdventureFreeAppointmentsById(adventureAppointmentId){
        return axios.get(ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL + '/' +adventureAppointmentId);
    }

    deleteAdventureFreeAppointment(adventureAppointmentId){
        return axios.delete(ADVENTURE_FREE_APPOINTMENTS_API_BASE_URL+'/'+adventureAppointmentId);
    }

}
export default new AdventureFreeAppointmenrsService();
