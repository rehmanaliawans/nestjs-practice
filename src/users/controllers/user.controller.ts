import { Body, Controller, Delete, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserDto } from "../models/user.dto";
import { UserPost } from "../models/user.interface";
import { UsersService } from "../services/users.service";

@Controller("user")
export class UserController {
  constructor(private _userService: UsersService) {}

  @Post()
  create(@Body() user: UserDto): Promise<UserPost> {
    return this._userService.createUser(user);
  }
  @Delete("/delete")
  delete(@Body() username: any): Promise<string> {
    return this._userService.softDeleteUSer(username.username);
  }
}
