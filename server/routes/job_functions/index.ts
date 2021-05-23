import express from "express";
import { JobFunction } from "../../database/models/JobFunction";

const jobFunctionRouter = express.Router();

jobFunctionRouter.get(
    "/",
    async (req, res) => {
        const jobFunctions = await JobFunction.find();

        res.json(jobFunctions);
    }
);

export default jobFunctionRouter;
