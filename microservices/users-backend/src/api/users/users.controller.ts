import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateBulkUsersDto, CreateUserDto, FindAllParams } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Res() res: any, @Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return res.status(201).json(user);
  }

  @Post('bulk')
  async bulk(@Res() res: any, @Body() dto: CreateBulkUsersDto) {
    const inserted = await this.usersService.bulk(dto);

    const response = {
      statusCode: 201,
      message: `${inserted} users were created.`,
    };

    return res.status(201).json(response);
  }

  @Get()
  async findAll(@Res() res: any, @Query() params: FindAllParams) {
    const users = await this.usersService.findAll(params);
    return res.status(200).json(users);
  }
}
