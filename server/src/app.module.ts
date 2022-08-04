import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';
import { UsersModule } from './users/users.module';
import { IssueModule } from './issue/issue.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      dbName: 'test3',
    }),
    CardModule,
    UsersModule,
    IssueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
