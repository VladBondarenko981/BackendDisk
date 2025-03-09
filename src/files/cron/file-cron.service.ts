import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FileService } from "../files.service";

@Injectable()
export class FileCronService {
  constructor(private readonly fileService: FileService) {}

  @Cron("0 0 * * *")
  async cleanTrash() {
    await this.fileService.cleanTrashFiles();
  }
}
