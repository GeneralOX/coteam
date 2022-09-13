



import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function JwtSign(id: any) {
    return jwt.sign(
        { userId: id.toString() },
        process.env.JWT_KEY
    );
}
export function JwtVerify(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;

    if (token == undefined) {
        res.status(401).json({
            success: false,
            message: "User is not authenticated."
        });
        return;
    }

    const { userId } = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
    res.locals.id = userId;

    next();
};