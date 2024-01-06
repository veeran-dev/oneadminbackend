// institute.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institute } from './institute.entity';
import { InstituteInput } from './institute.input';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(Institute)
    private readonly instituteRepository: Repository<Institute> 
    ) {}

  async createInstitute(instituteData: InstituteInput): Promise<Institute> {

    // Check if mobile number already exists
    const existingUserWithMobile = await this.instituteRepository.findOne({ where: {pocMobile: instituteData.pocMobile }});
    console.log("existingUserWithMobile...",existingUserWithMobile)
    if (existingUserWithMobile!== null) {
        throw new Error('Mobile number already exists');
    }

    const institute = this.instituteRepository.create(instituteData);
    return await this.instituteRepository.save(institute);
  }

  async editInstitute(instituteId: string, instituteData: Partial<InstituteInput>): Promise<Institute> {

    const existingUserWithMobile = await this.instituteRepository.findOne({ where: {pocMobile: instituteData.pocMobile }});
    console.log("existingUserWithMobile...",existingUserWithMobile)
    if (existingUserWithMobile!== null && String(existingUserWithMobile._id) !== instituteId ) {
        throw new Error('Mobile number already exists');
    }

    await this.instituteRepository.update(instituteId, instituteData);
    return this.instituteRepository.findOne({where:{_id: new ObjectId(instituteId)}});
  }

  async findOne(instituteId: string): Promise<boolean>{
    const institute = await this.instituteRepository.findOne({where:{_id: new ObjectId(instituteId)}});
    console.log("institute is...",institute)
    if(institute){
        return true
    }
    return false
  }

  async getInstitute(instituteId: string): Promise<Institute>{
    return await this.instituteRepository.findOne({where:{_id: new ObjectId(instituteId)}});
  }
}
