import { Public } from '@/common/guards/auth.guard';
import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';
import { Controller, Get, Inject } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Controller('llm')
export class LlmController {

  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {

  }
  /**
   * 获取大模型的module列表
   * @returns 
   */
  @Public()
  @Get('list')
  async getAllModels() {
    const ret = await this.prisma.client.model.findMany();
    return ret.map(({id,name,label}) => ({
      id,name,label
    }));
  }
}
