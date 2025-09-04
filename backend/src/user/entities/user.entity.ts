import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', nullable: true })
   avatar: string | null;

   @Column({ type: 'varchar', length: 32 })
   name: string;

   @Column({ type: 'varchar', length: 32, unique: true })
   email: string;

   @Column({ type: 'varchar', length: 14, nullable: true })
   phone: string | null;

   @Column({ type: 'varchar' })
   password: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
