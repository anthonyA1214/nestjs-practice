import { Controller, Get, Header, Param, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'no-store')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
