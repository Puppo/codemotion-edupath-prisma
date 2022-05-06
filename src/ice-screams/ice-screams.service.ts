import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IceScreamDto } from './ice-screams.dto';

@Injectable()
export class IceScreamsService {
  constructor(private readonly prismaService: PrismaService) {}

  async insert(name: string, ingredients: number[]): Promise<IceScreamDto> {
    const result = await this.prismaService.iceScream.create({
      data: {
        name,
        iceScreamIngredients: {
          create: ingredients.map((ingredientId) => ({
            ingredientId,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        iceScreamIngredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return {
      id: result.id,
      name: result.name,
      ingredients: result.iceScreamIngredients.map((item) => item.ingredient),
    };
  }
}
