import { User } from '@/user/entities/user.entity';
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', length: 100 })
   title: string;

   @Column({ type: 'varchar', length: 190 })
   description: string;

   @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
   priority: 'low' | 'medium' | 'high';

   @Column({
      type: 'enum',
      enum: ['pending', 'in_progress', 'done', 'canceled'],
      default: 'pending',
   })
   status: 'pending' | 'in_progress' | 'done' | 'canceled';

   @Column({ type: 'timestamp' })
   date: Date;

   @Column({ type: 'varchar', nullable: true })
   image: string | null;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @ManyToOne(() => User, (user) => user.todos)
   @JoinColumn({ name: 'user_id' })
   user: User;
}
