import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class User{

getUsers(){
    return axios.get(USER_API_BASE_URL);
}
createUser(user,type){
    return axios.post(USER_API_BASE_URL + '/'+ type, user);
}
getUserById(userId){
    return axios.get(USER_API_BASE_URL + '/' + userId);
}
updateUser(user,userId,type){
    return axios.put(USER_API_BASE_URL + '/' + type + '/'+ userId , user);
}
deleteUser(userId,type){
    return axios.delete(USER_API_BASE_URL + '/'+ type +'/' + userId);
}
getUserByEmailAndPassword(userEmail, userPassword){
    return axios.get(USER_API_BASE_URL + '/' + userEmail + '/' + userPassword);
}

}
export default new User();
