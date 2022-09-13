import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { JwtVerify } from "../middleware/jwt";
import { GoalsService } from "../services/goals.service";

@controller("/goals")
export class GoalsController {
    constructor(private readonly _service: GoalsService) { }


    @httpGet("/find/:id", ...[JwtVerify])
    async GoalDetails(req: Request, res: Response) {
        const data = await this._service.GetOne(req.params.id)
        return res.json({ success: true, data });
    }

    @httpGet("/user/:id", ...[JwtVerify])
    async GoalsByUser(req: Request, res: Response) {
        const data = await this._service.GetByUser(req.params.id)
        return res.json({ success: true, data });
    }

    @httpGet("/project/:id", ...[JwtVerify])
    async GoalsByProject(req: Request, res: Response) {
        const data = await this._service.GetByProject(req.params.id);
        return res.json({ success: true, data });
    }

    @httpPost("/update/:id", ...[JwtVerify])
    async GoalUpdate(req: Request, res: Response) {
        const { title, description, status } = req.body;
        const data = await this._service.update(req.params.id, { title, description, status });
        return res.json({ success: true, data });
    }
}