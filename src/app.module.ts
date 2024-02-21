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
    MongooseModule.forRoot(
      'mongodb+srv://murilobalves1:weGPLfUbyUjNNCIA@cluster0.dack263.mongodb.net/?retryWrites=true&w=majority',
    ),
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
