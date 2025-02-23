import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Айдишник" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Vlad", description: "Пример пользователя" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "ergerRG", description: "Пример пароля" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
