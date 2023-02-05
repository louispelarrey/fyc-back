import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/guards/roles.guards';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: number): Promise<Users> {
        return await this.usersService.findOne(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return await this.usersService.createUser(createUserDto.email, createUserDto.password, createUserDto.role, createUserDto.nickname);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put(':id')
    async updateUser(@Body() updateUserDto: UpdateUserDto, id: number): Promise<Users> {
        return await this.usersService.updateUser(id, updateUserDto.email, updateUserDto.password);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<Users> {
        return await this.usersService.deleteUser(id);
    }
}
