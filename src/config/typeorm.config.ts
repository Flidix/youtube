import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: ,
    host: ,
    port: 5432,
    username: ,
    password: ,
    database: ,
    autoLoadEntities: true,
    synchronize: true
})