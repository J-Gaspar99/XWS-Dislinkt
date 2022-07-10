import axios from 'axios';

const FISHINGINSTRUCTOR_API_BASE_URL = "http://localhost:8080/api/v1/fishinginstructors";

class FishingInstructiorService{

getFishingInstructors(){
    return axios.get( FISHINGINSTRUCTOR_API_BASE_URL);
}
createFishingInstructor(fishinginstructor){
    return axios.post(FISHINGINSTRUCTOR_API_BASE_URL, fishinginstructor);
}
getFishingInstructorById(fishinginstructorId){
    return axios.get(FISHINGINSTRUCTOR_API_BASE_URL + '/' + fishinginstructorId);
}
updateFishingInstructor(fishinginstructor,fishinginstructorId){
    return axios.put(FISHINGINSTRUCTOR_API_BASE_URL + '/' + fishinginstructorId,fishinginstructor);
}
deleteFishingInstructor(fishinginstructorId){
    return axios.delete(FISHINGINSTRUCTOR_API_BASE_URL+ '/' + fishinginstructorId);
}
}
export default new FishingInstructiorService();
