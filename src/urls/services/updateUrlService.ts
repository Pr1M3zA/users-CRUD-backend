import { ServiceWithProps } from "../../utils/types";
import UrlDAL from "../DAL/urlDAL";
import { Url, UpdateUrlDTO } from "../types/Url";

const updateUrlService: ServiceWithProps<Url, { id: number; data: UpdateUrlDTO }> = async ({ id, data }) => {
   try {
      const url = await UrlDAL.findOneBy({ id });
      if (!url) return { message: "URL not found", status: 404 };
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
