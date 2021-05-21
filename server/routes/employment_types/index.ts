import express from "express";
import { EmploymentType } from "../../database/models/EmploymentType";

const employmentTypeRouter = express.Router();

employmentTypeRouter.get(
    "/",
    async (req, res) => {
        const types = await EmploymentType.find({ order: { name: "ASC" } });

        res.json(types);
    }
);

export default employmentTypeRouter;
