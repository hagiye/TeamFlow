
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto.js';

@Injectable()
export class TasksService {
  private readonly tasks = [
    { id: 1, title: 'Learn NestJS', status: 'TODO' },
    { id: 2, title: 'Build TeamFlow API', status: 'IN_PROGRESS' },
    { id: 3, title: 'Learn PostgreSQL', status: 'TODO' },
    { id: 4, title: 'Learn Dependency Injection', status: 'TODO' },
  ];

  
findAll(
  status?: string,
  page: number = 1,
  limit: number = 10,
) {
  const filteredTasks = status
    ? this.tasks.filter(task => task.status === status)
    : this.tasks;

  const total = filteredTasks.length;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = filteredTasks.slice(
    startIndex,
    endIndex,
  );

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

  
update(id: number, updateTaskDto: UpdateTaskDto) {
  const task = this.findOne(id);

  if (updateTaskDto.title !== undefined) {
    task.title = updateTaskDto.title;
  }

  if (updateTaskDto.status !== undefined) {
    task.status = updateTaskDto.status;
  }

  return task;
}


remove(id: number): void {
  const index = this.tasks.findIndex(
    (task) => task.id === id,
  );

  if (index === -1) {
    throw new NotFoundException(
      `Task with ID ${id} not found`,
    );
  }

  this.tasks.splice(index, 1);
}

}









  