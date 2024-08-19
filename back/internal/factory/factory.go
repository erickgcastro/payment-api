package factory

import (
	"context"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/controller"
	"github.com/erickgcastro/go-payment-api/internal/repository"
	"github.com/erickgcastro/go-payment-api/internal/usecase"
)

type ControllersResponse struct {
	AuthController        controller.AuthController
	UserController        controller.UserController
	TransactionController controller.TransactionController
}

func Controllers(ctx context.Context, queries *db.Queries) ControllersResponse {
	return ControllersResponse{
		AuthController:        authFactory(ctx, queries),
		UserController:        userFactory(ctx, queries),
		TransactionController: transactionFactory(ctx, queries),
	}
}

func authFactory(ctx context.Context, queries *db.Queries) controller.AuthController {
	userRepo := repository.UserRepository{Ctx: ctx, Queries: queries}
	transactionRepo := repository.TransactionRepository{Ctx: ctx, Queries: queries}
	authUsecase := usecase.AuthUsecase{
		UserRepository:        userRepo,
		TransactionRepository: transactionRepo,
	}
	authController := controller.AuthController{Usecase: authUsecase}
	return authController
}

func userFactory(ctx context.Context, queries *db.Queries) controller.UserController {
	userRepo := repository.UserRepository{Ctx: ctx, Queries: queries}
	transactionRepo := repository.TransactionRepository{Ctx: ctx, Queries: queries}
	userUsecase := usecase.UserUsecase{
		UserRepository:        userRepo,
		TransactionRepository: transactionRepo,
	}
	userController := controller.UserController{Usecase: userUsecase}
	return userController
}

func transactionFactory(ctx context.Context, queries *db.Queries) controller.TransactionController {
	userRepo := repository.UserRepository{Ctx: ctx, Queries: queries}
	transactionRepo := repository.TransactionRepository{Ctx: ctx, Queries: queries}
	transactionUsecase := usecase.TransactionUsecase{
		UserRepository:        userRepo,
		TransactionRepository: transactionRepo,
	}
	transactionController := controller.TransactionController{Usecase: transactionUsecase}
	return transactionController
}
