import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/generated/prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface AuthRequest extends ExpressRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthRequest) {
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('logut')
  // logout(@Request() req: AuthRequest) {
  //   return req.logout();
  // }
}
