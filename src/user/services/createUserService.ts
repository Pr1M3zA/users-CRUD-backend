import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";
import { User, CreateUserDTO, SafeUser } from "../types/User";
import { generatePasswordHash } from "../../utils/password";

const createUserService: ServiceWithProps<SafeUser, CreateUserDTO> = async (userPayload) => {
   const exisitingUser = await UserDAL.findOneBy({ email: userPayload.email });
   if (exisitingUser) return { message: "Email already in use", status: 400 };

   const encryptedPassword = await generatePasswordHash(userPayload.password);
   const user = UserDAL.create({
      name: userPayload.name,
      email: userPayload.email,
      password: encryptedPassword,
   });
   let savedUser: User;
   try {
      savedUser = await UserDAL.save(user);
   } catch (error) {
      console.error("Error saving user:", error);
      return {message: "Error creating user", status: 500};
   };

   const { password, ...safeUser } = savedUser;
   
   return {
      message: "User created successfully",
      status: 201,
      data: safeUser
   }
}

export default createUserService;

