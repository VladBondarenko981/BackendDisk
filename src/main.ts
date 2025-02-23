import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "responseType"],
    exposedHeaders: ["Content-Disposition"],
  });

  await app.listen(PORT, () =>
    console.log(`Server started on portt = ${PORT}`)
  );
}

start();
