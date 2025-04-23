import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Vlad", description: "Example user" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "ergerRG", description: "Example password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
