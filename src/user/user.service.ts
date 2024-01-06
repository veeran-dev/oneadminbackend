import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ArrayContains, In, Repository } from 'typeorm';
import { CreateUserInputType } from './user.input';
import { InstituteService } from 'src/institute/institute.service';
import { ObjectId } from 'mongodb';
import { UserServiceInterface } from './user.interface';
@Injectable()
export class UserService implements UserServiceInterface {


    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private readonly instituteService: InstituteService
    ){}

    async getUser(id:string):Promise<User>{
        return this.userRepository.findOne({ where: { _id: new ObjectId(id) }, })
    }

    async getUserWithInstituteId(id:string):Promise<User[]>{
        return this.userRepository.find({ where: { instituteId: id }, })
    }

    async createUser(payload:Partial<CreateUserInputType>):Promise<User>{

        const isvalidInstitute = this.instituteService.findOne(payload.instituteId);
        if(!isvalidInstitute){
            throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);    
        }

        // Check if email already exists
        const existingUserWithEmail = await this.userRepository.findOne({ where: {email: payload.email }});
        if (existingUserWithEmail) {
            throw new Error('Email already exists');
        }

        // Check if mobile number already exists
        const existingUserWithMobile = await this.userRepository.findOne({ where: {mobile: payload.mobile }});
        if (existingUserWithMobile && payload.mobile) {
            throw new Error('Mobile number already exists');
        }


        const user = this.userRepository.create(payload);
        //console.log("user is ",user)
        return this.userRepository.save(user);
    }

    async editUser(id: string, userData: Partial<User>): Promise<User> {

        // Check if email already exists
        const existingUserWithEmail = await this.userRepository.findOne({ where: {email: userData.email }});
        if (existingUserWithEmail && String(existingUserWithEmail._id) != id) {
            throw new Error('Email already exists');
        }

        // Check if mobile number already exists
        const existingUserWithMobile = await this.userRepository.findOne({ where: {mobile: userData.mobile }});
        //console.log("existingUserWithMobile...",existingUserWithMobile)
        if (existingUserWithMobile && String(existingUserWithMobile._id) != id) {
            throw new Error('Mobile number already exists');
        }

        const user =  await this.userRepository.findOne({ where: { _id: new ObjectId(id) }, })
        //console.log("uid...",id)
        //console.log("user...",user)
        await this.userRepository.update(user._id, userData);
        return this.userRepository.findOne({
            where: { _id: new ObjectId(user._id) },
        });
      }


    async getUsersWithFilters(
        instituteId: string,
        staffName: string,
        staffIds: string[],
      ): Promise<User[]> {
        //console.log(instituteId, staffName, staffIds)
        const query: any = { instituteId };

        if (staffName) {
            query.name = { $regex: new RegExp(staffName, 'i') };
        }

        if (staffIds && staffIds.length > 0) {
            query._id = { $in: staffIds };
        }
        //console.log("getUsersWithFilters...",query)
        const res = await this.userRepository.find(query);
        //console.log("res...",res)
        return res
      }

    async getUserById(id:string): Promise<User>{
        return await this.userRepository.findOne({where:{_id: new ObjectId(id)}})
    }

    async getUserByEmail(email:string): Promise<User>{
        const user = await this.userRepository.findOne({where:{email}})
        if(!user){
            throw new Error('User is not available')
        }
        return user
    }

    async getUserNameById(ids: string[]): Promise<string[] | []> {
        console.log(ids)
        const query: any = {
          _id: ids.map(id => new ObjectId(id)),
        };
        const users = await this.userRepository.find({where:{_id:query._id[0]}})

        // Ensure that 'name' property exists on the User entity
        return users ? users.map(user => user.name || '') : [];
      }

}
