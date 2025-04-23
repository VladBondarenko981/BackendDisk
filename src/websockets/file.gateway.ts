import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class FileGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("fileUpdate")
  handleFileUpdate(
    @MessageBody() data: File,
    @ConnectedSocket() client: Socket
  ): void {
    this.server.emit("filesUpdated", data);
  }
}
