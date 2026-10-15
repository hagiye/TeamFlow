
import { Injectable } from '@nestjs/common';
import { title } from 'process';
@Injectable()
export class TasksService {
  private readonly tasks = [
    {
      id: 1,
      title: 'Learn NestJS',
      status: 'TODO',
    },
    {
      id: 2,
      title: 'Build TeamFlow API',
      status: 'IN_PROGRESS',
    },
    {
      id: 3,
      title: 'Learn PostgreSQL',
      status: 'TODO',
    },
  ];

  findAll() {
    return this.tasks;
  }
}
