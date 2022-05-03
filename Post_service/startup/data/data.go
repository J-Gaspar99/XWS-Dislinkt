package data

import (
	"encoding/json"
	"fmt"
	"io"

	validator "github.com/go-playground/validator/v10"
)

// Product defines the structure for an API product
type Post struct {
	id           int    `json:"id"`
	created_time string `json: "created_time"`
	links        string `json:"links"`
	images       string `json: "images"`
	text         string `json: "text"`
	user         string `json:"user"`
}

func (p *Post) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(p)
}

func (u *Post) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

// Products is a collection of Product
type Posts []*Post

// ToJSON serializes the contents of the collection to JSON
// NewEncoder provides better performance than json.Unmarshal as it does not
// have to buffer the output into an in memory slice of bytes
// this reduces allocations and the overheads of the service
//
// https://golang.org/pkg/encoding/json/#NewEncoder
func (p *Posts) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(p)
}

// GetProducts returns a list of products
func GetPost() Posts {
	return postList
}

func AddUser(p *Post) {
	p.id = getNextID()
	postList = append(postList, p)
}

func UpdateProduct(id int, p *Post) error {
	_, pos, err := findProduct(id)
	if err != nil {
		return err
	}

	p.id = id
	postList[pos] = p

	return nil
}

var ErrProductNotFound = fmt.Errorf("Product not found")

func findProduct(id int) (*Post, int, error) {
	for i, p := range postList {
		if p.id == id {
			return p, i, nil
		}
	}

	return nil, -1, ErrProductNotFound
}

func getNextID() int {
	lp := postList[len(postList)-1]
	return lp.id + 1
}

// productList is a hard coded list of products for this
// example data source
var postList = []*Post{
	&Post{
		id:           1,
		created_time: "1440501087",
		links:        "",  //{"https://instagram.com/p/6zeBG2H1oH/"},
		images:       " ", //{
		//standard_resolution:"", //{
		//url:    "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s640x640/sh0.08/e35/11906267_1671515619746683_1237948463_n.jpg",
		//width:  640,
		//height: 640,
		//},
		//},

		text: "Logon this is the logo of PRDP, matlab Prem Ratan Dhan Payo. Coming this Diwali",

		user: " ", //{
		//username:  "Gale",
		//id:        "1",
		//full_name: "Jovan Gaspar",
	},
}
