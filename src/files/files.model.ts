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
  @ApiProperty({ example: "1", description: "Unique file identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "1",
    description: "The ID of the user to which the file is linked",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: "1672851234567-document.pdf",
    description: "File name on server",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @ApiProperty({
    example: "document.pdf",
    description: "Original file name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalname: string;

  @ApiProperty({
    example: "uploads/1672851234567-document.pdf",
    description: "Path to file on server",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filepath: string;

  @ApiProperty({ example: 1048576, description: "File size in bytes" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size: number;

  @ApiProperty({ example: "application/pdf", description: "MIME file type" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimetype: string;

  @ApiProperty({ example: "FALSE", description: "Featured file or not" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  favFile: boolean;

  @ApiProperty({ example: "FALSE", description: "File deleted or not" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @ApiProperty({
    example: "13-02-2003",
    description: "The time we deleted the file",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date | null;
}
