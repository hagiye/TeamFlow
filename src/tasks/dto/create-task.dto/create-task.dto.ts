export class CreateTaskDto {
    title: string;
    status?: 'TODO' | 'INPROGRESS' | 'DONE';
    
}
