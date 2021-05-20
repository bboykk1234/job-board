import express from "express";
import { Level } from "../../database/models/Level";

const levelRouter = express.Router();

levelRouter.get(
    "/",
    async (req, res) => {
        const levels = await Level.find();

        res.json(levels);
    }
);

export default levelRouter;
