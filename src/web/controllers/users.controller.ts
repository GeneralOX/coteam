import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { JwtVerify } from "../middleware/jwt";
import { UsersService } from "../services/users.service";
import { UserRole } from "../middleware/authorization";

@controller("/users")
export class UsersController {
    constructor(private readonly _service: UsersService) { }

    @httpGet("/find", ...[JwtVerify])
    async UsersList(_: Request, res: Response) {
        const data = await this._service.GetAllUsers();
        return res.json({
            success: true,
            data
        })
    }

    @httpGet("/find/:id", ...[JwtVerify])
    async UsersDetails(req: Request, res: Response) {
        const { id } = req.params;
        const data = await this._service.GetUserById(id);
        return res.json({
            success: true,
            data
        })
    }

    @httpGet("/groups", ...[JwtVerify])
    async UsersGroupedList(_: Request, res: Response) {
        const data = await this._service.GetGroupsUsers();
        return res.json({
            success: true,
            data
        })
    }

    @httpGet("/projects", ...[JwtVerify])
    async DevProjects(_: Request, res: Response) {
        const data = await this._service.DevProjects(res.locals.id);
        return res.json({
            success: true,
            data
        })
    }

    @httpPost("/create", ...[JwtVerify])
    async UserCreate(req: Request, res: Response) {
        const sender = await this._service.GetUserById(res.locals.id);

        if (sender?.role == UserRole.MANGER) {
            const { name, email, password, role } = req.body;
            const result = await this._service.Create({ name, email, password, role });
            return res.json(result);
        }

        return res.status(401).json({ success: false, message: "User is not authenticated.", sender });
    }

    @httpPost("/update", ...[JwtVerify])
    async UserUpdate(req: Request, res: Response) {
        const id = res.locals.id;
        const sender = await this._service.GetUserById(id);

        if (sender?.role == UserRole.MANGER) {
            const { name, email, password, role } = req.body;
            const result = await this._service.Update(id, { name, email, password, role });
            return res.json(result);
        }

        return res.status(401).json({ success: false, message: "User is not authenticated.", sender });
    }

    @httpPost("delete/:id", ...[JwtVerify])
    async Delete(req: Request, res: Response) {
        const sender = await this._service.GetUserById(res.locals.id);
        if (sender?.role == UserRole.MANGER) {
            await this._service.Delete(req.params.id);
            return res.json({ success: true, data: null });
        }
        return res.status(401).json({ success: false, message: "User is not authenticated." });
    }

    @httpPost("block/:id", ...[JwtVerify])
    async Block(req: Request, res: Response) {
        const sender = await this._service.GetUserById(res.locals.id);
        if (sender?.role == UserRole.MANGER) {
            await this._service.SetStatus(req.params.id, false);
            return res.json({ success: true, data: null });
        }
        return res.status(401).json({ success: false, message: "User is not authenticated." });
    }

    @httpPost("unblock/:id", ...[JwtVerify])
    async UnBlock(req: Request, res: Response) {
        const sender = await this._service.GetUserById(res.locals.id);
        if (sender?.role == UserRole.MANGER) {
            await this._service.SetStatus(req.params.id, true);
            return res.json({ success: true, data: null });
        }
        return res.status(401).json({ success: false, message: "User is not authenticated." });
    }

}