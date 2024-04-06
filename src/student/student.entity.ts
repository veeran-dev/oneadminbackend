import { ObjectType, Field } from '@nestjs/graphql';
import { Batch } from 'src/batch/batch.entity';
import { Column, Entity, ObjectIdColumn, ObjectId, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Student {

  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Field()
  instituteId: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  fatherName: string;

  @Column()
  @Field()
  motherName: string;

  @Column()
  @Field()
  school: string;

  @Column()
  @Field()
  dob: string;

  @Column()
  @Field()
  contact1: string;

  @Column()
  @Field({ nullable: true })
  contact2?: string;

  @Column()
  @Field()
  addressLine1: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  addressLine2?: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  pincode: string;

  @Column()
  @Field()
  country: string;

  @Field(() => [String])
  @Column({ type: 'text', array: true, default: [] })
  batchId: string[];


  @UpdateDateColumn()
  @Field()
  lastEdited: Date;


  @Column({ default: () => new Date() })
  @Field()
  joinedOn: Date;
}
