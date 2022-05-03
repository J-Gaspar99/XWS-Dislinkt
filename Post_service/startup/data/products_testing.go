package data

import "testing"

func TestValidationUsers(t *testing.T) {
	u := &User{}
	err := u.Validate()

	if err != nil {
		t.Fatal(err)
	}

}
