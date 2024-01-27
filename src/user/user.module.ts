import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Senior } from 'src/model/senior.entity';
import { Worker } from 'src/model/worker.entity';
import { UserRepository } from 'src/model/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Senior,
            Worker,
        ]),
        JwtModule.register({
            secret: process.env.SECRETORPRIVATE,
            signOptions: {
                expiresIn: '4h',
            },
            verifyOptions: {
                complete: false
            }
        })
    ],
    providers: [UserService, UserRepository],
    controllers: [UserController]
})
export class UserModule {}
