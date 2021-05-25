## Before getting started
- Make sure you have the following install
    - Docker
    - Docker compose
## How to get started?
1. Clone this repository
2. Change directory to the repository
3. Copy .env.example to .env
4. Please run based on your environment
    - For development run `docker-compose up -d`
    - For production run `docker-compose -f docker-compose.prod.yml -d`
5. run `docker-compose exec app yarn migration:run`
6. run `docker-compose exec app yarn seed:run`
7. Access `http://localhost:3000` then login with the `Test Account` below then you can start manage the jobs in the application
## Test Account
- Username: admin
- Password: admin