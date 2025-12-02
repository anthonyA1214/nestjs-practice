import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

type User = {
  id: number;
  username: string;
};

interface AuthRequest extends ExpressRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: AuthRequest) {
    return req.user;
  }
}
