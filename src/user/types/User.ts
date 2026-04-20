import { User as EntityUser } from "../../db/entity/User";

export type User = EntityUser;

export type SafeUser = Omit<User, "password">;

export type CreateUserDTO = Pick<User, "name" | "email" | "password">;

export type UpdateUserDTO = Partial<CreateUserDTO>;