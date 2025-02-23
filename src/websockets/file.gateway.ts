import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } }) // Разрешаем CORS для фронтенда
export class FileGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("fileUpdate")
  handleFileUpdate(
    @MessageBody() data: File,
    @ConnectedSocket() client: Socket
  ): void {
    console.log("File update received:", data);
    this.server.emit("filesUpdated", data); // Отправляем обновление всем клиентам
  }
}
