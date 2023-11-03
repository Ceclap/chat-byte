import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class VerifyDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username!: string

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email!:string
}