package controller

import (
	"net/http"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/usecase"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type AuthController struct {
	Usecase usecase.AuthUsecase
}

func (c *AuthController) Signin(ctx *gin.Context) {
	validate := validator.New()

	var body struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}

	if err := validate.Struct(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}

	token, err := c.Usecase.Signin(db.User{
		Password: body.Password,
		Email:    body.Email,
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"access_token": token})
}

func (c *AuthController) Signup(ctx *gin.Context) {
	validate := validator.New()

	var body struct {
		Email    string `json:"email" validate:"required,email"`
		Name     string `json:"name" validate:"required,min=3"`
		Password string `json:"password" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}

	if err := validate.Struct(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "invalid body"})
		return
	}

	token, err := c.Usecase.Signup(db.CreateUserParams{
		Password: body.Password,
		Name:     body.Name,
		Email:    body.Email,
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"access_token": token})
}
