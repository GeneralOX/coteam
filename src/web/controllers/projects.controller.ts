import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { JwtVerify } from "../middleware/jwt";
import { ProjectsService } from "../services/projects.service";

@controller("/projects")
export class ProjectsController {
    constructor(private readonly _service: ProjectsService) { }

    @httpGet("/find/:id", ...[JwtVerify])
    async ProjectDetails(req: Request, res: Response) {
        const data = await this._service.one(req.params.id)
        return res.json({ success: true, data });
    }

    @httpGet("/find", ...[JwtVerify])
    async ProjectList(_: Request, res: Response) {
        const snd = await this._service.all()
        return res.json({ success: true, data: snd });
    }

    @httpGet("/leader", ...[JwtVerify])
    async ProjectListByLeader(_: Request, res: Response) {
        const snd = await this._service.byLeader(res.locals.id);
        return res.json({ success: true, data: snd });
    }

    @httpPost("/create", ...[JwtVerify])
    async Create(req: Request, res: Response) {
        const { title, description, leader } = req.body;
        const result = await this._service.create({ title, description, leader });
        return res.json(result);
    }

    @httpPost("/update/:id", ...[JwtVerify])
    async Update(req: Request, res: Response) {
        const { id } = req.params;
        const obj = req.body;
        console.log(id, obj);

        const result = await this._service.update(id, obj);
        return res.json(result);
    }

    @httpPost("/member/add/:id", ...[JwtVerify])
    async ProjectAddMember(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.body.id;

        const result = await this._service.addMember(id, userId);
        return res.json(result);
    }

    @httpPost("/member/remove/:id", ...[JwtVerify])
    async ProjectRemoveMember(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.body.id;

        const result = await this._service.removeMember(id, userId);
        return res.json(result);
    }
}