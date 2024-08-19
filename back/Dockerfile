# Etapa de build
FROM golang:1.22.6-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o /payment-api ./cmd/payment-api

FROM alpine:latest AS production

WORKDIR /root/

COPY --from=build /payment-api .
COPY --from=build /app/.env.example .env.example
COPY --from=build /app/db/sql db/sql

EXPOSE 5000

CMD ["./payment-api"]