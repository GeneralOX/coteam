import { injectable } from "inversify";
import { UsersRepository } from "../../data/repositories/users.repository";
import bcrypt from "bcryptjs";
import { JwtSign } from "../middleware/jwt";


@injectable()
export class AuthService {
    constructor(private readonly repo: UsersRepository) { }

    async Login(dto: any) {
        const user = await this.repo.one({ email: dto.email });
        if (!user) {
            return {
                success: false,
                message: "An user with this email could not be found."
            }
        }

        const isEqual = await bcrypt.compare(dto.password, user.password);
        if (!isEqual) {
            return {
                success: false,
                message: "Wrong password."
            }
        }
        const token = JwtSign(user._id)
        return {
            success: true,
            userId: user._id,
            message: "User successfully logged in.",
            token,
        };
    }
}