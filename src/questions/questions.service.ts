import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.questions.create({
      data: {...createQuestionDto, userId}
    });
  }

  async findAll() {
    return await this.prisma.questions.findMany();
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({ where: {id}});
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const userId =1;
    return await this.prisma.questions.update({
      where: {id},
      data: updateQuestionDto
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({ where: { id }})
  }
}
