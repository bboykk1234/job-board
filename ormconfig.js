
require('dotenv').config();

module.exports = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
        "server/database/models/**/*.ts"
    ],
    migrations: [
        "server/database/migration/**/*.ts"
    ],
    subscribers: [
        "server/database/subscriber/**/*.ts"
    ],
    seeds: [
        "server/database/seeds/**/*.ts"
    ],
    factories: [
        "server/database/factories/**/*.ts"
    ],
    cli: {
        "entitiesDir": "server/database/models",
        "migrationsDir": "server/database/migration",
        "subscribersDir": "server/database/subscriber"
    }
}