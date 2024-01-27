import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { configDotenv } from 'dotenv'

configDotenv()

@Module({
	imports: [
		TypeOrmModule.forRoot({
		type: "mysql",
		autoLoadEntities: true,
		timezone: "Z",
		entities: [__dirname + '/**/entity/*.{js, ts}'],
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		synchronize: false, // false로 설정 안 하면 실행할 때마다 DB 날라감
				logging: false, // 로그찍기
				migrations: [__dirname + '/**/migrations/*.js'],
				migrationsTableName: 'migrations'
		}),
		UserModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
