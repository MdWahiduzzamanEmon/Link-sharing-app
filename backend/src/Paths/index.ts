import { authRouter } from "../Router/authentication";
import { profileRouter } from "../Router/profile";
import { linkSaveRouter } from "../Router/saveLink";

const routes = [linkSaveRouter, profileRouter, authRouter];

export default routes;
