package main

import (
	"context"
	"log"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/factory"
	"github.com/erickgcastro/go-payment-api/internal/router"
	"github.com/joho/godotenv"
)

func main() {
	ctx := context.Background()

	err := godotenv.Load(".env.example")
	if err != nil {
		log.Fatal(err)
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer dbConn.Close()
	queries := db.New(dbConn)

	f := factory.Controllers(ctx, queries)
	server := router.New(f)

	server.Run(":5000")
}
