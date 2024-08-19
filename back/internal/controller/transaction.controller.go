package controller

import (
	"net/http"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/usecase"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type TransactionController struct {
	Usecase usecase.TransactionUsecase
}

func (c *TransactionController) CreateTransaction(ctx *gin.Context) {
	validate := validator.New()
	userReqId, _ := ctx.Get("userReqId")

	id, ok := userReqId.(string)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "something is going wrong"})
		return
	}

	var body struct {
		RecipientId string `json:"recipientId" validate:"required"`
		Amount      string `json:"amount" validate:"required,numeric"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}
	if err := validate.Struct(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}

	transactionId, err := c.Usecase.CreateTransaction(db.CreateTransactionParams{
		SenderID:    id,
		RecipientID: body.RecipientId,
		Amount:      body.Amount,
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"tranactionId": transactionId})
}
