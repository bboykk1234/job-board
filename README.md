## Notes
- The application is to manage job openings and job applicants, it allows anyone to apply
- The application is a prototype, it does not have a registration portal and it only can be logged in by using the `Test Account` mentioned below to utilize the full feature.
## Before getting started
- Make sure you have the following install
    - Docker
    - Docker compose
## How to get started?
1. Clone this repository
2. Change directory to the repository
3. Copy .env.example to .env
4. Please run based on your environment
    - For development, please do the following steps
        1. Run `docker-compose run --rm app yarn install`
        2. Run `docker-compose up -d`
    - For production just run `docker-compose -f docker-compose.prod.yml up -d --build`
5. Run `docker-compose exec app yarn migration:run`
6. Run `docker-compose exec app yarn seed:run`
7. Access `http://localhost:3000` then login with the `Test Account` below then you can start manage the jobs in the application
## Test Account
- Username: admin
- Password: admin