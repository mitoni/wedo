package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/routes"
)

func main() {
	mux := http.NewServeMux()

    config, err := GetConfig()
    if err != nil {
        log.Fatalf("Error getting config: %v", err)
    }

    db, err := GetDB(config)
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }

    application := &routes.Application{
        DB: db,
    }

    // health function for discovery
	mux.HandleFunc("/health", application.Health)

	port := os.Getenv("PORT")
	fmt.Printf("listening on port %s\n", port)

	http.ListenAndServe(fmt.Sprintf(":%s", port), mux)
}
