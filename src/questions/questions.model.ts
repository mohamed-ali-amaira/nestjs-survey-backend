import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  title: string;

  @Prop({ default: 0 })
  yesVotes: number;

  @Prop({ default: 0 })
  noVotes: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
