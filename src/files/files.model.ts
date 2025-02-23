import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Timestamp } from "typeorm";

interface FileCreationAttrs {
  userId: number;
  filename: string;
  originalname: string;
  filepath: string;
  size: number;
  mimetype: string;
  favFile: boolean;
  isDeleted: boolean;
  deletedAt: Date;
}

@Table({ tableName: "files" })
export class File extends Model<File, FileCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор файла" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "1",
    description: "ID пользователя, к которому привязан файл",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: "1672851234567-document.pdf",
    description: "Имя файла на сервере",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @ApiProperty({
    example: "document.pdf",
    description: "Оригинальное имя файла",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalname: string;

  @ApiProperty({
    example: "uploads/1672851234567-document.pdf",
    description: "Путь к файлу на сервере",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filepath: string;

  @ApiProperty({ example: 1048576, description: "Размер файла в байтах" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size: number;

  @ApiProperty({ example: "application/pdf", description: "MIME-тип файла" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimetype: string;

  @ApiProperty({ example: "FALSE", description: "Избранный файл или нет" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  favFile: boolean;

  @ApiProperty({ example: "FALSE", description: "Удален файл или нет" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    example: "13-02-2003",
    description: "Время когда мы удалили файл",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date | null;
}
