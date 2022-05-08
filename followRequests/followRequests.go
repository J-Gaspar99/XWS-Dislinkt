package followRequests

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type FollowRequests struct {
	ID          int64 `json:"id,omitempty" bson:"id,omitempty"`
	FollowerID  int64 `json:"followerID,omitempty" bson:"followerID,omitempty"`
	FollowingID int64 `json:"followingID,omitempty" bson:"followingID,omitempty"`
}

func CreateFollowRequestEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var followRequest FollowRequests
	json.NewDecoder(request.Body).Decode(&followRequest)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection1.InsertOne(ctx, followRequest)
	json.NewEncoder(response).Encode(result)
}

func GetFollowRequestsEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")

	var followRequests []FollowRequests
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection1.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	if err = cursor.All(ctx, &followRequests); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(followRequests)
}

var collection1 *mongo.Collection

func Handle(client *mongo.Client) {

	collection1 = client.Database("XML").Collection("followRequests")

}
