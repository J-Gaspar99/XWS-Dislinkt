package posts

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Posts struct {
	ID       int64  `json:"id,omitempty" bson:"id,omitempty"`
	FullText string `json:"text,omitempty" bson:"text,omitempty"`
	Likes    int32  `json:"like,omitempty" bson:"like,omitempty"`
	Dislike  int32  `json:"dislike,omitempty" bson:"dislike,omitempty"`
	User     struct {
		UserName string `json:"username" bson:"username"`
	} `json:"user,omitempty" bson:"user,omitempty"`
}

func CreatePostEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var post Posts
	json.NewDecoder(request.Body).Decode(&post)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection1.InsertOne(ctx, post)
	json.NewEncoder(response).Encode(result)
}

func GetPostsEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")

	var posts []Posts
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection1.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	if err = cursor.All(ctx, &posts); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(posts)
}

/*
func SearchPostsEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	queryParams := request.URL.Query()
	var posts []Posts
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	searchStage := bson.D{
		{"$search", bson.D{
			{"index", "synsearch"},
			{"text", bson.D{
				{"query", queryParams.Get("q")},
				{"path", "text"},
				{"synonyms", "posts"},
			}},
		}},
	}
	cursor, err := collection1.Aggregate(ctx, mongo.Pipeline{searchStage})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	if err = cursor.All(ctx, &posts); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(posts)
}
*/
var collection1 *mongo.Collection

func Handle(client *mongo.Client) {

	collection1 = client.Database("XML").Collection("posts")

}
