import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Company from "../../models/Company";

export default class CompanyController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const companies = await Company.query()

        res.json(companies)
    }
}