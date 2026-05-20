import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";
import { User, CreateUserDTO, SafeUser, UpdateUserDTO } from "../types/User";
import { generatePasswordHash } from "../../utils/password";
import { validateSessionJwt } from "../../utils/jwt";

const updateUserService: ServiceWithProps<SafeUser, { token: string; data: UpdateUserDTO}> = async ({ token, data }) => {
   try {
      const tokenPayload = validateSessionJwt(token);
      if (!tokenPayload) return { message: "Invalid token", status: 401 };

      const userToUpdate = await UserDAL.findOneBy({ id: tokenPayload.id });
      if (!userToUpdate) return { message: "User not found", status: 404 };
      if (data.password) data.password = await generatePasswordHash(data.password);

      Object.assign(userToUpdate, data);

      const updatedUser = await UserDAL.save(userToUpdate);
      const { password, ...safeUser } = updatedUser;

      return {
         message: "User updated successfully",
         status: 200,
         data: safeUser
      };
   } catch (error) {
      console.error("Error updating user:", error);
      return { message: "Error updating user", status: 500 };  
   }
};

export default updateUserService;