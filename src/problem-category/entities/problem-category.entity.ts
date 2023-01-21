import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  Relation,
  JoinColumn,
} from 'typeorm';

import { ProblemType } from '../../problem-types/entities/problem-type.entity';
import { Issue } from '../../issue/entities/issue.entity';
@Entity()
@Unique(['name'])
export class ProblemCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => ProblemType,
    (problem_type: ProblemType) => problem_type.problem_category,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  problem_types: Relation<ProblemType[]>;

  @OneToMany(() => Issue, (issue: Issue) => issue.problem_category, {
    nullable: true,
  })
  issues: Relation<Issue[]>;
}
