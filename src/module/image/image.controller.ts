import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@common/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUploadDto } from "@common/dto/imageUpload.dto";

@ApiTags('image')
@Controller('image')
export class ImageController {

  constructor(
    private readonly imageService: ImageService,
  ) {}

  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'success' },
          },
        },
      }
    }
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the User',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ImageUploadDto,
  })
  @Post(':id')
  async import(@UploadedFile() file: Express.Multer.File,@Param() id: {id: string}) {
    await this.imageService.import(file, id);
    return {
      message: 'success',
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the User',
  })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            url: { type: 'string', example: 'http://127.0.0.1:9000/userphoto/262a103ffa31a108e14f9b3195fd057.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20231113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231113T103718Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f910bd7ded805cf821d46f9d00c9d4227a351565e6a64d9128732c4bc05542c1' },
          },
        },
      }
    }
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getImage(@Param() id: {id: string}) {
    return await this.imageService.getImage(id);
  }

}
