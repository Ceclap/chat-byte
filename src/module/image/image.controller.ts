import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
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

}
