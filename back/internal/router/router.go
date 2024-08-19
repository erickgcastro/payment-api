package router

import (
	"github.com/erickgcastro/go-payment-api/internal/factory"
	"github.com/erickgcastro/go-payment-api/internal/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func New(c factory.ControllersResponse) *gin.Engine {

	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
	}))

	baseRouter := server.Group("/api")
	baseRouter.POST("/auth/signin", c.AuthController.Signin)
	baseRouter.POST("/auth/signup", c.AuthController.Signup)
	baseRouter.GET("/users/name/:name", c.UserController.GetUserByName)
	baseRouter.Use(middleware.DecodeTokenMiddleware()).GET("/users/me", c.UserController.GetUser)
	baseRouter.Use(middleware.DecodeTokenMiddleware()).GET("/users/transactions", c.UserController.ListTransactions)
	baseRouter.Use(middleware.DecodeTokenMiddleware()).GET("/users/balance", c.UserController.GetBalance)
	baseRouter.Use(middleware.DecodeTokenMiddleware()).POST("/transactions", c.TransactionController.CreateTransaction)

	return server

}
