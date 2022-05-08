package main

// ExClM5mbC5jclJyA
import (
	"XML/followRequests"
	"XML/followings"
	"XML/posts"
	"XML/user"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

	user.Handle(client)
	posts.Handle(client)
	followings.Handle(client)
	followRequests.Handle(client)

	router := mux.NewRouter()

	router.HandleFunc("/posts", posts.GetPostsEndpoint).Methods("GET")
	router.HandleFunc("/post/{id}", posts.GetPostByIDEndpoint).Methods("GET")
	router.HandleFunc("/posts/userid/{userid}", posts.GetPostsByUserIDEndpoint).Methods("GET")
	router.HandleFunc("/posts", posts.CreatePostEndpoint).Methods("POST")
	//router.HandleFunc("/posts/search", posts.SearchPostsEndpoint).Methods("GET")

	router.HandleFunc("/users", user.GetUsersEndpoint).Methods("GET")
	router.HandleFunc("/user/{id}", user.GetUserByIDEndpoint).Methods("GET")
	//router.HandleFunc("/user/search", user.SearchUsersEndpoint).Methods("GET")
	router.HandleFunc("/users", user.RegiterUserEndpoint).Methods("POST")
	router.HandleFunc("/user/login/{username}/{password}", user.LoginUserEndpoint).Methods("GET")
	//router.HandleFunc("/user/update", user.UpdateUserEndpoint).Methods("PUT")

	router.HandleFunc("/followings", followings.GetFollowingsEndpoint).Methods("GET")
	router.HandleFunc("/following/{id}", followings.GetFollowingByIDEndpoint).Methods("GET")
	router.HandleFunc("/following/fing/{followingID}", followings.GetFollowingByFollowingIDEndpoint).Methods("GET")
	router.HandleFunc("/followings/fings/{followingID}", followings.GetFollowingByFollowingIDEndpoint).Methods("GET")
	router.HandleFunc("/followings", followings.CreateFollowingEndpoint).Methods("POST")

	router.HandleFunc("/followrequests", followRequests.GetFollowRequestsEndpoint).Methods("GET")
	router.HandleFunc("/followrequest/{id}", followRequests.GetFollowRequestByIDEndpoint).Methods("GET")
	router.HandleFunc("/followrequests", followRequests.CreateFollowRequestEndpoint).Methods("POST")

	http.ListenAndServe(":12345", router)
}
