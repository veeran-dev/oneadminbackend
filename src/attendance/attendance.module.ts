
import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { StudentModule } from 'src/student/student.module';
import { BatchModule } from 'src/batch/batch.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Attendance]),
        StudentModule,
        BatchModule
    ],
    providers: [AttendanceResolver, AttendanceService],
    exports:[AttendanceService]
})
export class AttendanceModule {}
