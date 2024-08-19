package db

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"time"

	_ "github.com/lib/pq"
)

func ConnectDB() (*sql.DB, error) {
	dbConnStr := os.Getenv("DATABASE_URL")

	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		return nil, err
	}

	fmt.Println("Connecting to the database...")
	// Sleep for 5 seconds to ensure PostgreSQL is ready before connecting
	// This is a temporary fix because Docker starts the server container before PostgreSQL
	// I don't want to make further changes to the project, so this is the current solution
	time.Sleep(time.Second * 5)
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	sqlPath := filepath.Join("db", "sql", "schema.sql")
	sqlTables, err := os.ReadFile(sqlPath)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(string(sqlTables))
	if err != nil {
		return nil, err
	}

	return db, nil
}
