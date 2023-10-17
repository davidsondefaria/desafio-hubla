import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['id'])
@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: number; // TODO create a TransactionType

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  product: string;

  @Column({ nullable: false })
  value: number;

  @Column({ nullable: false })
  vendor: string;

  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
