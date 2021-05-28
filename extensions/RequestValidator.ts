import withJoi from "next-joi";

const validate = withJoi({
    onValidationError: (_, res, err) => {
        return res.status(400).json(err);
    },
})

export default validate;