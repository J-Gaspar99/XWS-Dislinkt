package data

import (
	"encoding/json"
	"fmt"
	"io"
	"time"

	validator "github.com/go-playground/validator/v10"
)

// Product defines the structure for an API product
type User struct {
	ID        int    `json:"id"`
	Username  string `json: "username"`
	FirstName string `json:"name"`
	LastName  string `json: "lastname"`
	Password  string `json: "password"`

	Biography string     `json: "biography"`
	Email     string     `json:	"email"`
	Phone     string     `json: "phone"`
	BirthDate time.Month `json: "date"`

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

// Products is a collection of Product
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

// GetProducts returns a list of products
func GetUsers() Users {
	return productList
}

func AddUser(p *User) {
	p.ID = getNextID()
	productList = append(productList, p)
}

func UpdateProduct(id int, p *User) error {
	_, pos, err := findProduct(id)
	if err != nil {
		return err
	}

	p.ID = id
	productList[pos] = p

	return nil
}

var ErrProductNotFound = fmt.Errorf("Product not found")

func findProduct(id int) (*User, int, error) {
	for i, p := range productList {
		if p.ID == id {
			return p, i, nil
		}
	}

	return nil, -1, ErrProductNotFound
}

func getNextID() int {
	lp := productList[len(productList)-1]
	return lp.ID + 1
}

// productList is a hard coded list of products for this
// example data source
var productList = []*User{
	&User{
		ID:        1,
		Username:  "Gale",
		FirstName: "Jovan",
		LastName:  "Gaspar",
		Password:  "1234",
		Biography: "...",
		Email:     "jbutea@gmail.com",
		Phone:     "061/28 45 804",

		CreatedOn: time.Now().UTC().String(),
		UpdatedOn: time.Now().UTC().String(),
	},
	&User{
		ID: 2,

		Username:  "V1rtu0s0",
		FirstName: "Boris",
		LastName:  "Spasky",
		Password:  "1234",
		Biography: "...........",
		Email:     "bbspsky@gmail.com",
		Phone:     "060/21 80 812",

		CreatedOn: time.Now().UTC().String(),
		UpdatedOn: time.Now().UTC().String(),
	},
}
