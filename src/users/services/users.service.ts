import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { UserDto } from "../models/user.dto";
import { UserEntity } from "../models/user.entity";
import { UserPost } from "../models/user.interface";

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    console.log("call find one function", username);
    return await this.userRepo
      .createQueryBuilder("user")
      .where("user.username= :username", { username: username })
      .addSelect("user.password")
      .getOne();
  }

  async createUser(user: UserDto): Promise<UserPost> {
    try {
      return await this.userRepo.save(user);
    } catch (err) {
      console.log("error", err.code);
      if (err.code == 23505) {
        throw new ConflictException("User already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async softDeleteUSer(username: string): Promise<string> {
    console.log("softDeleteUSer", username);
    const user = await this.userRepo.findOne({
      where: {
        username: username,
      },
    });
    console.log("user delete", user);
    if (!user) {
      throw new NotFoundException("User not found");
      return;
    } else {
      await this.userRepo.softRemove(user);
      return "Delete successfully!";
    }
  }
}
