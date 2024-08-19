package repository

import (
	"context"
	"errors"
	"strconv"

	"github.com/erickgcastro/go-payment-api/db"
)

type TransactionRepository struct {
	Ctx     context.Context
	Queries *db.Queries
}

func (r *TransactionRepository) GetUserBalance(id string) (string, error) {
	transactions, err := r.ListByUserId(id)
	if err != nil {
		return "", errors.New("something is going wrong")
	}

	balance := 0

	for _, tx := range transactions {
		amount, err := strconv.Atoi(tx.Amount)
		if err != nil {
			return "", errors.New("invalid transaction amount")
		}

		if tx.RecipientID == id {
			balance += amount
		} else if tx.SenderID == id {
			balance -= amount
		}
	}

	return strconv.Itoa(balance), nil
}

func (r *TransactionRepository) ListByUserId(id string) ([]db.GetTransactionsByUserIdRow, error) {
	return r.Queries.GetTransactionsByUserId(r.Ctx, id)
}

func (r *TransactionRepository) Create(params db.CreateTransactionParams) error {
	return r.Queries.CreateTransaction(r.Ctx, params)
}
