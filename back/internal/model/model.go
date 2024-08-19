package model

import (
	"time"
)

type MappedUser struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type MappedTransaction struct {
	ID          string     `json:"id"`
	SenderID    string     `json:"senderId"`
	RecipientID string     `json:"recipientId"`
	Amount      string     `json:"amount"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	Sender      MappedUser `json:"sender"`
	Recipient   MappedUser `json:"recipient"`
}
