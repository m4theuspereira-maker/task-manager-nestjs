import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "./task-status.enun";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import { TaskRepository } from './pipes/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './pipes/task.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getTasks( 
        filterTaskDto: GetTaskFilterDto,
        user: User
        ):Promise<Task[]>{
        return this.taskRepository.getTasks(filterTaskDto, user)
    }

   async getTaskById(id: number, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({where:{id, userId: user.id}})

        if(!found){
            throw new NotFoundException(`id: ${id} not found`)
        }

        return found
    }    

    async deleteTaskById(id: number, user: User): Promise<void>{

        const result  = await this.taskRepository.delete({id, userId: user.id})

        if (result.affected === 0){
            throw new NotFoundException(`id ${id} not found`)
        }
        
        
    }
  
    async updateStatus(id: number, status: TaskStatus, user: User):Promise<Task>{
        const task = await this.getTaskById(id, user);
        (await task).status = status
         await task.save()
         return task
    }

  
    async createTask(createTaskDto: CreateTaskDto, user: User):Promise<Task>{
       return await this.taskRepository.creatTask(createTaskDto, user)
    }
   

    // async getTasksWithFilter(filterDto: GetTaskFilterDto): Promise<Task[]> {
    //     const { status, search } = filterDto;

    //     const tasks = this.getAllTasks()

    //     if (status) {
    //        this.tasks = (await tasks).filter( task => task.status ===  status)
    //     }

    //     if (search) {
    //         this.tasks = (await tasks).filter(task =>
    //         task.title.includes(search) ||
    //         task.description.includes(search))
    //     }
    //     return tasks
    // }

}
