// student.service.ts
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentInput } from './student.input';
import { ObjectId } from 'mongodb';
import { BatchService } from 'src/batch/batch.service';
import { Batch } from 'src/batch/batch.entity';

interface PaginationInput {
  limit: number;
  offset: number;
}

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => BatchService)) private readonly batchService: BatchService,
    // private readonly batchService: BatchService,
  ) {}

  async createStudent(studentData: StudentInput): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    student['batchId'] = [];
    return await this.studentRepository.save(student);
  }

  async editStudent(
    studentId: string,
    studentData: StudentInput,
  ): Promise<Student> {
    await this.studentRepository.update(studentId, studentData);
    return this.studentRepository.findOne({
      where: { _id: new ObjectId(studentId) },
    });
  }

  async addStudentToBatch(studentId: string, batchId: string): Promise<void> {
    const student: Student = await this.studentRepository.findOne({
      where: { _id: new ObjectId(studentId) },
    });
    const batch = await this.batchService.getBatchById(batchId);
    try {
        console.log('student.batches...', student.batchId);
        let batches = student.batchId;
        let existingBatch = student.batchId.includes(String(batch._id));
        console.log('existingBatch...', existingBatch);
        if (existingBatch) {
          throw new Error('Batch already added');
        }
        batches.push(batchId);
        console.log('batches...', batches);

        await this.studentRepository.update(
          { _id: new ObjectId(studentId) },
          { batchId: batches },
        );

    } catch (err) {
      console.log('error is...', err);
      throw new Error(err);
    }
  }

  async removeStudentFromBatch(
    studentId: string,
    batchId: string,
  ): Promise<void> {
    try {
      const student = await this.studentRepository.findOne({
        where: { _id: new ObjectId(studentId) },
      });
      const batch = await this.batchService.getBatchById(batchId);

      if (student && student.batchId && student.batchId.length <= 0 && batch) {
        let batches = student.batchId;
        console.log('batches...', batches);

        let existingBatch = batches.includes(String(batch._id));

        if (!existingBatch) {
          throw new Error('Student ID not available in this Batch');
          return;
        }
        batches = batches.filter(
          (existingBatch) => existingBatch !== String(batch._id),
        );
        console.log('batches...', batches);

        await this.studentRepository.update(
          { _id: new ObjectId(studentId) },
          { batchId: batches },
        );
      } else {
        throw new Error('Invalid Student or Batch ID');
      }
    } catch (err) {
      console.error('Error removing student from batch:', err);
      throw new Error(err);
    }
  }

  async getStudentsByBranchId(
    branchId: string,
    studentName?: string,
    batchName?: string,
  ): Promise<Student[]> {
    const batches = await this.batchService.getBatchesByBranchId(
      branchId,
      batchName,
    );
    if (batches.length === 0) {
      return [];
    }
    const query: any = {};

    if (studentName) {
      query.$or = [
        { firstName: { $regex: new RegExp(studentName, 'i') } },
        { lastName: { $regex: new RegExp(studentName, 'i') } },
      ];
    }

    if (batches.length > 0) {
      query['batches._id'] = {
        $in: batches.map((batch) => new ObjectId(batch)),
      };
    }

    console.log('query is...', query);
    // Find students based on the constructed query
    return this.studentRepository.find(query);
  }

  async getStudentsById(studentId: string): Promise<Student> {
    const s = await this.studentRepository.findOne({
      where: { _id: new ObjectId(studentId) },
    });
    return s;
  }

  async getStudentsByInstituteId(
    instituteId: string,
    pagination: PaginationInput,
    name?: string,
  ): Promise<Student[]> {
    const { limit, offset } = pagination;

    const query: any = { instituteId: instituteId };

    if (name) {
      query.$or = [
        { firstName: new RegExp(name, 'i') },
        { lastName: new RegExp(name, 'i') },
        { contact1: new RegExp(name, 'i') },
        { contact2: new RegExp(name, 'i') },
      ];
    }
    console.log(query);

    return await this.studentRepository.find({
      where: query,
      take: limit,
      skip: offset,
    });
  }

  async getStudentsByBatchId(batchId: string): Promise<Student[]> {
    const query: any = {};

    console.log('batchId...', batchId);
    const students = await this.studentRepository.find({
      where: {
        batchId: batchId,
      },
    });
    return students;
  }

  async getBatchesByStudentID(studentId: string): Promise<Batch[]> {
    const student = await this.studentRepository.findOne({
      where: {
        _id: new ObjectId(studentId),
      },
    });

    if (!student.batchId || student.batchId.length === 0) {
      throw new Error('Student not joined any Batches yet');
    }

    const batches = this.batchService.getBatchesById(student.batchId);
    return batches;
  }

  async getStudentByName(studentName: string): Promise<Student[]> {
    const query: any = {
      $or: [
        { firstName: { $regex: new RegExp(studentName, 'i') } },
        { lastName: { $regex: new RegExp(studentName, 'i') } },
      ],
    };
    const students = await this.studentRepository.find(query);
    return students;
  }
}
