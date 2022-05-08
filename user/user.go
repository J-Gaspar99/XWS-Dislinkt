package user

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID        primitive.ObjectID `json:"_id"	bson:"_id"`
	UserName  string             `json: "username"	bson: "username"`
	Password  string             `json: "password"	bson: "password"`
	FirstName string             `json:"name"	bson:"name"`
	LastName  string             `json: "lastname"	bson: "lastname"`

	DateOfBirth string `json: "dateOfbirth"	bson: "dateOfbirth"`
	Email       string `json: "email"	bson: "email"`
	Phone       string `json: "phone"	bson: "phone"`
	Sex         string `json: "sex"		bson: "sex"`
	Biography   string `json: "biography"	bson: "biography"`

	Experiance string `json: "experiance"	bson: "experiance"`
	Education  string `json: "education"	bson: "education"`

	Interests string `json: "interests"	bson: "interests"`
	Skils     string `json: "skils"		bson: "skils"`

	isPrivate bool `json:"true" bson:"true"`
}

//Create 1
func RegiterUserEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user User
	json.NewDecoder(request.Body).Decode(&user)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection1.InsertOne(ctx, user)
	json.NewEncoder(response).Encode(result)
}

//Nesto ne radi
func LoginUserEndpoint(response http.ResponseWriter, request *http.Request) {
	{
		response.Header().Set("content-type", "application/json")
		params := mux.Vars(request)
		uusername, _ := params["username"]
		ppassword, _ := params["password"]
		var user User
		ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
		err := collection1.FindOne(ctx, User{UserName: uusername, Password: ppassword}).Decode(&user)
		if err != nil {
			response.WriteHeader(http.StatusInternalServerError)
			response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
			return
		}

		json.NewEncoder(response).Encode(user)

	}

}

func UpdateUserEndpoint(response http.ResponseWriter, request *http.Request) {

	response.Header().Set("Content-Type", "application/json")
	var Noviuser User
	json.NewDecoder(request.Body).Decode(&Noviuser)
	//ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//result, _ := collection1.ReplaceOne(ctx, Noviuser)

	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var Stariuser User
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection1.FindOne(ctx, User{ID: id}).Decode(&Stariuser)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}

	if Noviuser.Biography != Stariuser.Biography {
		Stariuser.Biography = Noviuser.Biography
	}
	if Noviuser.isPrivate != Stariuser.isPrivate {
		Stariuser.isPrivate = Noviuser.isPrivate
	}
	if Noviuser.DateOfBirth != Stariuser.DateOfBirth {
		Stariuser.DateOfBirth = Noviuser.DateOfBirth
	}
	if Noviuser.Education != Stariuser.Experiance {
		Stariuser.Education = Noviuser.Education
	}
	if Noviuser.Email != Stariuser.Email {
		Stariuser.Email = Noviuser.Email
	}
	if Noviuser.Experiance != Stariuser.Experiance {
		Stariuser.Experiance = Noviuser.Experiance
	}
	if Noviuser.FirstName != Stariuser.FirstName {
		Stariuser.FirstName = Noviuser.FirstName
	}
	if Noviuser.Interests != Stariuser.Interests {
		Stariuser.Interests = Noviuser.Interests
	}
	if Noviuser.LastName != Stariuser.LastName {
		Stariuser.LastName = Noviuser.LastName
	}
	if Noviuser.Password != Stariuser.Password {
		Stariuser.Password = Noviuser.Password
	}
	if Noviuser.Phone != Stariuser.Phone {
		Stariuser.Phone = Noviuser.Phone
	}
	if Noviuser.Sex != Stariuser.Sex {
		Stariuser.Sex = Noviuser.Sex
	}
	if Noviuser.UserName != Stariuser.UserName {
		Stariuser.UserName = Noviuser.UserName
	}
	if Noviuser.Skils != Stariuser.Skils {
		Stariuser.Skils = Noviuser.Skils
	}

	result, _ := collection1.InsertOne(ctx, Stariuser)
	json.NewEncoder(response).Encode(result)

}

func SearchUsersEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	queryParams := request.URL.Query()
	var posts []User
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

//Get 1
func GetUserByIDEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user User
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection1.FindOne(ctx, User{ID: id}).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(user)
}

//Get all
func GetUsersEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")

	var users []User
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection1.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	if err = cursor.All(ctx, &users); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(users)
}

var client1 *mongo.Client
var collection1 *mongo.Collection

func Handle(client *mongo.Client) {

	collection1 = client.Database("XML").Collection("users")

}
