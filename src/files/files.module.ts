import { Module } from "@nestjs/common";
import { FileController } from "./files.controller";
import { FileService } from "./files.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "./files.model";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { FileCronService } from "./cron/file-cron.service";
import { FileGateway } from "src/websockets/file.gateway";

@Module({
  controllers: [FileController],
  imports: [
    SequelizeModule.forFeature([File]),
    JwtModule,
    ScheduleModule.forRoot(),
    FileGateway,
  ],
  providers: [FileService, FileCronService, FileGateway],
  exports: [FileService],
})
export class FilesModule {}
