import "reflect-metadata";
import { createConnection } from "typeorm";
import 'dotenv/config';

(async () => {
    await createConnection();
})();
