import { injectable } from "inversify";
import { randomBytes } from "crypto";
import { UsersRepository } from "../../data/repositories/users.repository";
import bcrypt from "bcryptjs";


@injectable()
export class UsersService {
    constructor(private readonly repo: UsersRepository) { }

    async GetUserById(id: string) {
        return await this.repo.one({ _id: id });
    }

    async GetAllUsers() {
        return await this.repo.all();
    }

    async GetGroupsUsers() {
        const data = await this.repo.all();
        const grouped = this.groupBy(data, "role");

        return {
            "developers": grouped["1"],
            "leaders": grouped["2"],
            "mangers": grouped["3"],
        }
    }

    async Create(dto: any) {
        const existingUser = await this.repo.one({ email: dto.email });
        if (existingUser) {
            return {
                success: false,
                message: "E-Mail address already exists."
            }
        }
        dto.password = await bcrypt.hash(dto.password, 12);
        dto.activationToken = ((randomBytes)(20)).toString("hex");

        const created = await this.repo.create(dto);
        if (created.success) {
            return {
                success: true,
                userId: created.data!._id,
                message: "User successfully created.",
            };
        }
        return {
            success: false,
            message: "Cannot create user try again!"
        };
    }

    async Update(id: string, obj: any) {
        const { password } = obj;
        if (password != undefined && password != "") {
            obj.password = await bcrypt.hash(password, 12);
        }
        return await this.repo.update(id, obj);
    }

    async Delete(id: string) {
        return await this.repo.delete(id);
    }

    async SetStatus(id: string, status: boolean) {
        return await this.repo.update(id, { active: status });
    }

    async DevProjects(id: string) {
        const user = await this.repo.one({ _id: id });
        const projects = (await user?.populate("projects"))?.projects;

        return projects;
    }

    private groupBy(xs: any[], key: string) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

}