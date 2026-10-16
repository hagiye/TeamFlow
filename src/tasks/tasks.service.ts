
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto.js';
@Injectable()
export class TasksService {
  private readonly tasks = [
    { id: 1, title: 'Learn NestJS', status: 'TODO' },
    { id: 2, title: 'Build TeamFlow API', status: 'IN_PROGRESS' },
    { id: 3, title: 'Learn PostgreSQL', status: 'TODO' },
    { id: 4, title: 'Learn Dependency Injection', status: 'TODO' },
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto){
    const newId = Math.max(0,...this.tasks.map((task) => task.id)) +1;
    const newTask = {
        id: newId,
        title: createTaskDto.title,
        status: createTaskDto.status ?? 'TODO',
    };

    this.tasks.push(newTask);
    return newTask;





  }
}
