import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {RequestModule} from './request/request.module';
import {ConfigModule} from "@nestjs/config";
import configurations from './configuration';
import {ChatModule} from "./chat/chat.module";
import {MessageModule} from "./chat/message.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [configurations]}),
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
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {
}

