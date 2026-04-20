import { ServiceWithProps } from "../../utils/types";
import UrlDAL from "../DAL/urlDAL";

const redirectUrlService: ServiceWithProps<{ originalUrl: string }, { shortUrl: string }> = async ({ shortUrl }) => {
   try {
      const url = await UrlDAL.findOneBy({ shortUrl });
      if (!url) return { message: "URL not found", status: 404 };
      if (!url.isActive) return { message: "URL is inactive", status: 403 };

      return {
         message: "URL retrieved successfully",
         status: 200,
         data: { originalUrl: url.originalUrl }
      };
   } catch (error) {
      console.error("Error retrieving URL:", error);
      return { message: "Error retrieving URL", status: 500 };
   }
};

export default redirectUrlService;
