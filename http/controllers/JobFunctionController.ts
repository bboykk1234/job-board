import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import JobFunction from "../../models/JobFunction";

export default class JobFunctionController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const jobFunctions = await JobFunction.query()

        res.json(jobFunctions)
    }
}