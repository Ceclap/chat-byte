import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {

  @ApiProperty({ example: 'victor@gmail.com' })
  @IsEmail()
  @IsOptional()
  email!: string;

  @ApiProperty({ example: 'victor' })
  @IsString()
  @IsOptional()
  username!: string;

  @ApiProperty({ example: '@Parola123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}