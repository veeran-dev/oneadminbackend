import { Module } from '@nestjs/common';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { InstituteModule } from 'src/institute/institute.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course]),
        InstituteModule,
    ],
    providers: [CourseResolver, CourseService],
    exports:[CourseService]
})
export class CourseModule {}
