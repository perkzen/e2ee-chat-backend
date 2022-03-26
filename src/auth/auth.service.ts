import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hashData } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  async register(user: RegisterDto) {
    if (user.password1 !== user.password2) {
      throw new HttpException(
        "Passwords doesn't match!",
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const hashedPassword = await hashData(user.password1);
    const checkUser = await this.db.user.findFirst({
      where: { username: user.username },
    });

    if (checkUser) {
      throw new HttpException(
        'User with this username already in databse',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.db.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
}
