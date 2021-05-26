"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('nombre').isLength({ min: 3, max: 10 }).withMessage('Debe cargar un nombre entre 3 y 10 caracteres'),
    express_validator_1.body('email').isEmail().withMessage('email debe ser valido'),
    express_validator_1.body('password').isLength({ min: 5 }).withMessage('Debe tener mínimo 5 caracteres'),
];
exports.registerSchema = schema;
//# sourceMappingURL=register-schema.js.map