import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FileService } from "../files.service";

@Injectable()
export class FileCronService {
  constructor(private readonly fileService: FileService) {}

  @Cron("0 0 * * *") // Раз в 24 часа
  async cleanTrash() {
    console.log("Запуск задачи: очистка файлов из корзины");
    await this.fileService.cleanTrashFiles();
  }
}
