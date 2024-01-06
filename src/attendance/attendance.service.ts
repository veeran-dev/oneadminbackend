// attendance.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Attendance, AttendanceWithBatchName, AttendanceWithName } from './attendance.entity';
import { AttendanceInput } from './attendance.input';
import { ObjectId } from 'mongodb';
import { Status } from './attendance.enum';
import { startOfDay, endOfDay, format } from 'date-fns';
import { StudentService } from 'src/student/student.service';
import { BatchService } from 'src/batch/batch.service';

interface AttendancePaginationInput {
  limit: number
  offset: number
}

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: MongoRepository<Attendance>,
    private readonly studentService: StudentService,
    private readonly batchService: BatchService
  ) {}

  async markAttendance(attendanceData: AttendanceInput): Promise<Attendance[]> {
    const data = attendanceData.students.map((student) => ({
      instituteId: attendanceData.instituteId,
      branchId: attendanceData.branchId,
      batchId: attendanceData.batchId,
      studentId: student._id,
      status: student.present === true ? Status.PRESENT:Status.ABSENT,
      dateTime: attendanceData.date,
    }));
  
    return await this.attendanceRepository.save(data);
  }

  async editAttendance(id:string, attendanceData: Partial<Attendance>): Promise<Attendance> {
    await this.attendanceRepository.update(id, attendanceData);
    return this.attendanceRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async toggleAttendance(id:string): Promise<Attendance>{
    const attendance = await this.attendanceRepository.findOne({
      where:{
        _id: new ObjectId(id)
      }
    })
    const newStatus = attendance.status === Status.PRESENT ? Status.ABSENT : Status.PRESENT;
    await this.attendanceRepository.update({ _id: new ObjectId(id) }, { status: newStatus });
    return attendance
  }

  async getAttendance(instituteId: string, batchId: string, date?: string): Promise<AttendanceWithName[]> {

    if(date === undefined || date === ''){
      let dummyDate = await this.attendanceRepository.find({
        where: {
          instituteId,
          batchId,
        },
        order: {
          dateTime: 'DESC',
        },
        take: 1,
      });
      let latestRecord = dummyDate.length > 0 ? dummyDate[0] : null;
      
      if(dummyDate.length === 0){
        return []
      }
      date = latestRecord.dateTime.toString()
    }

    const startOfDayDate = startOfDay(date);
    const endOfDayDate = endOfDay(date);
    

    const attendanceList = await this.attendanceRepository.find({
      where: {
        batchId: batchId,
        dateTime: {
          $gte: startOfDayDate.toISOString(),
          $lte: endOfDayDate.toISOString(),
        },
      },
    });
    console.log("attendanceList....",attendanceList)
    const attendanceListWithFullName: AttendanceWithName[] = await Promise.all(attendanceList.map(async (student) => {
      const studentData = await this.studentService.getStudentsById(student.studentId);
      return {
        ...student,
        fullName: studentData.firstName + ' ' + studentData.lastName,
      };
    }));
  
    return attendanceListWithFullName;
  }

  async getAttendanceByStudentId(studentId:string, pagination: AttendancePaginationInput):Promise<AttendanceWithBatchName[]>{

    console.log("getAttendanceByStudentId....",studentId, pagination)
    const { limit, offset } = pagination;

    const attendanceList = await this.attendanceRepository.find({
      where:{
        studentId: studentId,
      },
      take: limit,
      skip: offset,
    })

    console.log("attendanceList..........",attendanceList)

    const AttendanceWithBatchName: AttendanceWithBatchName[] = await Promise.all(attendanceList.map(async (attendance) => {
      const data = await this.batchService.getBatchByID(attendance.batchId);
      return {
        ...attendance,
        batchName: data.name,
      };
    }));
    console.log("attendanceListWithFullName...........",AttendanceWithBatchName)
    return AttendanceWithBatchName;
  }

  async getAttendanceByInstituteId(instituteId:string):Promise<Attendance[]>{
    return this.attendanceRepository.find({where:{instituteId:instituteId}})
  }
}
