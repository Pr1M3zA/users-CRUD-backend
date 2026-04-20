import { ServiceWithProps } from "../../utils/types";
import UserDAL  from "../DAL/userDAL";
import { SafeUser } from "../types/User";

const getUserByIdService: ServiceWithProps<SafeUser, { id: number }> = async ({ id }) => {
   try {
      const user = await UserDAL.findOneBy({ id });
      if (!user) return { message: "User not found", status: 404 };
      const { password, ...safeUser } = user;
      return { message: "User found successfully", status: 200, data: safeUser };
   } catch (error) {
      console.error("Error fetching user:", error);
      return { message: "Error fetching user", status: 500 };
   }
};

export default getUserByIdService;