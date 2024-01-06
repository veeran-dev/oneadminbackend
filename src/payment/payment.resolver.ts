import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Payment, PaymentWithNames } from './payment.entity';
import { PaymentInput, PaymentPaginationInput } from './payment.input';
import { PaymentService } from './payment.service';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async addPayment(
    @Args('paymentInput') paymentInput: PaymentInput,
  ): Promise<Payment> {
    // Mutation logic to create payments
    const createdPayments =
      await this.paymentService.createPayments(paymentInput);
    return createdPayments;
  }

  @Query(()=>[PaymentWithNames])
  async getPayments(
    @Args('instituteId') instituteId: string,
    @Args('studentName') studentName: string,
    @Args('pagination') pagination: PaymentPaginationInput
  ): Promise<PaymentWithNames[]>{
    const payments = await this.paymentService.getPayments(instituteId, studentName, pagination)
    console.log(payments)
    return payments
  }


  @Query(()=>[PaymentWithNames])
  async getPaymentsWithSid(
    @Args('studentId') studentId: string,
    @Args('pagination') pagination: PaymentPaginationInput
  ): Promise<PaymentWithNames[]>{
    const payments = await this.paymentService.getPaymentsWithSid(studentId, pagination)
    // console.log(payments)
    return payments
  }

}
