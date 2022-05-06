import { Ingredient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientsService } from './ingredients.service';

describe('IngredientsService', () => {
  let prismaService: DeepMockProxy<PrismaService>;
  let service: IngredientsService;

  beforeEach(async () => {
    prismaService = mockDeep<PrismaService>();
    service = new IngredientsService(prismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run create ingredient', () => {
    prismaService.ingredient.create.mockResolvedValue({
      id: 1,
      name: 'Ingredient',
    } as Ingredient);

    expect(service.insert('Ingredient Input')).resolves.toEqual({
      id: 1,
      name: 'Ingredient',
    });
    expect(prismaService.ingredient.create.mock.calls.length).toBe(1);
    expect(prismaService.ingredient.create.mock.calls[0][0]).toEqual({
      data: {
        name: 'Ingredient Input',
      },
      select: {
        id: true,
        name: true,
      },
    });
  });
});
