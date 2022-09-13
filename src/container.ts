import { Container } from "inversify";
import { Database } from "./data/database";
import { GoalsRepository } from "./data/repositories/goals.repository";
import { ProjectsRepository } from "./data/repositories/projects.repository";
import { UsersRepository } from "./data/repositories/users.repository";
import { AuthService } from "./web/services/auth.service";
import { ProjectsService } from "./web/services/projects.service";
import { UsersService } from "./web/services/users.service";

export const container = new Container({
    defaultScope: "Singleton"
});

container.bind(Database).toSelf()

container.bind(UsersRepository).toSelf()
container.bind(GoalsRepository).toSelf()
container.bind(ProjectsRepository).toSelf()

container.bind(AuthService).toSelf()
container.bind(UsersService).toSelf()
container.bind(ProjectsService).toSelf()


