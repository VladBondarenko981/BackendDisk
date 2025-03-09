import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "vlafl@GEEG.com", description: "Mail" })
  readonly email: string;
  @ApiProperty({ example: "gRGRG#t3)45", description: "Password" })
  readonly password: string;
}
