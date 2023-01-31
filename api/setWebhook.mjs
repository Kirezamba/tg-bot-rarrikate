import { setWebhook } from "telebot-vercel";
import bot from "../vercelBot.mjs";

export default setWebhook({ bot, path: "api/telegram.mjs" });
