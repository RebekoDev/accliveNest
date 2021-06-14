import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUri } from './server.config';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(dbUri)],
})
export class AppModule {}
