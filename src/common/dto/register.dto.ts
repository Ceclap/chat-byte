import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{

  @ApiProperty({ example: 'victor@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'victor' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: '@Parola123' })
  @IsString()
  @IsNotEmpty()
  password!: string;

}