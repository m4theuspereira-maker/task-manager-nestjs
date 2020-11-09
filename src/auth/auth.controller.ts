import { Body, Controller,  Post,    UseGuards,    ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { GetUser } from "./gte-user.decoratior";
import { User } from "./user.entity";


@Controller('auth')
export class AuthController{

    constructor(private authService: AuthService){}

    @Post('/signup')                    
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.authService.singUp(authCredentialsDto)
        console.log(authCredentialsDto)
    }

    @Post('/signin')
     signIn(@Body(ValidationPipe) authCredentalsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
      return  this.authService.signIn(authCredentalsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log(user)
    }
 
}