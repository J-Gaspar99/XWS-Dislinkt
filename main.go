package main

// ExClM5mbC5jclJyA
import (
	"XML/user"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//////////////////////STRUKTURE ZA RAD SAD PODACIMA

type Posts struct {
	ID       int64  `json:"id,omitempty" bson:"id,omitempty"`
	FullText string `json:"text,omitempty" bson:"text,omitempty"`
	User     struct {
		UserName string `json:"username" bson:"username"`
	} `json:"user,omitempty" bson:"user,omitempty"`
}

func GetPostsEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")

	var posts []Posts
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
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
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage})
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

var client *mongo.Client
var collection *mongo.Collection

func main() {

	fmt.Println("Pokretanje...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://admin:ExClM5mbC5jclJyA@cluster.ihwbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		panic(err)

	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
	collection = client.Database("XML").Collection("posts")

	user.Handle(client)

	//collection1 = client.Database("XML").Collection("users")

	router := mux.NewRouter()
	router.HandleFunc("/posts", GetPostsEndpoint).Methods("GET")
	router.HandleFunc("/posts/search", SearchPostsEndpoint).Methods("GET")

	router.HandleFunc("/users", user.GetUsersEndpoint).Methods("GET")
	router.HandleFunc("/user/search", user.SearchUsersEndpoint).Methods("GET")
	router.HandleFunc("/user/register", user.RegiterUserEndpoint).Methods("POST")
	router.HandleFunc("/user/login", user.LoginUserEndpoint).Methods("POST")
	router.HandleFunc("/user/update", user.UpdateUserEndpoint).Methods("PUT")

	http.ListenAndServe(":12345", router)
}
