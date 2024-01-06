import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
@ObjectType()
export class Branch {

  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Field()
  instituteId: string;

  @Column()
  @Field()
  name: string;

  @Column({ default: false })
  @Field()
  mainBranch: boolean;

  @Column()
  @Field()
  pocName: string;

  @Column()
  @Field()
  pocMobile: string;


  @Field()
  @Column()
  streetAddress: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  pincode: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  country: string;
}
