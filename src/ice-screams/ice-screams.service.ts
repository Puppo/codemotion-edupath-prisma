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

  async search(opts: {
    terms?: string;
    offset: number;
    limit: number;
  }): Promise<IceScreamDto[]> {
    const result = await this.prismaService.iceScream.findMany({
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
      skip: opts.offset,
      take: opts.limit,
      where: !opts.terms
        ? undefined
        : {
            OR: [
              {
                name: {
                  contains: opts.terms,
                },
              },
              {
                iceScreamIngredients: {
                  some: {
                    ingredient: {
                      name: {
                        contains: opts.terms,
                      },
                    },
                  },
                },
              },
            ],
          },
    });

    return result.map((iceScream) => ({
      id: iceScream.id,
      name: iceScream.name,
      ingredients: iceScream.iceScreamIngredients.map(
        (item) => item.ingredient,
      ),
    }));
  }
}
