import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { AuthService } from "../services/auth.service";

@controller("/auth")
export class AuthController {
    constructor(private readonly _service: AuthService) { }

    @httpPost("/login")
    async Login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this._service.Login({ email, password });
        return res.json(result);
    }
}