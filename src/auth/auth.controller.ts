import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      );;
  }

  @Post('register-cookies')
  async registerUserWithCookie(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    try {
      const { token, user } = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto)
      );

      res.cookie('Authentication', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      });

      return res.json({ token, user });
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Post('login-cookies')
  async loginUserWithCookie(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { token, user } = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto)
      );

      res.cookie('Authentication', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      });

      return res.json({ token, user });
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return {user, token}
  }
}
