import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Skill from "../../models/Skill";
import SkillEsRepository from "../../repositories/SkillEsRepository";
import ElasticsearchClient from "../../services/ElasticsearchClient";

export default class SkillController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { search } = req.query as { search: string };
        const query = Skill.query()

        if (search) {
            const skillIds = await SkillEsRepository.search(search)
            query.whereIn("id", skillIds)
        }

        const skills = await query;

        res.json(skills)
    }
}