import { get } from "node:http";
import { Service } from "../../utils/types";
import { User } from "../types/User";

const getAllUsersService: Service<User[]> = async () => {
   return {
      message: "Users retrieved successfully",
      status: 200,
      data: []
   }
}

export default getAllUsersService;