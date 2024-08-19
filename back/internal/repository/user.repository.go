package repository

import (
	"context"

	"github.com/erickgcastro/go-payment-api/db"
)

type UserRepository struct {
	Ctx     context.Context
	Queries *db.Queries
}

func (r *UserRepository) CreateUser(params db.CreateUserParams) error {
	return r.Queries.CreateUser(r.Ctx, params)
}

func (r *UserRepository) GetAllUsers() ([]db.User, error) {
	return r.Queries.GetAllUsers(r.Ctx)
}

func (r *UserRepository) GetUserByName(name string) (db.User, error) {
	return r.Queries.GetUserByName(r.Ctx, name)
}

func (r *UserRepository) GetUserByEmail(email string) (db.User, error) {
	return r.Queries.GetUserByEmail(r.Ctx, email)
}

func (r *UserRepository) GetUserById(id string) (db.User, error) {
	return r.Queries.GetUserById(r.Ctx, id)
}
