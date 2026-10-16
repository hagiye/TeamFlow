import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service.js';  

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskService:TasksService,

    ){}

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.taskService.findOne(id);

    }


}



