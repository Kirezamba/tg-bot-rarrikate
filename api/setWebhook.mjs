import { setWebhook } from "telebot-vercel";
import bot from "../index";

export default setWebhook({ bot, path: "api/telegram.mjs" });
