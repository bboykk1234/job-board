import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Skill from "../../models/Skill";

export default class SkillController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { search } = req.query;
        const query = Skill.query()

        if (search) {
            query.whereRaw("name LIKE ?", [`%${search}%`])
        }

        const skills = await query;

        res.json(skills)
    }
}