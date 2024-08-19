package controller

import (
	"net/http"
	"strconv"

	"github.com/erickgcastro/go-payment-api/internal/model"
	"github.com/erickgcastro/go-payment-api/internal/usecase"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Usecase usecase.UserUsecase
}

func (c *UserController) GetUserByName(ctx *gin.Context) {
	name := ctx.Param("name")

	user, err := c.Usecase.GetUserByName(name)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	ctx.JSON(http.StatusOK, model.MappedUser{
		ID:    user.ID,
		Email: user.Email,
		Name:  user.Name,
	})
}

func (c *UserController) GetUser(ctx *gin.Context) {
	userReqId, _ := ctx.Get("userReqId")

	id, ok := userReqId.(string)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	user, err := c.Usecase.GetUserById(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	ctx.JSON(http.StatusOK, model.MappedUser{
		ID:    user.ID,
		Email: user.Email,
		Name:  user.Name,
	})
}

func (c *UserController) GetBalance(ctx *gin.Context) {
	userReqId, _ := ctx.Get("userReqId")

	id, ok := userReqId.(string)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	balance, err := c.Usecase.GetBalance(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"amount": balance})
}

func (c *UserController) ListTransactions(ctx *gin.Context) {
	userReqId, _ := ctx.Get("userReqId")

	id, ok := userReqId.(string)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "user not found"})
		return
	}

	pageQuery := ctx.DefaultQuery("page", "1")
	limitQuery := ctx.DefaultQuery("limit", "10")

	page, err := strconv.Atoi(pageQuery)
	if err != nil || page < 1 {
		page = 1
	}
	limit, err := strconv.Atoi(limitQuery)
	if err != nil || limit < 1 {
		limit = 10
	}

	data, err := c.Usecase.ListUserTransactions(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	startIndex := (page - 1) * limit
	if startIndex >= len(data) {
		ctx.JSON(http.StatusOK, []interface{}{})
		return
	}

	endIndex := startIndex + limit
	if endIndex > len(data) {
		endIndex = len(data)
	}

	paginatedData := data[startIndex:endIndex]

	ctx.JSON(http.StatusOK, paginatedData)
}
