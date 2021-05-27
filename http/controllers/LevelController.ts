import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Level from "../../models/Level";

export default class LevelController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const levels = await Level.query()

        res.json(levels)
    }
}