import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { AuthenticatedGuard } from "./auth/authenticated.guard";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { localAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(localAuthGuard)
  @Post("login")
  login(@Request() req): any {
    console.log("user call", req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getHello(@Request() req): string {
    return req.user;
  }
  @Get()
  getHelloCall(@Request() req): string {
    return "Hello world";
  }
}
