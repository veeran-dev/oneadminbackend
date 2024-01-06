import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { PaymentInput } from "./payment.input";
import { Payment, PaymentWithNames } from "./payment.entity";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentService } from "src/student/student.service";
import { BatchService } from "src/batch/batch.service";
import { endOfMonth, format, startOfMonth } from "date-fns";

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: MongoRepository<Payment>,
        private readonly studentService: StudentService,
        @Inject(forwardRef(() => BatchService)) private readonly batchService: BatchService,
      ) {}

    
  async createPayments(paymentInput: PaymentInput): Promise<Payment> {
    const payment = paymentInput
    payment['currency'] = 'INR'
    payment['stripeToken'] = "";
    payment['paymentId'] = "";
    // payment.
    return this.paymentRepository.save(payment);
  }

async getPayments(instituteId, studentName, pagination): Promise<PaymentWithNames[]>{
    const { limit, offset } = pagination;

    const query: any = { instituteId: instituteId };

    if(studentName){
      console.log("studentName......",studentName)
      const student = await this.studentService.getStudentByName(studentName)
      console.log("student......",student)
      if (student) {
        let id = student.map(item => String(item._id))
        query.studentId = { $in: id };
      }
    }
    console.log("query....",query)
    console.log("query....",query.studentId)


    const payments =  await this.paymentRepository.find({
      where:query,
      take: limit,
      skip: offset,
    });

    const paymentsWithFullName = await Promise.all(payments.map(async (student) => {
      const studentData = await this.studentService.getStudentsById(student.studentId);
      const batchData = await this.batchService.getBatchById(student.batchId)
      return {
        ...student,
        studentName: studentData.firstName + ' ' + studentData.lastName,
        batchName: batchData.name,
        formattedPaymentDate: format(student.paymentDate, 'PPpp'),
        formattedPaidTo: format(student.paidToDate, 'MM-yyyy')
      };
    }));

    return paymentsWithFullName;
  }


  async getPaymentsWithSid(studentId, pagination): Promise<PaymentWithNames[]>{
    const { limit, offset } = pagination;

    const query: any = { studentId: studentId };


    const payments =  await this.paymentRepository.find({
      where:query,
      take: limit,
      skip: offset,
      order: {
        paymentDate: 'DESC',
      },
    });

    const paymentsWithFullName = await Promise.all(payments.map(async (student) => {
      const studentData = await this.studentService.getStudentsById(student.studentId);
      const batchData = await this.batchService.getBatchById(student.batchId)
      return {
        ...student,
        studentName: studentData.firstName + ' ' + studentData.lastName,
        batchName: batchData.name,
        formattedPaymentDate: format(student.paymentDate, 'PPpp'),
        formattedPaidTo: format(student.paidToDate, 'yyyy-MM')
      };
    }));

    return paymentsWithFullName;
  }

  async getPaymentByBatchId(batchId: string, paiddate:string): Promise<any> {
    // Assuming that 'paidToDate' is stored as a Date field in the Payment entity
    console.log("paiddate,....",paiddate)
    const date = new Date(paiddate)
    const startDate = startOfMonth(date)
    const endDate = endOfMonth(date)

    console.log("startDate..............",startDate)
    console.log("endDate..............",endDate)
    const payments = await this.paymentRepository.find({
      where: {
        batchId: batchId,
        paidToDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    });

    return payments
  }
}
