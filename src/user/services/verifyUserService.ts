import UserDAL from "../DAL/userDAL";
import { ServiceWithProps } from "../../utils/types";
import { VerifyUserDTO } from "../types/User";
import { comparePassword } from "../../utils/password";

const verifyUserService: ServiceWithProps<VerifyUserDTO, { email: string; code: string }> = async ({ email, code }) => {
   try {
      const user = await UserDAL.findOneBy({ email });
      if (!user) return { message: "User not found", status: 401 };

      if (user.isVerified === true) return { message: "User is already verified", status: 400 };

      const isCodeValid = await comparePassword(code, user.verificationCode);
      if (!isCodeValid) return { message: "Invalid verification code", status: 401 };

      await UserDAL.update(user.id, { isVerified: true, verificationCode: "" });

      return { message: "User verified successfully", status: 200 };
   } catch (error) {
      console.error("Error during verification:", error);
      return { message: "Error during verification", status: 500 };
   }
};

export default verifyUserService;
