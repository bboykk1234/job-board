import express from "express";
import { Skill } from "../../database/models/Skill";

const skillRouter = express.Router();

skillRouter.get(
    "/",
    async (req, res) => {
        const { search = "" } = req.query;
        const query = Skill.createQueryBuilder();

        if (search) {
            // TODO: Improvement
            query.where(`${Skill.name}.name LIKE :search`, { search: `%${search}%`});
        } else {
            query.orderBy({ name: "ASC" });
        }

        const skills = await query.getMany();

        res.json(skills);
    }
);

export default skillRouter;
