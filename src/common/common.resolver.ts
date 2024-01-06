import { Resolver } from "@nestjs/graphql";
import { AttendanceService } from "src/attendance/attendance.service";
import { BatchService } from "src/batch/batch.service";
import { CourseService } from "src/course/course.service";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { BatchAnalytics, CommonData } from "./common.entity";
import {Query, Args} from "@nestjs/graphql"
import { Institute } from "src/institute/institute.entity";


@Resolver()
export class CommonResolver{

    constructor(
        private readonly courseService:CourseService,
        private readonly batchService:BatchService,
        private readonly userService:UserService,
        private readonly attendanceService:AttendanceService,
        private readonly studentService:StudentService
    ){}

    @Query(()=>CommonData)
    async getStepsByInstituteId(@Args('instituteId') instituteId: string): Promise<CommonData> {
        let steps=0;
        //first course
        const course = await this.courseService.getCourseByInstituteId(instituteId,"")
        if(course.length>0){
            steps++
        }
        
        //count steps
        const users = await this.userService.getUserWithInstituteId(instituteId)
        if(users.length>0){
            steps++
        }

        //check batch
        const batches = await this.batchService.getBatchesByInstituteAndBatchName(instituteId, "", {limit:null, offset:null})
        if(batches.length>0){
            steps++
        }
        
        //count students
        const students = await this.studentService.getStudentsByInstituteId(instituteId, {limit:null, offset:null}, "")
        if(students.length>0){
            steps++
        }

        //count attendance
        const attendances = await this.attendanceService.getAttendanceByInstituteId(instituteId)
        if(attendances.length>0){
            steps++
        }

        
        return {steps}
    }

    @Query(()=>[BatchAnalytics])
    async getBatchAnalytics(@Args('instituteId') instituteId:string){
        
        const today = new Date();

        //get batches
        const batches = await this.batchService.getTodaysBatch(instituteId)
        console.log("common batches ", batches.length)
        if(batches.length === 0){
            return []
        }
        //get attendance and analyse
        const analyticsPromises = batches.map(async (batch) => {
            const attendance = await this.attendanceService.getAttendance(
              instituteId,
              String(batch._id), // Replace with the actual property representing batch ID
              today.toString(),
            );
      
            const presentCount = attendance.filter((entry) => entry.status === 'present').length;
            const absentCount = attendance.filter((entry) => entry.status === 'absent').length;
                
            console.log("common attendance ", attendance)
            const students = await this.studentService.getStudentsByBatchId(String(batch._id))

            return {
              batchId: String(batch._id),
              batchName: batch.name,
              presentCount,
              absentCount,
              startTime: batch.startTime,
              studentsCount: students.length,
            };
        });
      
        const batchAnalytics = await Promise.all(analyticsPromises);

        return batchAnalytics;
    }

}