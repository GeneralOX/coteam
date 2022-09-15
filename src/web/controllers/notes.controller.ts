import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";

import { UsersService } from "../services/users.service";

@controller("/notes")
export class NotesController {
    constructor(private readonly _service: UsersService) { }

    @httpPost("/tl/:id")
    async TeamLeaderNote(req: Request, res: Response) {
        const { id } = req.params;
        const { note } = req.body;

        await this._service.Update(id, { note_tl: note });
        return res.json({ success: true, data: "Note Updated" });
    }

    @httpPost("/mn/:id")
    async MangerNote(req: Request, res: Response) {
        const { id } = req.params;
        const { note } = req.body;

        await this._service.Update(id, { note_mn: note });
        return res.json({ success: true, data: "Note Updated" });

    }

    @httpPost("/ad/:id")
    async AdNote(req: Request, res: Response) {
        const { id } = req.params;
        const { note } = req.body;

        await this._service.Update(id, { note_ad: note });
        return res.json({ success: true, data: "Note Updated" });

    }

    @httpPost("/tl/:id")
    async AbNote(req: Request, res: Response) {
        const { id } = req.params;
        const { note } = req.body;

        await this._service.Update(id, { note_ab: note });
        return res.json({ success: true, data: "Note Updated" });

    }
}