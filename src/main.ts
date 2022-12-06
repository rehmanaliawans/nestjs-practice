import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("env", process.env.AUTH_SECRET);

  await app.listen(3000);
}
bootstrap();
