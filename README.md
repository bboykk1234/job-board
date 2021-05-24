## Before getting started
- Make sure you have docker and docker compose install
## How to get started?
- Clone this repository
- Change directory to the repository
- Copy .env.example to .env
- run `docker-compose up -d`
- run `docker-compose exec app yarn migration:run`
- run `docker-compose exec app yarn seed:run`
- Access `http://localhost:3000` then login with the `Test Account`

## Test Account
- Username: test
- Password: 123