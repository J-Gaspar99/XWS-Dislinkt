package main

import (
	"User_service/startup"
	"User_service/startup/config"
)

func main() {

	conf := config.NewConfig()

	server := startup.NewServer(conf)
	server.Start()

}
