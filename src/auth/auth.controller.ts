import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiPreconditionFailedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { ILoginResponse } from '../types/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: 'New user created' })
  @ApiPreconditionFailedResponse({
    description: 'User with this username already exists',
  })
  @Post('/register')
  async registerUser(@Body() user: RegisterDto): Promise<User> {
    return await this.authService.register(user);
  }

  @ApiOkResponse({ description: 'Login successful.' })
  @Post('/login')
  async loginUser(@Body() user: LoginDto): Promise<ILoginResponse> {
    return await this.authService.login(user);
  }
}
