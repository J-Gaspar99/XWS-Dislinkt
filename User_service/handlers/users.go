package handlers

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/nicholasjackson/building-microservices-youtube/product-api/startup/data"
)

// Users is a http.Handler
type Users struct {
	l *log.Logger
}

// NewUsers creates a users handler with the given logger
func NewUsers(l *log.Logger) *Users {
	return &Users{l}
}

// getUsers returns the users from the data store
func (p *Users) GetUsers(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Users")

	// fetch the users from the datastore
	lp := data.GetUsers()

	// serialize the list to JSON
	err := lp.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
	}
}

func (p *Users) AddUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST User")

	usr := r.Context().Value(KeyUser{}).(data.User)
	data.AddUser(&usr)
}

func (p Users) UpdateUsers(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}

	p.l.Println("Handle PUT User", id)
	prod := r.Context().Value(KeyUser{}).(data.User)

	err = data.UpdateUser(id, &prod)
	if err == data.ErrUserNotFound {
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}
}

type KeyUser struct{}

func (p Users) MiddlewareValidateUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		usr := data.User{}

		err := usr.FromJSON(r.Body)
		if err != nil {
			p.l.Println("[ERROR] deserializing user", err)
			http.Error(rw, "Error reading user", http.StatusBadRequest)
			return
		}

		// add the user to the context
		ctx := context.WithValue(r.Context(), KeyUser{}, usr)
		r = r.WithContext(ctx)

		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(rw, r)
	})
}
