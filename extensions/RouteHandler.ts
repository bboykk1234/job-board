import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import ModelNotFoundError from "../exceptions/ModelNotFoundError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res) => {
        if (err instanceof ModelNotFoundError) {
            res.status(err.code)
                .json({
                    message: err.message
                })
            return
        }
        console.log(err);

        res.status(500).json({
            message: "Internal server error"
        });
    },
    attachParams: true
});

export default handler;