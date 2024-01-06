// branch.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './branch.entity';
import { BranchInput } from './branch.input';
import { ObjectId } from 'mongodb';
import { InstituteService } from 'src/institute/institute.service';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,

    private readonly instituteService: InstituteService,
  ) {}

  async createBranch(branchData: BranchInput): Promise<Branch> {
    console.log("validate institute id ", branchData.instituteId,)
    const isvalidInstitute = await this.instituteService.findOne(
      branchData.instituteId,
    );
    console.log("isvalidInstitute...",isvalidInstitute)
    if (!isvalidInstitute) {
      throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);
    }
    const branch = this.branchRepository.create(branchData);
    return await this.branchRepository.save(branch);
  }

  async editBranch(
    branchId: string,
    branchData: Partial<BranchInput>,
  ): Promise<Branch> {
    const isvalidInstitute = await this.instituteService.findOne(
      branchData.instituteId,
    );

    if (!isvalidInstitute) {
        throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);
    }
    await this.branchRepository.update(branchId, branchData);
    return this.branchRepository.findOne({
        where: { _id: new ObjectId(branchId) },
      });
    
  }


  async getBranchesByInstituteId(
    instituteId:string
  ): Promise<Branch[]> {

    const isvalidInstitute = await this.instituteService.findOne(
      instituteId,
    );

    if (!isvalidInstitute) {
        throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);
    }

    return await this.branchRepository.find({where:{instituteId:instituteId}})

  }


  async getBranchesById(
    branchId:string
  ): Promise<Branch> {
    return await this.branchRepository.findOne({where:{_id:new ObjectId(branchId)}})
  }

  async getBranchNameById(courseId: string): Promise<string | null> {
    const query:any = {}
    query._id = new ObjectId(courseId)
    const branch = await this.branchRepository.findOne(query);
    return branch ? branch.name : null;
  }

}
