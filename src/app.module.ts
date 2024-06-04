import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'andre',
      password: 'andre',
      database: 'andre',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RequestModule,
  ],
})
export class AppModule {}

