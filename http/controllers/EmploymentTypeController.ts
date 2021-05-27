import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import EmploymentType from "../../models/EmploymentType";

export default class EmploymentTypeController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const employmentTypes = await EmploymentType.query()

        res.json(employmentTypes)
    }
}