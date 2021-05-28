import { NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import formidable from 'formidable'
import { NextApiRequestWithFiles, validationOptions } from "../../@types"

const formParser = (options: validationOptions) => {
    return (req: NextApiRequestWithFiles, res: NextApiResponse, next: NextHandler) => {
        const { single } = options;
        const form = formidable(options)

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            if (single && !files[single]) {
                res.status(400)
                    .json({
                        message: "File not found",
                    })
                return;
            }

            req.body = fields
            req.files = files
            req.file = files[single];

            next();
        });
    }
}

export default formParser;