import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, user_Schema } from 'src/schema/user.schema';
import { UsersController } from './users.controller';

import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: user_Schema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
