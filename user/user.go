package user

import (
	"context"
	"encoding/json"

	//"fmt"
	"log"
	"net/http"
	"time"

	//"github.com/gorilla/mux"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	//	"go.mongodb.org/mongo-driver/mongo/options"

	"golang.org/x/crypto/bcrypt"
	//"github.com/dgrijalva/jwt-go"
)

type Registration struct {
	UserName  string `json: "username" bson: "username"`
	Password  string `json: "password" bson: "password"`
	Email     string `json: "email" bson: "email"`
	FirstName string `json:"name"	bson:"name"`
	LastName  string `json: "lastname"	bson: "lastname"`
}

type Loging struct {
	UserName string `json: "username" bson: "username"`
	Password string `json: "password" bson: "password"`
}

type PersonalInfo struct {
	FirstName string `json:"name"	bson:"name"`
	LastName  string `json: "lastname"	bson: "lastname"`

	DateOfBirth string `json: "dateOfbirth"	bson: "dateOfbirth"`
	Email       string `json: "email"	bson: "email"`
	Phone       string `json: "phone"	bson: "phone"`
	Sex         string `json: "sex"		bson: "sex"`
	Biography   string `json: "biography"	bson: "biography"`
}

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

	//	CreatedOn string `json:"-"	bson:"-"`
	//	UpdatedOn string `json:"-"	bson:"-"`
	//	DeletedOn string `json:"-"	bson:"-"`

	// liste koje sadrze ID postova i ID konekcija
	//connections []string ``
	//posts		[]string``

	//isPrivate bool `json:"true" bson:"true"`
}

//var client *mongo.Client
var SECRET_KEY = []byte("gosecretkey")

func getHash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

/*func GenerateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodH S256)
	tokenString, err := token.SignedString(SECRET_KEY)
	if err != nil {
		log.Println("Error in JWT token generation")
		return "", err
	}
	return tokenString, nil
}
*/

//Create 1
func RegiterUserEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user User
	json.NewDecoder(request.Body).Decode(&user)
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection1.InsertOne(ctx, user)
	json.NewEncoder(response).Encode(result)
}

func LoginUserEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user User
	var dbUser User
	json.NewDecoder(request.Body).Decode(&user)
	// collection:= client.Database("GODB").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err := collection1.FindOne(ctx, bson.M{"username": user.UserName}).Decode(&dbUser)

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	userPass := []byte(user.Password)
	dbPass := []byte(dbUser.Password)

	passErr := bcrypt.CompareHashAndPassword(dbPass, userPass)

	if passErr != nil {
		log.Println(passErr)
		response.Write([]byte(`{"response":"Wrong Password!"}`))
		return
	}
	//	jwtToken, err := GenerateJWT()
	//	if err != nil {
	//		response.WriteHeader(http.StatusInternalServerError)
	//		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
	//		return
	//	}
	//	response.Write([]byte(`{"token":"` + jwtToken + `"}`))

}

func UpdateUserEndpoint(response http.ResponseWriter, request *http.Request) {

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
