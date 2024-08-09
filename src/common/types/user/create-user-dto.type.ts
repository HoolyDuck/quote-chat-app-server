import { DbUser } from "./db-user.type";

export type CreateUserDto = Omit<DbUser, "_id">;
