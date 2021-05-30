import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Country from "../../models/Country";

export default class CountryController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const countries = await Country.query()

        res.json(countries)
    }
}
