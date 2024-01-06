// course.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CourseInput } from './course.input';
import { ObjectId } from 'mongodb';
import { InstituteService } from 'src/institute/institute.service';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly instituteService:InstituteService,
  ) {}

  async createCourse(courseData: CourseInput): Promise<Course> {
    console.log("courseData....",courseData)
    const isvalidInstitute = this.instituteService.findOne(courseData.instituteId);
    if(!isvalidInstitute){
        throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);
    }
    const course = this.courseRepository.create(courseData);
    return await this.courseRepository.save(course);
    
  }

  async editCourse(courseId: string, courseData: CourseInput): Promise<Course> {
    const isvalidInstitute = this.instituteService.findOne(courseData.instituteId);
    if(!isvalidInstitute){
        throw new HttpException('invalid instituteId', HttpStatus.BAD_REQUEST);    
    }
    await this.courseRepository.update(courseId, courseData);
    return this.courseRepository.findOne({where:{_id: new ObjectId(courseId)}});
    
  }

  async getCourseByInstituteId(instituteId:string, name:string): Promise<Course[]> {

    const query: any = { instituteId };

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    const res = await this.courseRepository.find(query);
    return res;
  }


  async getCourseById(id:string): Promise<Course> {
    const res = await this.courseRepository.findOne({where:{_id: new ObjectId(id)}});
    return res;
  }

  async getCourseNameById(courseId: string): Promise<string | null> {
    const query:any = {}
    query._id = new ObjectId(courseId)
    const course = await this.courseRepository.findOne(query);
    return course ? course.name : null;
  }

}