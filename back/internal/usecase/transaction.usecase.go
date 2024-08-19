package usecase

import (
	"errors"
	"log"
	"strconv"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/repository"
	"github.com/google/uuid"
)

type TransactionUsecase struct {
	TransactionRepository repository.TransactionRepository
	UserRepository        repository.UserRepository
}

func (u *TransactionUsecase) CreateTransaction(dto db.CreateTransactionParams) (string, error) {
	if dto.RecipientID == dto.SenderID {
		return "", errors.New("cannot send money to yourself")
	}

	balanceStr, err := u.TransactionRepository.GetUserBalance(dto.SenderID)
	if err != nil {
		return "", errors.New("something is going wrong")
	}

	balance, err := strconv.Atoi(balanceStr)
	if err != nil {
		return "", errors.New("invalid balance")
	}

	amount, err := strconv.Atoi(dto.Amount)
	if err != nil {
		return "", errors.New("invalid transaction amount")
	}

	if balance < amount {
		return "", errors.New("insufficient balance")
	}

	recipient, err := u.UserRepository.GetUserById(dto.RecipientID)
	if err != nil {
		return "", errors.New("recipient not found")
	}

	id := uuid.NewString()

	err = u.TransactionRepository.Create(db.CreateTransactionParams{
		ID:          id,
		SenderID:    dto.SenderID,
		RecipientID: recipient.ID,
		Amount:      dto.Amount,
	})
	if err != nil {
		log.Fatal(err)
	}

	return id, nil
}
