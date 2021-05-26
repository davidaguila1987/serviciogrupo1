import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userModel from '../models/userModel';

export async function validationSingUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("partials/signupForm", {
            error: errors.array()
        })
    }
    next();
}

