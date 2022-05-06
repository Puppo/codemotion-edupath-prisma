import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IngredientsService } from './ingredients/ingredients.service';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IceScreamsService } from './ice-screams/ice-screams.service';
import { IceScreamsController } from './ice-screams/ice-screams.controller';

@Module({
  imports: [],
  controllers: [IngredientsController, IceScreamsController],
  providers: [PrismaService, IngredientsService, IceScreamsService],
})
export class AppModule {}
