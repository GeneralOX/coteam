import { injectable } from "inversify";
import mongoose from "mongoose";

import { usersModel } from "./models/users.model";
import { projectsModel } from "./models/projects.model";
import { goalsModel } from "./models/goals.model";

@injectable()
export class Database {
    private _db: typeof mongoose = mongoose;
    async connect() {
        this._db = await mongoose.connect(process.env.DATABASE_URI!, {
            dbName: process.env.DATABASE_NAME
        });

        this._db.model('User', usersModel)
        this._db.model('Goal', goalsModel)
        this._db.model('Project', projectsModel)

        console.log("[+] Database connected successfully.");
    }
    public user = this._db.model('User', usersModel);
    public project = this._db.model('Project', projectsModel);
    public goal = this._db.model('Goal', goalsModel);

}