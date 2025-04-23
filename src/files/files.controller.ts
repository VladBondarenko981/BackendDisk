import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
  Delete,
  Param,
  Patch,
  Body,
  Res,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./files.service";
import { multerConfig } from "src/multer-config";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { FileGateway } from "src/websockets/file.gateway";

@Controller("files")
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly fileGateway: FileGateway
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("addFile")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const createFileDto = {
      userId: req.user.id,
      filename: file.filename,
      originalname: file.originalname,
      filepath: file.path,
      size: file.size,
      mimetype: file.mimetype,
      favFile: false,
      isDeleted: false,
      deletedAt: null,
    };

    return this.fileService.createFile(createFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserFiles(@Req() req) {
    return this.fileService.getUserFiles(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("download/:filename")
  async downloadFile(
    @Param("filename") filename: string,
    @Req() req,
    @Query("action") action: string,
    @Res() res: Response
  ) {
    return this.fileService.downloadNeedFile(
      filename,
      req.user.id,
      res,
      action
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch("setFav")
  async setFav(
    @Body() body: { filename: string; favOption: boolean },
    @Req() req
  ) {
    const userId = req.user.id;
    return this.fileService.setFavToFile(body.filename, body.favOption, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("renameFile")
  async renameFile(
    @Body() body: { filename: string; newName: string },
    @Req() req
  ) {
    const userId = req.user.id;
    await this.fileService.renameFile(body.filename, body.newName, userId);
    this.fileGateway.server.emit("filesUpdated", {
      filename: body.filename,
      newName: body.newName,
      action: "rename",
    });
    return { message: "File renamed" };
  }

  @UseGuards(JwtAuthGuard)
  @Patch("moveToTrash")
  async moveToTrash(@Body() body: { filename: string }, @Req() req) {
    const userId = req.user.id;
    await this.fileService.deleteFile(body.filename, userId);
    this.fileGateway.server.emit("filesUpdated", {
      filename: body.filename,
      action: "deleted",
    });
    return { message: "File moved to trash" };
  }
}
