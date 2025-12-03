import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('caps')
export class Cap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  code: string;

  @Column('text')
  friendlyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
