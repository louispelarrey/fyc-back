import { Role } from "src/roles/enums/role.enum";

export class CreateUserDto {
    email: string;
    password: string;
    role: Role[];
    nickname: string;
}