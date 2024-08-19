package usecase

import (
	"errors"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/model"
	"github.com/erickgcastro/go-payment-api/internal/repository"
	"github.com/google/uuid"
)

type UserUsecase struct {
	UserRepository        repository.UserRepository
	TransactionRepository repository.TransactionRepository
}

func (u *UserUsecase) GetUserByName(name string) (db.User, error) {
	return u.UserRepository.GetUserByName(name)
}

func (u *UserUsecase) GetUserById(id string) (db.User, error) {
	_, err := uuid.Parse(id)
	if err != nil {
		return db.User{}, errors.New("invalid id")
	}
	return u.UserRepository.GetUserById(id)
}

func (u *UserUsecase) GetBalance(id string) (string, error) {
	balance, err := u.TransactionRepository.GetUserBalance(id)
	if err != nil {
		return "", errors.New("something is going wrong")
	}
	return balance, nil
}

func (u *UserUsecase) ListUserTransactions(id string) ([]model.MappedTransaction, error) {
	list, err := u.TransactionRepository.ListByUserId(id)
	if err != nil {
		return []model.MappedTransaction{}, errors.New("something is going wrong")
	}

	transactions := []model.MappedTransaction{}

	for _, item := range list {
		if item.SenderID != item.RecipientID {
			transactions = append(transactions, model.MappedTransaction{
				ID:          item.ID,
				SenderID:    item.SenderID,
				RecipientID: item.RecipientID,
				Amount:      item.Amount,
				Sender: model.MappedUser{
					ID:    item.SenderID,
					Name:  item.SenderName,
					Email: item.SenderEmail,
				},
				Recipient: model.MappedUser{
					ID:    item.RecipientID,
					Name:  item.RecipientName,
					Email: item.RecipientEmail,
				},
				CreatedAt: item.CreatedAt,
				UpdatedAt: item.UpdatedAt,
			})
		}
	}

	return transactions, nil
}
