export var validateSchema = function (schema) { return function (req, res, next) {
    try {
        var result = schema.safeParse(req.body);
        if (!result.success) {
            return res
                .status(400)
                .json({ errors: result.error.flatten().fieldErrors });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ errors: ["Internal server error"] });
    }
}; };
