import express from "express";
import { Skill } from "../../database/models/Skill";

const skillRouter = express.Router();

skillRouter.get(
    "/",
    async (req, res) => {
        const types = await Skill.find({ order: { name: "ASC" } });

        res.json(types);
    }
);

export default skillRouter;
