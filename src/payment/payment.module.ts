// payment/payment.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { StudentModule } from 'src/student/student.module';
import { BatchModule } from 'src/batch/batch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), StudentModule, forwardRef(() => BatchModule)],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
