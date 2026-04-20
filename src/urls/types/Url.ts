import { Url as EntityUrl } from "../../db/entity/Url";

export type Url = EntityUrl;

export type UpdateUrlDTO = Partial<Pick<Url, "originalUrl" | "shortUrl" | "isActive">>;
