import express from "express";
import { isString } from "lodash";
import { Skill } from "../../database/models/Skill";

const skillRouter = express.Router();

skillRouter.get(
    "/",
    async (req, res) => {
        const { start = "" } = req.query;
        const table = Skill.getRepository().metadata.tableName;
        const query = Skill.getRepository()
            .createQueryBuilder();

        if (isString(start) &&  start.trim()) {
            query.where("name LIKE :start", { start: `${start}%` });
        } else {
            query.orderBy({ name: "ASC" });
        }

        const skills = await query.getMany();

        res.json(skills);
    }
);

export default skillRouter;
