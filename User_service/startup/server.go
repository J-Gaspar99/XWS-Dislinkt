package startup

import "github.com/nicholasjackson/building-microservices-youtube/product-api/startup/config"

type Server struct {
	config *config.Config
}

func NewServer(config *config.Config) *Server {
	return &Server{
		config: config,
	}
}

func (server *Server) Start() {

}
