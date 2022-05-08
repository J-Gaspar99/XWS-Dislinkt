package followings

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Followings struct {
	ID          int64 `json:"id,omitempty" bson:"id,omitempty"`
	FollowerID  int64 `json:"followerID,omitempty" bson:"followerID,omitempty"`
	FollowingID int64 `json:"followingID,omitempty" bson:"followingID,omitempty"`
}

func GetFollowingsEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")

	var followings []Followings
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection1.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	if err = cursor.All(ctx, &followings); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(followings)
}

var collection1 *mongo.Collection

func Handle(client *mongo.Client) {

	collection1 = client.Database("XML").Collection("followings")

}
