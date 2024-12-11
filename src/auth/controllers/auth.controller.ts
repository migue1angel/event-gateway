import {
  Controller,
  Post,
  Body,
  Inject,
  Request,
  Get,
  UseGuards,
  Res,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../dto/user/login.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { GoogleAuthGuard } from 'src/shared/guards/google-auth.guard';
import passport from 'passport';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await firstValueFrom(
        this.client.send('login', loginDto),
      );
    } catch (err) {
      console.log(err);  
      throw new RpcException(err);
    }
  }
 
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await firstValueFrom(
      this.client.send('register', createUserDto),
    );
    return response;
  }

  @UseGuards(AuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req: Request) {
    const response = req['user'];
    return response;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Auth' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Request() req, @Res() res) {
    return res.redirect('http://localhost:4200/auth/success/' + req.user.token);
  }
}
