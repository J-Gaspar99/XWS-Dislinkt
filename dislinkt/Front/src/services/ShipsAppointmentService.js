import axios from "axios";

const SHIP_APPOINTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/shipappointments";


class ShipsAppointmenrsService {

    getShipAppointments(){
        return axios.get(SHIP_APPOINTMENTS_API_BASE_URL);
    }

    createShipAppointment(shipAppointment){
        return axios.post(SHIP_APPOINTMENTS_API_BASE_URL,shipAppointment);
    }

    findShipAppointmentsById(shipAppointmentId){
        return axios.get(SHIP_APPOINTMENTS_API_BASE_URL + '/' +shipAppointmentId);
    }

    deleteShipAppointment(shipAppointmentId){
        return axios.delete(SHIP_APPOINTMENTS_API_BASE_URL+'/'+shipAppointmentId);
    }

}
export default new ShipsAppointmenrsService();
