// student.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { BatchModule } from 'src/batch/batch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), forwardRef(() => BatchModule)],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
