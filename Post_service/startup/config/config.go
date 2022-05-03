package config

import "os"

type Config struct {
	Port                      string
	UserDBHost                string
	UserDBPort                string
	UserDBName                string
	UserDBUser                string
	UserDBPass                string
	NatsHost                  string
	NatsPort                  string
	NatsUser                  string
	NatsPass                  string
	CreateOrderCommandSubject string
	CreateOrderReplySubject   string
}

func NewConfig() *Config {
	return &Config{
		Port:                      os.Getenv("USER_SERVICE_PORT"),
		UserDBHost:                os.Getenv("USER_DB_HOST"),
		UserDBPort:                os.Getenv("USER_DB_PORT"),
		UserDBName:                os.Getenv("USER_DB_NAME"),
		UserDBUser:                os.Getenv("USER_DB_USER"),
		UserDBPass:                os.Getenv("USER_DB_PASS"),
		NatsHost:                  os.Getenv("NATS_HOST"),
		NatsPort:                  os.Getenv("NATS_PORT"),
		NatsUser:                  os.Getenv("NATS_USER"),
		NatsPass:                  os.Getenv("NATS_PASS"),
		CreateOrderCommandSubject: os.Getenv("CREATE_ORDER_COMMAND_SUBJECT"),
		CreateOrderReplySubject:   os.Getenv("CREATE_ORDER_REPLY_SUBJECT"),
	}
}
