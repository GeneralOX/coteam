import { injectable } from "inversify";
import mongoose from "mongoose";
import { UsersRepository } from "../../data/repositories/users.repository";
import { ProjectsRepository } from "../../data/repositories/projects.repository";

@injectable()
export class ProjectsService {
    constructor(private readonly repo: ProjectsRepository, private readonly usRepo: UsersRepository) { }

    async all() {
        return await this.repo.all();
    }

    async one(id: string) {
        return await this.repo.one({ _id: id });
    }

    async create(obj: any) {
        return await this.repo.create(obj);
    }

    async update(id: string, obj: any) {
        return await this.repo.update(id, obj);
    }

    async delete(id: string) {
        return await this.repo.delete(id);

    }

    async setLeader(project: string, leader: string) {
        return await this.repo.update(project, {
            leader
        });
    }

    async byLeader(leader: string) {
        const data = this.repo.many({ leader });
        return {
            success: true,
            data
        }
    }

    async addMember(id: string, member: string) {
        const project = await this.repo.one({ _id: id });
        if (project == null)
            return { success: false, data: "cannot find project" }
        const user = await this.usRepo.one({ _id: member });
        if (user == null)
            return { success: false, data: "cannot find user" }

        // Add member to project
        const members = (project.members as string[]);
        members.push(member);
        await this.repo.update(id, { members });

        // add project to member
        const projects = (user.projects as string[]);
        projects.push(id);
        await this.usRepo.update(member, { projects });

        return { success: true, data: null }
    }

    async removeMember(id: string, member: string) {
        const project = await this.repo.one({ _id: id });
        if (project == null)
            return { success: false, data: "cannot find project" }
        const user = await this.usRepo.one({ _id: member });
        if (user == null)
            return { success: false, data: "cannot find user" }

        let members = (project.members as string[]).filter((e => e != member));
        await this.repo.update(id, { members });

        let projects = (user.projects as string[]).filter((e => e != id));
        await this.usRepo.update(member, { projects });

        return { success: true, data: null }
    }

}