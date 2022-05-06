import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private readonly prismaService: PrismaService) {}

  insert(name: string): Promise<{ id: number; name: string }> {
    return this.prismaService.ingredient.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
