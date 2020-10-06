import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateQuestionDto, VoteQuestion } from './dto/question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async getAllQuestion() {
    return await this.questionsService.getAllQuestions();
  }

  @Get('/:id')
  async getOneQuestion(@Param('id') id: string) {
    return await this.questionsService.getOneQuestion(id);
  }

  @Post('/add')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post('/:id/vote')
  async voteForQuestion(
    @Body() voteForQuestionBody: VoteQuestion,
    @Param('id') id: string,
  ) {
    return this.questionsService.voteQuestion(id, voteForQuestionBody);
  }

  @Delete('/:id')
  async deleteQuestion(@Param('id') id: string) {
    console.log(id);
    return await this.questionsService.deleteQuestion(id);
  }
}
