// payment.input.ts

import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PaymentInput {
  @Field()
  instituteId: string;

  @Field()
  studentId: string;

  @Field()
  batchId: string;

  @Field()
  amount: number;

  @Field()
  paidToDate: Date

  @Field()
  paymentStatus: 'Paid'|'Partially Paid'|'Pending';

  @Field()
  paymentType: 'Online' | 'Cash';
}

@InputType()
export class PaymentPaginationInput {

  @Field()
  @IsNumber()
  limit: number

  @Field()
  @IsNumber()
  offset: number
}
