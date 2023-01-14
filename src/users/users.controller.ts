import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Get()
    async findByEmail(email: string): Promise<Users | undefined> {
        return await this.usersService.findByEmail(email);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return await this.usersService.createUser(createUserDto.email, createUserDto.password, createUserDto.role, createUserDto.nickname);
    }

    @Put(':id')
    async updateUser(@Body() updateUserDto: UpdateUserDto, id: number): Promise<Users> {
        return await this.usersService.updateUser(id, updateUserDto.email, updateUserDto.password);
    }

    @Delete(':id')
    async deleteUser(id: number): Promise<Users> {
        return await this.usersService.deleteUser(id);
    }
}
