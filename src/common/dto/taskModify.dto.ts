import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TaskModifyDto {
  @ApiProperty({ example: 'Write a email' })
  @IsString()
  @IsOptional()
  title!:string
  @ApiProperty({ example: 'Write a email to my Harry' })
  @IsString()
  @IsOptional()
  text!:string
}