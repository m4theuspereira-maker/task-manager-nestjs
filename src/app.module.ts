import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig)],

})
export class AppModule { }
