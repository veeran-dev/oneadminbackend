// attendance.resolver.ts
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { AttendanceInput, AttendancePaginationInput } from './attendance.input';
import { Attendance, AttendanceWithBatchName, AttendanceWithName } from './attendance.entity';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => [Attendance])
  async markAttendance(@Args('attendanceData') attendanceData: AttendanceInput): Promise<Attendance[]> {
    return this.attendanceService.markAttendance(attendanceData);
  }

  @Mutation(()=>Attendance)
  async editAttendance(
    @Args('attendanceId') attendanceId: string,
    @Args('attendanceData') attendanceData: AttendanceInput): Promise<Attendance> {
      return this.attendanceService.editAttendance(attendanceId, attendanceData)
    }

  @Mutation(()=>Attendance)
  async toggleAttendance(
      @Args('attendanceId') attendanceId: string ): Promise<Attendance> {
        return this.attendanceService.toggleAttendance(attendanceId)
  }


  @Query(() => [AttendanceWithName])
  async getAttendance(
    @Args('instituteId') instituteId: string,
    @Args('batchId') batchId: string,
    @Args({ name: 'date', nullable: true }) date?: string,
  ): Promise<AttendanceWithName[]> {
    console.log("instituteId.......",instituteId)
    console.log("batchId.......",batchId)
    console.log("date.......",date)
    const attendance = await this.attendanceService.getAttendance(instituteId, batchId, date);
    console.log("resolver.........",attendance)
    return attendance;
  }

  @Query(()=>[AttendanceWithBatchName])
  async getAttendanceWithSid(
    @Args('studentId') studentId: string,
    @Args('pagination') pagination: AttendancePaginationInput,
  ): Promise<AttendanceWithBatchName[]>{

    console.log("studentId..................................",studentId)

    return this.attendanceService.getAttendanceByStudentId(studentId, pagination)
  }
}
