import axios from 'axios';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/v1/clientreviews";

class Review{

getReviews(type){
    return axios.get(REVIEW_API_BASE_URL + '/' + type);
}
createReview(review){
    return axios.post(REVIEW_API_BASE_URL, review);
}
getReviewById(reviewId,type){
    return axios.get(REVIEW_API_BASE_URL + '/' + type + '/' + reviewId);
}
updateReview(review,reviewId,type){
    return axios.put(REVIEW_API_BASE_URL + '/' + type + '/' + reviewId, review);
}
deleteReview(reviewId,type){
    return axios.delete(REVIEW_API_BASE_URL + '/delete/' + type + '/'+ reviewId);
}


}
export default new Review();
