import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "User not authorized"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(401, "Token is not valid"));
        }
        req.loggedUser = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {    
    verifyToken(req, res, () => {
        if (req.loggedUser?.id === req.params.id || req.loggedUser?.isAdmin) {
            next();
        } else {
            return next(createError(403, "You're not authorized to perform this action"));
        }
    });
}

export const verifyAdmin = (req, res, next) => {    
    verifyToken(req, res, () => {
        if (req.loggedUser?.isAdmin) {
            next();
        } else {
            return next(createError(403, "You're not authorized to perform this action"));
        }
    });
}