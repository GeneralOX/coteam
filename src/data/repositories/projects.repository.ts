import { injectable } from "inversify";
import { Database } from "../database";



@injectable()
export class ProjectsRepository {
    constructor(private _dbcontext: Database) { }

    async all() {
        return await this._dbcontext.project.find({}).populate("leader");
    }
    async one(obj: any) {
        return await this._dbcontext.project.findOne(obj);
    }
    async many(obj: any) {
        return await this._dbcontext.project.find(obj);
    }
    async create(obj: any) {
        return await this._dbcontext.project.create(obj);
    }
    async update(id: string, obj: any) {
        return await this._dbcontext.project.findOneAndUpdate({ _id: id }, obj);
    }
    async delete(id: string) {
        return await this._dbcontext.project.findOneAndDelete({ _id: id })
    }
}