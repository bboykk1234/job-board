import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

const handler = nc<NextApiRequest, NextApiResponse>({ attachParams: true });

export default handler;