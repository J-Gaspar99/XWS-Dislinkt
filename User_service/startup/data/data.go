package data

import (
	"encoding/json"
	"fmt"
	"io"
	"time"

	validator "github.com/go-playground/validator/v10"
)

// User defines the structure for an API product
type User struct {
	id        int    `json:"id"`
	username  string `json: "username"`
	password  string `json: "password"`
	firstName string `json:"name"`
	lastName  string `json: "lastname"`

	dateOfBirth string `json: "dateOfbirth"`
	email       string `json: "email"`
	phone       string `json: "phone"`
	sex         string `json: "sex"`
	biography   string `json: "biography"`
	experiance  string `json: "experiance"`
	education   string `json: "education"`
	interests   string `json: "interests"`
	skils       string `json: "skils"`

	CreatedOn string `json:"-"`
	UpdatedOn string `json:"-"`
	DeletedOn string `json:"-"`
}

func (p *User) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(p)
}

func (u *User) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

// Users is a collection of User
type Users []*User

// ToJSON serializes the contents of the collection to JSON
// NewEncoder provides better performance than json.Unmarshal as it does not
// have to buffer the output into an in memory slice of bytes
// this reduces allocations and the overheads of the service
//
// https://golang.org/pkg/encoding/json/#NewEncoder
func (p *Users) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(p)
}

// GetUsers returns a list of users
func GetUsers() Users {
	return userList
}

func AddUser(p *User) {
	p.id = getNextID()
	userList = append(userList, p)
}

func UpdateUser(id int, p *User) error {
	_, pos, err := findUser(id)
	if err != nil {
		return err
	}

	p.id = id
	userList[pos] = p

	return nil
}

var ErrUserNotFound = fmt.Errorf("User not found")

func findUser(id int) (*User, int, error) {
	for i, p := range userList {
		if p.id == id {
			return p, i, nil
		}
	}

	return nil, -1, ErrUserNotFound
}

func getNextID() int {
	lp := userList[len(userList)-1]
	return lp.id + 1
}

// userList is a hard coded list of products for this
// example data source
var userList = []*User{
	&User{
		id:          1,
		username:    "Gale",
		password:    "1234",
		firstName:   "Jovan",
		lastName:    "Gaspar",
		dateOfBirth: "neki",
		email:       "jbutea@gmail.com",
		phone:       "061/28 45 804",
		sex:         "male",
		biography:   "...",
		experiance:  "...",
		education:   "...",
		interests:   "...",
		skils:       "...",

		CreatedOn: time.Now().UTC().String(),
		UpdatedOn: time.Now().UTC().String(),
	},

	&User{
		id:          2,
		username:    "V1rtu0s0",
		password:    "1234",
		firstName:   "Boris",
		lastName:    "Spasky",
		dateOfBirth: "neki",
		email:       "bbspsky@gmail.com",
		phone:       "060/21 80 812",
		sex:         "male",
		biography:   "...",
		experiance:  "...",
		education:   "...",
		interests:   "...",
		skils:       "...",

		CreatedOn: time.Now().UTC().String(),
		UpdatedOn: time.Now().UTC().String(),
	},
}
