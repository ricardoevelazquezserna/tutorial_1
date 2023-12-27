import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas';

const SCHEMAS = [{ name: User.name, schema: UserSchema }];

@Module({
  imports: [MongooseModule.forFeature(SCHEMAS)],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
