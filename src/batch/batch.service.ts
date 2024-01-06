// batch.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository, Repository } from 'typeorm';
import { Batch, BatchResponse } from './batch.entity';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';
import { BatchServiceInterface } from './batch.interface';
import { CourseService } from 'src/course/course.service';
import { BranchService } from 'src/branch/branch.service';
import { PaymentService } from 'src/payment/payment.service';
import { StudentService } from 'src/student/student.service';
import { endOfDay, format, startOfDay } from 'date-fns';


interface PaginationInput {
  limit: number
  offset: number
}

@Injectable()
export class BatchService implements BatchServiceInterface {
  
  constructor(
    @InjectRepository(Batch)
    private readonly batchRepository: MongoRepository<Batch>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly branchService: BranchService,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => StudentService)) private readonly studentService: StudentService,
    // private readonly paymentService: PaymentService
  ) {}

  async createBatch(batchData: Partial<Batch>): Promise<Batch> {
    const batch = this.batchRepository.create(batchData);
    return await this.batchRepository.save(batch);
  }

  async editBatch(batchId: string, batchData: Partial<Batch>): Promise<Batch> {
    await this.batchRepository.update(batchId, batchData);
    return this.batchRepository.findOne({
      where: { _id: new ObjectId(batchId) },
    });
  }

  async getBatchByID(batchId: string): Promise<Batch> {
    return await this.batchRepository.findOne({where:{_id:new ObjectId(batchId)}})
  }


  async getBatchesByInstituteAndBatchName(
    instituteId: string,
    batchName: string,
    pagination: PaginationInput
  ): Promise<BatchResponse[]> {
    const { limit, offset } = pagination;
    const query: any = { instituteId };
  
    if (batchName) {
      query.name = { $regex: new RegExp(batchName, 'i') };
    }
  
    const batches = await this.batchRepository.find({
      where: query,
      take: limit,
      skip: offset,
    });

    const batchesWithNames = await Promise.all(
      batches.map(async (batch) => {

        const courseName = await this.courseService.getCourseNameById(batch.courseId);
        const branchName = await this.branchService.getBranchNameById(batch.branchId);
        const staffName = await this.userService.getUserNameById(batch.staffIds);
        return {
          ...batch,
          courseName,
          branchName,
          staffName
        };
      })
    );

  
    return batchesWithNames;
  }
  


  async getBatchesByBranchAndBatchName(
    branchId: string,
    batchName: string,
  ): Promise<Batch[]> {
    const query: any = { branchId };

    if (batchName) {
      query.name = { $regex: new RegExp(batchName, 'i') };
    }

    const res = await this.batchRepository.find(query);

    return res;
  }


  async getBatchesByCourseId(
    courseId: string,
    name: string,
  ): Promise<Batch[]> {
    const query: any = { courseId };

    const res = await this.batchRepository.find(query);
    return res;
  }

  async getBatchesByBranchId(branchId: string, name?: string): Promise<string[]> {
    const query: any = {
      branchId,
    };
  
    if (name !== null && name !== undefined) {
      query.name = { $regex: new RegExp(name, 'i') };
    }
  
    const res = await this.batchRepository.find(query);
    const ids = res.map(b => String(b._id));
    
    return ids;
  }
  
  

  async getBatchById(batchId:string): Promise<Batch>{
    const batch = await this.batchRepository.findOne({where:{_id:new ObjectId(batchId)}});
    return batch;
  }

  async getBatchesById(batchId:string[]): Promise<Batch[]>{
    const batches = await this.batchRepository.find({where: {
      _id: {
        $in: batchId.map((id) => new ObjectId(id)),
      },
    },});

    return batches;
  }

  async getBatchWiseAnalytics(batchId:string, date:string): Promise<any[]>{
    
    if(!batchId){
      return []
    }
    const payments = await this.paymentService.getPaymentByBatchId(batchId, date);
    
    const batch = await this.studentService.getStudentsByBatchId(batchId)
    
    const result = batch.map(student => {
      
      const studentPayments = payments.filter(payment => payment.studentId === String(student._id));
      const isPaid = studentPayments.length > 0;
      return {
          studentId: String(student._id),
          studentName: `${student.firstName} ${student.lastName}`,
          isPaid: isPaid ? "Paid":"Pending",
          paymentDate: isPaid && studentPayments[0].paymentDate? format(studentPayments[0].paymentDate, 'PPpp'): "--",
      };
  });


    return result;
  }

  async getTodaysBatch(instituteId: string): Promise<Batch[]> {
    // Step 1: Get batches scheduled for today
    const today = new Date();
    const todayDayOfWeek = today.getDay();

    const batches = await this.batchRepository.find(
                      {
                        where:{
                            instituteId, 
                            days: this.getDayString(todayDayOfWeek),
                        }
                      });
    return batches;
  }

  private getDayString(dayOfWeek: number): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[dayOfWeek];
  }

}
