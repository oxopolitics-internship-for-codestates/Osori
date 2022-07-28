import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { users, userSchema } from '../users/users.schema';
import { WholemapController } from './wholemap.controller';
import { WholemapService } from './wholemap.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: users.name, schema: userSchema }]),
  ],
  controllers: [WholemapController],
  providers: [WholemapService],
  exports: [WholemapService],
})
export class WholemapModule {}
