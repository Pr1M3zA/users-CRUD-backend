import { AppDataSource } from "../../data-source";
import { User } from "../../db/entity/User";

const UserDAL = AppDataSource.getRepository(User);

export default UserDAL;