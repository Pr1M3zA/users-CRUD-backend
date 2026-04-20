import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";

const deleteUserService: ServiceWithProps<null, { id: number }> = async ({ id }) => {
   try {
      const userToRemove = await UserDAL.findOneBy({ id });
      if (!userToRemove) return { message: "User not found", status: 404 };
      await UserDAL.remove(userToRemove);
      return { message: "User deleted successfully", status: 200 };
   } catch (error) {
      console.error("Error deleting user:", error);
      return { message: "Error deleting user", status: 500 };
   }
};

export default deleteUserService;