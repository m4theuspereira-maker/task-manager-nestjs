import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatus } from "./task-status.enun";
import {TasksService} from './tasks.service'
import {CreateTaskDto} from './dto/create-task.dto'
import { GetTaskFilterDto } from './dto/get-tasks.dto';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipes'
import { Task } from './pipes/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/gte-user.decoratior';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
   constructor(private tasksService: TasksService){ }

   @Get()
   async getAllTasks(
      @Query(ValidationPipe) 
      filterTasksDto: GetTaskFilterDto,
      @GetUser() user: User ): Promise<Task[]> {
      return this.tasksService.getTasks(filterTasksDto, user)
    }

   @Post()
   @UsePipes(ValidationPipe)   
   async createTask
   (@Body() createTaskDto: CreateTaskDto,
   @GetUser() user:User
   ): Promise<Task>{
      return await this.tasksService.createTask(createTaskDto, user)
   }

   
      @Get('/:id')
      async getTaskById(
         @Param('id', ParseIntPipe) id: number,
         @GetUser() user: User
         ): Promise<Task>{
         return this.tasksService.getTaskById(id, user)
      }

    

      @Delete('/:id')
      async deleteTaskById(
         @Param('id', ParseIntPipe) id: number,
         @GetUser() user: User): Promise<void>{
         return  this.tasksService.deleteTaskById(id, user)
      }

      @Patch('/:id/status')
      async updateTaskStatus(
         @Param('id', ParseIntPipe) id: number, 
         @Body('status', TaskStatusValidationPipe ) status: TaskStatus,
         @GetUser() user: User
      ): Promise<Task>{
         return this.tasksService.updateStatus(id, status, user)
      }

//       @Post()
//       @UsePipes(ValidationPipe)
//       async createTask(
//       @Body() createTaskDto: CreateTaskDto
//       ): Promise<Task>{
//          return this.tasksService.createTask(createTaskDto)
//       }
}
