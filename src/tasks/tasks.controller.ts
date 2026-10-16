import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, 
Delete,
HttpCode,
HttpStatus,
Query,
DefaultValuePipe,
BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';  
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto.js';
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskService:TasksService,

    ){}

    @Get()
findAll(
  @Query('status') status?: string,
  @Query('page', new DefaultValuePipe(1), ParseIntPipe)
  page?: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
  limit?: number,
) {
  const allowedStatuses = [
    'TODO',
    'IN_PROGRESS',
    'DONE',
  ];

  if (status !== undefined &&
      !allowedStatuses.includes(status)) {
    throw new BadRequestException(
      'Invalid status. Use TODO, IN_PROGRESS or DONE',
    );
  }

  if (page! < 1 || limit! < 1 || limit! > 100) {
    throw new BadRequestException(
      'Page must be >= 1 and limit must be between 1 and 100',
    );
  }

  return this.taskService.findAll(status, page, limit);
}

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.taskService.findOne(id);

    }
    @Post()
    create(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.create(createTaskDto);

    }
   
@Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateTaskDto: UpdateTaskDto,
) {
  return this.taskService.update(id, updateTaskDto);
}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
remove(@Param('id', ParseIntPipe) id: number): void {
  this.taskService.remove(id);
}


}



