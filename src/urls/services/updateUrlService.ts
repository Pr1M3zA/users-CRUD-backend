import { ServiceWithProps } from "../../utils/types";
import UrlDAL from "../DAL/urlDAL";
import { Url, UpdateUrlDTO } from "../types/Url";
import { validateSessionJwt } from "../../utils/jwt";

const updateUrlService: ServiceWithProps<Url, { id: number; data: UpdateUrlDTO; token: string }> = async ({ id, data, token }) => {
   try {
      const tokenPayload = validateSessionJwt(token);
      if (!tokenPayload) return { message: "Invalid token", status: 401 };

      const url = await UrlDAL.findOneBy({ id });
      if (!url) return { message: "URL not found", status: 404 };
      if (url.userId !== tokenPayload.id) return { message: "Unauthorized", status: 403 };
      Object.assign(url, data);
      const updatedUrl = await UrlDAL.save(url);
      return {
         message: "URL updated successfully",
         status: 200,
         data: updatedUrl
      };
   } catch (error) {
      console.error("Error updating URL:", error);
      return { message: "Error updating URL", status: 500 };
   }
};

export default updateUrlService;
