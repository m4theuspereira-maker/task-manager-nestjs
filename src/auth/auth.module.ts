import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}), 
        JwtModule.register({
            secret:'topSecret',
            signOptions:{
                expiresIn:3600
            }
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy],
    exports:[
        JwtStrategy, 
        PassportModule
    ]
})
export class AuthModule { }
