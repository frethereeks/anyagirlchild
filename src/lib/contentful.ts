import { createClient } from "contentful";
import { config } from "../config";

export const contentfulClient = createClient({
    accessToken: config.CONTENTFUL.ACCESS_TOKEN,
    space: config.CONTENTFUL.SPACE_ID,
});
