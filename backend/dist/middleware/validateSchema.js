"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);
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
};
exports.validateSchema = validateSchema;
