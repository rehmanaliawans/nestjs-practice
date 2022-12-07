import { Contains, IsEnum, IsString, Matches } from "class-validator";

export class UserDto {
  @IsString()
  @Contains("hello")
  name: string;

  @IsString()
  username: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password is too week",
  })
  password: string;
}
