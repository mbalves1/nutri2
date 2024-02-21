import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { SnackModule } from './snack/snack.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    IngredientsModule,
    SnackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
