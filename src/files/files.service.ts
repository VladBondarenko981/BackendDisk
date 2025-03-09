import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "./files.model";
import { CreateFileDto } from "./dto/create-file.dto";
import { NotFoundException } from "@nestjs/common";
import { join } from "path";
import { existsSync, createReadStream } from "fs";
import { Response } from "express";
import { statSync } from "fs";

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File) private readonly fileRepository: typeof File
  ) {}

  async createFile(createFileDto: CreateFileDto): Promise<File> {
    return this.fileRepository.create(createFileDto);
  }

  async getUserFiles(userId: number): Promise<File[]> {
    return this.fileRepository.findAll({ where: { userId } });
  }

  async downloadNeedFile(
    filename: string,
    userId: string,
    res: Response,
    action: string
  ): Promise<void> {
    const file = await this.fileRepository.findOne({
      where: { filename, userId },
    });
    if (!file) {
      throw new NotFoundException("File not found");
    }
    const filePath = join(process.cwd(), file.filepath);
    if (!existsSync(filePath)) {
      throw new Error("File not found on disk");
    }
    const mimeType = file.mimetype || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);

    const encodedName = encodeURIComponent(file.originalname).replace(
      /'/g,
      "%27"
    );
    const disposition = action === "open" ? "inline" : "attachment";
    res.setHeader(
      "Content-Disposition",
      `${disposition}; filename*=UTF-8''${encodedName}`
    );

    const fileStream = createReadStream(filePath);
    const fileStats = statSync(filePath);
    res.setHeader("Content-Length", fileStats.size.toString());
    fileStream.pipe(res);
  }

  async setFavToFile(
    filename: string,
    favOption: boolean,
    userId: string
  ): Promise<void> {
    const file = await this.fileRepository.findOne({
      where: { filename, userId },
    });
    if (!file) {
      throw new NotFoundException("File not found");
    }

    file.favFile = favOption;

    await file.save();
  }

  async renameFile(filename: string, newName: string, userId: number) {
    const file = await this.fileRepository.findOne({
      where: { filename, userId },
    });
    if (!file) {
      throw new NotFoundException("File not found");
    }
    file.originalname = newName;
    file.filename = `${Date.now()}-${file.originalname}`;
    await file.save();
  }

  async deleteFile(filename: string, userId: number) {
    const file = await this.fileRepository.findOne({
      where: { filename, userId },
    });
    if (!file) {
      throw new NotFoundException("File not found");
    }
    file.isDeleted = true;
    file.deletedAt = new Date();
    await file.save();
  }

  async cleanTrashFiles() {
    const trashFiles = await this.fileRepository.findAll({
      where: { isDeleted: true },
    });
    if (!trashFiles) {
      throw new NotFoundException("Files not found");
    }
    const currentDate = new Date();

    for (const file of trashFiles) {
      const deletedAt = new Date(file.deletedAt);
      const differenceInTime = currentDate.getTime() - deletedAt.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays >= 7) {
        await file.destroy();
      }
    }
  }
}
