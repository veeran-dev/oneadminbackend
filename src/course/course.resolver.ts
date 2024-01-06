// course.resolver.ts
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { getInstituteID, CourseInput, getCourseID } from './course.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import * as fs from 'fs';
import * as path from 'path';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
  private readonly courseService: CourseService
  ) {}

  @Mutation(() => Course)
  async createCourse(
    @Args('input') input: CourseInput, 
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: Promise<FileUpload>[]
  ): Promise<Course> {
    console.log("upload imagesqq")
    if(images){
      const imageFolderPath = path.join(__dirname, '..', 'course', 'image');
      console.log("imageFolderPath ..",imageFolderPath)
      // Ensure the folder exists, create it if not
      if (!fs.existsSync(imageFolderPath)) {
        fs.mkdirSync(imageFolderPath, { recursive: true });
      }

      const uploadedImages = await Promise.all(images);

      // Process and save each uploaded image to the specified folder
      const savedImagePaths = uploadedImages.map((image, index) => {
      const { createReadStream, filename } = image;
      const filePath = path.join(imageFolderPath, `${index + 1}_${filename}`);

      // Create a write stream to save the file
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the file stream to the write stream
      return new Promise<string>((resolve, reject) => {
        createReadStream()
          .pipe(writeStream)
          .on('finish', () => resolve(filePath))
          .on('error', reject);
      });
    });

    console.log('Uploaded images saved at:', savedImagePaths);
    console.log("upload images...", uploadedImages)
    input['images'] = uploadedImages.map((image) => image.filename);;
    }
    return await this.courseService.createCourse(input);
  }


  @Mutation(() => Course)
  async editCourse(
    @Args('courseId') courseId: string,
    @Args('courseData') courseData: CourseInput,
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: Promise<FileUpload>[]
  ): Promise<Course> {
    console.log("========EDIT COURSE===========")
    if(images){
      const imageFolderPath = path.join(__dirname, '..', 'course', 'image');
      console.log("imageFolderPath ..",imageFolderPath)
      // Ensure the folder exists, create it if not
      if (!fs.existsSync(imageFolderPath)) {
        fs.mkdirSync(imageFolderPath, { recursive: true });
      }

      const uploadedImages = await Promise.all(images);

      // Process and save each uploaded image to the specified folder
      const savedImagePaths = uploadedImages.map((image, index) => {
      const { createReadStream, filename } = image;
      const filePath = path.join(imageFolderPath, `${index + 1}_${filename}`);

      // Create a write stream to save the file
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the file stream to the write stream
      return new Promise<string>((resolve, reject) => {
        createReadStream()
          .pipe(writeStream)
          .on('finish', () => resolve(filePath))
          .on('error', reject);
      });
    });

    console.log('Uploaded images saved at:', savedImagePaths);
    console.log("upload images...", uploadedImages)
    courseData['images'] = uploadedImages.map((image) => image.filename);;
    }


    return this.courseService.editCourse(courseId, courseData);
  }


  @Query(()=> [Course])
  async getCourseByInstituteId(
    @Args('query') query: getInstituteID ):Promise<Course[]>{
    console.log("data...",query.instituteId)
    return this.courseService.getCourseByInstituteId(query.instituteId, query.name)
  }

  @Query(()=> Course)
  async getCourseById(
    @Args('query') query: getCourseID ):Promise<Course>{
    console.log("data...",query.courseId)
    return this.courseService.getCourseById(query.courseId)
  }

}
