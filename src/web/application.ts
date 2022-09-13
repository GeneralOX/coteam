import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "../container";
import cors from 'cors';

import "./controllers/users.controller"
import "./controllers/auth.controller"
import "./controllers/projects.controller"

export class Application {
    async Setup() {
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {
            app.use(express.json())
            app.use(cors({ origin: '*' }));
        })

        const app = server.build()

        app.listen(process.env.PORT, () => {
            console.info(`[+] application run on http://localhost:${process.env.PORT}`)
        })
    }
}