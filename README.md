## Before getting started
- Make sure you have the following install
    - Docker
    - Docker compose
## How to get started?
- Clone this repository
- Change directory to the repository
- Copy .env.example to .env
- Please run based on your environment
    - For development run `docker-compose up -d`
    - For production run `docker-compose -f docker-compose.prod.yml -d`
- run `docker-compose exec app yarn migration:run`
- run `docker-compose exec app yarn seed:run`
- Access `http://localhost:3000` then login with the `Test Account` then you can start manage the jobs in the application
## Test Account
- Username: admin
- Password: admin