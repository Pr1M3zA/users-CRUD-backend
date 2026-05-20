import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";
import { validateSessionJwt } from "../../utils/jwt";

const deleteUserService: ServiceWithProps<null, { token: string }> = async ({ token }) => {
   try {
      const tokenPayload = validateSessionJwt(token);
      if (!tokenPayload) return { message: "Invalid token", status: 401 };

      const userToRemove = await UserDAL.findOneBy({ id: tokenPayload.id });
      if (!userToRemove) return { message: "User not found", status: 404 };
      await UserDAL.remove(userToRemove);
      return { message: "User deleted successfully", status: 200 };
   } catch (error) {
      console.error("Error deleting user:", error);
      return { message: "Error deleting user", status: 500 };
   }
};

export default deleteUserService;