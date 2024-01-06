// student.resolver.ts
import { Resolver, Args, Mutation, ObjectType, Field, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { AddBatch, StudentPaginationInput, StudentInput, StudentsByBatch, StudentsByBranch, StudentsByID } from './student.input';
import { VoidResponse } from 'src/types/common';
import { Batch } from 'src/batch/batch.entity';





@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async createStudent(@Args('studentData') studentData: StudentInput): Promise<Student> {
    return this.studentService.createStudent(studentData);
  }

  @Mutation(() => Student)
  async editStudent(
    @Args('studentId') studentId: string,
    @Args('studentData') studentData: StudentInput,
  ): Promise<Student> {
    return this.studentService.editStudent(studentId, studentData);
  }

  @Mutation(() => VoidResponse)
  async addStudentToBatch(
    @Args('data') data: AddBatch,
  ): Promise<VoidResponse> {
    await this.studentService.addStudentToBatch(data.studentId, data.batchId);
    return {
      message: "student added to the batch id "+data.batchId,
      success: true
    }
  }

  @Mutation(() => VoidResponse)
  async removeStudentFromBatch(
    @Args('data') data: AddBatch,
  ): Promise<VoidResponse> {
    await this.studentService.removeStudentFromBatch(data.studentId, data.batchId);
    return {
      message: "student removed from the batch id "+data.batchId,
      success: true
    }
  }

  @Query(()=>[Student])
  async getStudentsByBranchId(
    @Args('data') data:StudentsByBranch
  ):Promise<Student[]>{
    return await this.studentService.getStudentsByBranchId(data.branchId, data.name, data.batchName)
  }

  @Query(()=>Student)
  async getStudentsById(
    @Args('data') data: StudentsByID
  ): Promise<Student>{
    const student = await this.studentService.getStudentsById(data.studentId)
    console.log("retirm....",student)
    return student
  }

  @Query(()=>[Student])
  async getStudentsByInstituteId(
    @Args('instituteId') instituteId: string,
    @Args('name') name: string,
    @Args('pagination') pagination: StudentPaginationInput
  ): Promise<Student[]>{
    return await this.studentService.getStudentsByInstituteId(instituteId, pagination, name)
  }

  @Query(()=>[Student])
  async getStudentsByBatch(
    @Args('data') data:StudentsByBatch
  ): Promise<Student[]>{
    return await this.studentService.getStudentsByBatchId(data.batchId)
  }

  @Query(()=>[Batch])
  async getBatchesByStudentID(
    @Args('studentId') studentId:string
  ): Promise<Batch[]>{
    console.log("getBatchesByStudentID")
    const batches = await this.studentService.getBatchesByStudentID(studentId)
    console.log(batches)
    return batches;
  }


}
