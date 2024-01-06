import { Module } from '@nestjs/common';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { BatchModule } from 'src/batch/batch.module';
import { StudentModule } from 'src/student/student.module';
import { UserModule } from 'src/user/user.module';
import { CommonResolver } from './common.resolver';
import { CourseModule } from 'src/course/course.module';


@Module({
    imports: [
        CourseModule,
        UserModule,
        BatchModule,
        StudentModule,
        AttendanceModule
    ],
    providers: [CommonResolver]
})
export class CommonModule {}
