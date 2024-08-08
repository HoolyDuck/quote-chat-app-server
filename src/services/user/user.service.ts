import { CreateUserDto } from "../../common/types/user/create-user-dto.type";
import { DbUser } from "../../common/types/user/db-user.type";
import { User } from "../../entities/user/user.entity";

class UserService {
  async getUserByGoogleId(googleId: string): Promise<DbUser | null> {
    return User.findOne({
      googleId,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<DbUser> {
    return User.create(createUserDto);
  }

  async getUserById(userId: string): Promise<DbUser | null> {
    return User.findOne({
      _id: userId,
    });
  }
}

export { UserService };
