import { AppDataSource } from "../../data-source";
import { Url } from "../../db/entity/Url";

const UrlDAL = AppDataSource.getRepository(Url);

export default UrlDAL;
