// src/invitations/invitation.entity.ts
import { Entity, ObjectIdColumn, Column, CreateDateColumn, ObjectId } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Invitation {

    @Field(() => String)
    @ObjectIdColumn()
    _id: ObjectId;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    senderUserId: string;

    @Field()
    @Column()
    instituteId: string;

    @Field()
    @Column()
    referralCode: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}