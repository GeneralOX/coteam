import { injectable } from "inversify";
import { Database } from "../database";

@injectable()
export class UsersRepository {
    constructor(private _dbcontext: Database) { }

    async all() {
        return await this._dbcontext.user.find({});
    }
    async one(obj: any) {
        return await this._dbcontext.user.findOne(obj);
    }
    async create(obj: any) {
        try {
            const r = await this._dbcontext.user.create(obj);
            return {
                success: true,
                data: r
            }
        }
        catch (err) {
            return {
                success: false
            }
        }
    }
    async update(id: string, obj: any) {
        return await this._dbcontext.user.findOneAndUpdate({ _id: id }, obj);
    }
    async delete(id: string) {
        return await this._dbcontext.user.findOneAndDelete({ _id: id })
    }
}