import {body} from 'express-validator';

const schema = [
    body('nombre').isLength( {min: 3, max: 10}).withMessage('Debe cargar un nombre entre 3 y 10 caracteres'),
    body('email').isEmail().withMessage('email debe ser valido'),
    body('password').isLength( {min: 5}).withMessage('Debe tener mínimo 5 caracteres'),
];

export {schema as registerSchema };