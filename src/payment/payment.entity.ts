// payment.entity.ts

import { Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';


@Entity()
@ObjectType()
export class Payment {

    @Field(()=>String)
    @ObjectIdColumn()
    _id: ObjectId;

    @Field()
    @Column()
    instituteId: string;

    @Column()
    @Field()
    studentId: string;

    @Column()
    @Field()
    batchId: string;

    @Column()
    @Field()
    amount: number;

    @Column()
    @Field()
    currency: string;

    @Column()
    @Field()
    paymentId: string; // Payment ID from Stripe

    @Column()
    @Field()
    paymentType: string;

    @Column()
    @Field()
    paymentStatus: string;

    @CreateDateColumn()
    @Field()
    paymentDate: Date;

    @Column()
    @Field()
    paidToDate: Date;

    @Column()
    @Field()
    stripeToken: string;

  // Other relevant fields can be added here

  constructor(
    studentId: string,
    batchId: string,
    amount: number,
    currency: string,
    paymentId: string,
    paymentType: string,
    paymentStatus: string,
    paymentDate: Date,
    stripeToken: string,
  ) {
    this.studentId = studentId;
    this.batchId = batchId;
    this.amount = amount;
    this.currency = currency;
    this.paymentId = paymentId;
    this.paymentType = paymentType;
    this.paymentStatus = paymentStatus;
    this.paymentDate = paymentDate;
    this.stripeToken = stripeToken;
  }
}


@Entity()
@ObjectType()
export class PaymentWithNames extends Payment {

  @Field()
  studentName: string;

  @Field()
  batchName: string;

  @Field()
  formattedPaymentDate: string;

  @Field()
  formattedPaidTo: string;
}