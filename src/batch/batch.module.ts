import { Module, forwardRef } from '@nestjs/common';
import { BatchResolver } from './batch.resolver';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from './batch.entity';
import { InstituteModule } from 'src/institute/institute.module';
import { UserModule } from 'src/user/user.module';
import { BranchModule } from 'src/branch/branch.module';
import { CourseModule } from 'src/course/course.module';
import { PaymentModule } from 'src/payment/payment.module';
import { StudentModule } from 'src/student/student.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Batch]),
        InstituteModule,
        BranchModule,
        forwardRef(() => UserModule),
        CourseModule,
        BranchModule,
        forwardRef(() => PaymentModule),
        forwardRef(()=>StudentModule)
        
        
    ],
    providers: [
        BatchResolver, 
        BatchService,
    ],
    exports:[BatchService]
})
export class BatchModule {}
