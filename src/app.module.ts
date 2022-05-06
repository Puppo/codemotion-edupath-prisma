import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IngredientsService } from './ingredients/ingredients.service';
import { IngredientsController } from './ingredients/ingredients.controller';

@Module({
  imports: [],
  controllers: [IngredientsController],
  providers: [PrismaService, IngredientsService],
})
export class AppModule {}
