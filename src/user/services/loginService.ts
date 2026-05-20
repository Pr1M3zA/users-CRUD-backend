import { ServiceWithProps } from "../../utils/types";
import UserDAL from "../DAL/userDAL";
import { SafeUser } from "../types/User";
import { comparePassword } from "../../utils/password";
import { generateSessionJwt } from "../../utils/jwt";

const loginService: ServiceWithProps<{ token: string }, { email: string; password: string }> = async ({ email, password }) => { 
   try {
      const user = await UserDAL.findOneBy({ email });
      if (!user) return { message: "Invalid credentials", status: 401 };

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) return { message: "Invalid credentials", status: 401 };

      if (!user.isVerified) return { message: "User is not verified", status: 403 };

      const { password: _, ...safeUser } = user;
      const token = generateSessionJwt({ payload: { id: safeUser.id, version: 1.0 } });
      return { message: "Login successful", status: 200, data: { token }};
   } catch (error) {
      console.error("Error during login:", error);
      return { message: "Error during login", status: 500 };
   }
};

export default loginService;
