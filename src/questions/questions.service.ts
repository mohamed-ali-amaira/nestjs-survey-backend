import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionSchema, QuestionDocument } from './questions.model';
import { CreateQuestionDto, VoteQuestion } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private QuestionsModel: Model<QuestionDocument>,
  ) {}

  async getAllQuestions() {
    return await this.QuestionsModel.find({});
  }

  async getOneQuestion(id: string) {
    return await this.QuestionsModel.findById(id);
  }

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const question = new this.QuestionsModel(createQuestionDto);
    return await question.save();
  }

  async editQuestion(id, createQuestionDto: CreateQuestionDto) {
    const question = this.QuestionsModel.findById(id);
    if ((await question).noVotes + (await question).yesVotes == 0) {
      this.QuestionsModel.findByIdAndUpdate(id, createQuestionDto);
      return question;
    }
    return null;
  }

  async voteQuestion(id: string, body: VoteQuestion) {
    const question = await this.QuestionsModel.findById(id);
    if (body.opinion === 'yes') {
      question.yesVotes++;
      await question.save();
      return question;
    } else if (body.opinion == 'no') {
      question.noVotes++;
      await question.save();
      return question;
    }

    return 'failed';
  }

  async deleteQuestion(id: string) {
    await this.QuestionsModel.findByIdAndDelete(id);
    return id;
  }
}
