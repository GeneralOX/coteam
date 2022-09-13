import { injectable } from "inversify";
import { Database } from "../database";



@injectable()
export class GoalsRepository {
    constructor(private _dbcontext: Database) { }

    async all() {
        return await this._dbcontext.goal.find({}).populate("owner");
    }
    async one(obj: any) {
        return await this._dbcontext.goal.findOne(obj);
    }
    async many(obj: any) {
        return await this._dbcontext.goal.find(obj);
    }
    async create(obj: any) {
        return await this._dbcontext.goal.create(obj);
    }
    async update(id: string, obj: any) {
        return await this._dbcontext.goal.findOneAndUpdate({ _id: id }, obj);
    }
    async delete(id: string) {
        return await this._dbcontext.goal.findOneAndDelete({ _id: id })
    }
}