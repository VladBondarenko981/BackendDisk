import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "vlafl@GEEG.com", description: "Почта" })
  readonly email: string;
  @ApiProperty({ example: "gRGRG#t3)45", description: "Пароль" })
  readonly password: string;
}
