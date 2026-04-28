import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";
import { User, CreateUserDTO, SafeUser } from "../types/User";
import { generatePasswordHash } from "../../utils/password";

const createUserService: ServiceWithProps<SafeUser, CreateUserDTO> = async (userPayload) => {
   const exisitingUser = await UserDAL.findOneBy({ email: userPayload.email });
   if (exisitingUser) return { message: "Email already in use", status: 400 };

   const verificationCode = makeCode();
   console.log("Verification code: ", verificationCode);
   const hashVerificationCode = await generatePasswordHash(verificationCode);

   const encryptedPassword = await generatePasswordHash(userPayload.password);
   const user = UserDAL.create({
      name: userPayload.name,
      email: userPayload.email,
      password: encryptedPassword,
      verificationCode: hashVerificationCode
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

function makeCode() {
   let codigo = '';
   for (let i = 0; i < 5; i++) {
      const ascii = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
      codigo += String.fromCharCode(ascii);
   }
   return codigo;
}

export default createUserService;

