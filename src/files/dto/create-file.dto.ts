export class CreateFileDto {
  userId: number;
  filename: string;
  originalname: string;
  filepath: string;
  size: number;
  mimetype: string;
  favFile: boolean;
}
