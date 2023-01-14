import { Repository } from "typeorm";
import { Users } from "./users.entity";

export class UsersRepository extends Repository<Users> {

    async findAll(): Promise<Users[]> {
        return await this.find();
    }

    async findByEmail(email: string): Promise<Users | undefined> {
        return await this.findOne({
            where: {
                email: email
            }
        });
    }

    async createUser(email: string, password: string): Promise<Users> {
        const user = new Users();
        user.email = email;
        user.password = password;
        return await this.save(user);
    }

    async updateUser(id: number, email: string, password: string): Promise<Users> {
        const user = await this.findOne({ where: { id } });
        user.email = email;
        user.password = password;
        return await this.save(user);
    }

    async deleteUser(id: number): Promise<Users> {
        const user = await this.findOne({ where: { id } });
        return await this.remove(user);
    }
}

