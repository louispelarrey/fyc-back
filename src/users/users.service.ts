import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/roles/enums/role.enum";
import { Repository } from "typeorm";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    async findOne(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { id } });
        user.role = JSON.parse(user.role);

        return user;
    }

    async findByEmail(email: string): Promise<Users | undefined> {
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
        user.role = JSON.parse(user.role);

        return user;
    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async createUser(email: string, password: string, role: Role[], nickname: string): Promise<Users> {
        const user = new Users();
        user.email = email;
        user.password = password;
        user.role = JSON.stringify(role);
        user.nickname = nickname;
        return await this.usersRepository.save(user);
    }

    async updateUser(id: number, email: string, password: string): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { id } });
        user.email = email;
        user.password = password;
        return await this.usersRepository.save(user);
    }

    async deleteUser(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return await this.usersRepository.remove(user);
    }
    
}
