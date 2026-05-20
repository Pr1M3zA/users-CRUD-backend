import { ServiceWithProps } from "../../utils/types";
import UrlDAL from "../DAL/urlDAL";
import UserDAL from "../../user/DAL/userDAL";
import { Url } from "../types/Url";
import bcrypt from "bcrypt";
import { validateSessionJwt } from "../../utils/jwt";

const createUrlService: ServiceWithProps<Url, { token: string; originalUrl: string }> = async ({ token, originalUrl }) => {
   try {
      const tokenPayload = validateSessionJwt(token);
      if (!tokenPayload) return { message: "Invalid token", status: 401 };
      const user = await UserDAL.findOneBy({ id: tokenPayload.id });
      if (!user) return { message: "User not found", status: 404 };

      let shortUrl = "";
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 10) {
         const hash = await bcrypt.hash(originalUrl + Date.now().toString() + attempts, 10);
         shortUrl = hash.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10);
         const existing = await UrlDAL.findOneBy({ shortUrl });
         if (!existing) isUnique = true;
         attempts++;
      }

      if (!isUnique) return { message: "Failed to generate unique short URL", status: 500 };

      const url = UrlDAL.create({
         originalUrl,
         shortUrl,
         userId: user.id,
      });

      const savedUrl = await UrlDAL.save(url);

      return {
         message: "URL created successfully",
         status: 201,
         data: savedUrl
      };
   } catch (error) {
      console.error("Error creating URL:", error);
      return { message: "Error creating URL", status: 500 };
   }
};

export default createUrlService;
