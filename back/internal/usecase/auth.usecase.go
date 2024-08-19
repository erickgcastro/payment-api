package usecase

import (
	"errors"
	"log"
	"os"
	"strings"
	"time"

	"github.com/erickgcastro/go-payment-api/db"
	"github.com/erickgcastro/go-payment-api/internal/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type AuthUsecase struct {
	UserRepository        repository.UserRepository
	TransactionRepository repository.TransactionRepository
}

func (u AuthUsecase) createToken(id string) (string, error) {
	claims := jwt.MapClaims{
		"sub": id,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	jwtSecretKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	tokenString, err := token.SignedString(jwtSecretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (u *AuthUsecase) Signin(dto db.User) (string, error) {
	user, err := u.UserRepository.GetUserByEmail(dto.Email)
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(dto.Password))
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	token, err := u.createToken(user.ID)
	if err != nil {
		log.Fatal(err)
	}

	return token, nil
}

func (u *AuthUsecase) Signup(dto db.CreateUserParams) (string, error) {
	_, err := u.UserRepository.GetUserByName(dto.Name)
	if err == nil {
		return "", errors.New("name already taken")
	}

	_, err = u.UserRepository.GetUserByEmail(dto.Email)
	if err == nil {
		return "", errors.New("email already taken")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(dto.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	id := uuid.NewString()

	err = u.UserRepository.CreateUser(db.CreateUserParams{
		ID:       id,
		Email:    dto.Email,
		Name:     strings.ToLower(dto.Name),
		Password: string(hashedPassword),
	})
	if err != nil {
		log.Fatal(err)
	}

	u.TransactionRepository.Create(db.CreateTransactionParams{
		ID:          uuid.NewString(),
		SenderID:    id,
		RecipientID: id,
		Amount:      "100000",
	})

	token, err := u.createToken(id)
	if err != nil {
		log.Fatal(err)
	}

	return token, nil

}
