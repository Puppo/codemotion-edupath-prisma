import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { IngredientsService } from '../../src/ingredients/ingredients.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Ingredients Integration', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;
  let service: IngredientsService;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, IngredientsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = app.get(IngredientsService);
    await app.init();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it('should insert an ingredient', async () => {
    const result = await service.insert('Test');

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Test',
      }),
    );
    const count = await prismaClient.ingredient.count();
    expect(count).toBe(1);
  });
});
