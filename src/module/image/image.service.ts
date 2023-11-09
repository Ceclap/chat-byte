import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";
import process from "process";
import crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "@core/database/entity/auth.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
  private bucketName = process.env['BUCKET_NAME'] ? process.env['BUCKET_NAME'] : 'userphoto';

  constructor(
    @InjectMinio() private readonly minioClient: Client,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {
     this.initializeBucket()
  }
  async initializeBucket(){
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName).catch((error) => {
        console.error(`Error creating bucket '${this.bucketName}': ${error}`);
      });
    } else {
      console.log(`Bucket '${this.bucketName}' already exists.`);
    }

  }

    async import(file: Express.Multer.File, id: {id: string }) {
      const user = await this.authRepository.findOneOrFail({ where: id })
      if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
          throw new HttpException(
            'File type not supported',
            HttpStatus.BAD_REQUEST,
          );
      }
        const timestamp = Date.now().toString();
        const hashedFileName = crypto
          .createHash('md5')
          .update(timestamp)
          .digest('hex');
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length,
        );
        const metaData = {
          'Content-Type': file.mimetype,
        };
        const fileName = hashedFileName + extension;
        this.minioClient.putObject(
          this.bucketName,
          fileName,
          file.buffer,
          file.buffer.length,
          metaData,
          function (err) {
            if (err) {
              throw new HttpException(
                'Error uploading file',
                HttpStatus.BAD_REQUEST,
              );
            }
          },
        );
        await this.authRepository.update(user.id, { photo: fileName })
        return {
          url: `localhost:9000/${process.env['BUCKET_NAME']}/${fileName}`,
        };
      }
}
