import { injectable } from "inversify";
import { GoalsRepository } from "../../data/repositories/goals.repository";

@injectable()
export class GoalsService {
    constructor(private readonly repo: GoalsRepository) { }


    async Create(obj: any) {
        const data = await this.repo.create(obj);
        return data;
    }

    async GetOne(id: String) {
        const data = await this.repo.one({ _id: id });
        return data;
    }
    
    async GetByUser(id: string) {
        const data = await this.repo.many({ owner: id });
        return data;
    }

    async GetByProject(id: string) {
        const data = await this.repo.many({ project: id });
        return data;
    }

    async update(id: string, obj: any) {
        const data = await this.repo.update(id, obj);
        return data;
    }

    async delete(id: string) {
        const data = await this.repo.delete(id);
        return data;
    }
}