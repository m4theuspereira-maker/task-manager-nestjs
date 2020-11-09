import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TaskStatus } from "../task-status.enun";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn({type: 'int'})
    id: number;
    
    @Column()
    title: string; 

    @Column()
    description: string; 

    @Column()
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User

    @Column()
    userId: string


}