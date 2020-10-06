import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    QuestionsModule,
  ],
})
export class AppModule {}
