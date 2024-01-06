import { Batch } from "./batch.entity";
import { PaginationInput } from "./batch.input";


export interface BatchServiceInterface {
    createBatch(batchData: Partial<Batch>): Promise<Batch>;
    editBatch(batchId: string, batchData: Partial<Batch>): Promise<Batch>;
    getBatchByID(batchId: string): Promise<Batch>;
    getBatchesByInstituteAndBatchName(instituteId: string, batchName: string, pagination: PaginationInput): Promise<Batch[]>;
    getBatchesByBranchAndBatchName(branchId: string, batchName: string): Promise<Batch[]>;
    getBatchesByCourseId(courseId: string, name: string): Promise<Batch[]>;
    getBatchesByBranchId(branchId: string, name?: string): Promise<string[]>;
    getBatchById(batchId: string): Promise<Batch>;
  }