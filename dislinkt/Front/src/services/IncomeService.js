import axios from 'axios';

const INCOME_API_BASE_URL = "http://localhost:8080/api/v1/income";

class IncomeService{

getIncome(){
    return axios.get( INCOME_API_BASE_URL);
}
createIncome(income){
    return axios.post(INCOME_API_BASE_URL, income);
}
getIncomeById(incomeId,type){
    return axios.get(INCOME_API_BASE_URL + '/' + type + '/' + incomeId);
}
updateIncome(income,incomeId){
    return axios.put(INCOME_API_BASE_URL + '/' + incomeId, income);
}
deleteIncome(incomeId){
    return axios.delete(INCOME_API_BASE_URL + '/' + incomeId);
}
}
export default new IncomeService();
