const { config } = require("dotenv");
const TelegramApi = require("node-telegram-bot-api");
const { accessButton, continuousButtons, payDoneButton } = require("./options");

const TOKEN = process.env.TELEGRAM_API_TOKEN;
const TelegramBot = require("../..");
const options = {
  webHook: {
    // Just use 443 directly
    port: 443,
  },
};

const url = "YOUR_DOMAIN_ALIAS" || process.env.NOW_URL;
config();
const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
const RARRIKATE_CHAT_ID = process.env.RARRIKATE_CHAT_ID;
const token = TELEGRAM_API_TOKEN;

const rarrikateChatId = RARRIKATE_CHAT_ID;

const bot = new TelegramApi(token, { polling: true });

bot.setWebHook(`${url}/bot${token}`);

const start = () => {
  const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
  const RARRIKATE_CHAT_ID = process.env.RARRIKATE_CHAT_ID;
  const token = TELEGRAM_API_TOKEN;
  const initMsg = "/start";
  const infoMsg = "/info";

  bot.setMyCommands([
    {
      command: initMsg,
      description: "Начальное приветствие",
    },
  ]);

  bot.on("message", async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === initMsg) {
      await bot.sendMessage(
        chatId,
        ` Привет! Я бот-помощник Кати
  Здесь ты можешь оформить подписку на "пространство эстетичных материалов немецкого языка"`,
        accessButton
      );
    }
  });

  bot.on("callback_query", async cbMsg => {
    const answer = cbMsg.data;
    const cbChatId = cbMsg.from.id;
    if (answer === "access") {
      await bot.sendMessage(
        cbChatId,
        `"Пространство эстетичных материалов" - это база авторских материалов, ворбуков, аутентичных статей, а также адаптированных уроков из различных источников, подготовленных Катей.
      Канал будет пополняться на постоянной основе 🖤  
      
      Стоимость подписки на 30 дней - 990₽(напоминание о продлении подписки ты получишь за пару дней до ее окончания).  
      
      Также ты можешь оформить подписку на 3 и 6 месяцев. При этом, за тобой сохранится первоначальная стоимость подписки на месяц 🖤
      Стоимость подписки на 3 месяца - 2970₽
      Стоимость подписки на 3 месяца - 5940₽
      
      Через несколько минут после оплаты ты попадешь в канал "Креативное пространство 🥨" и уже сможешь начать использовать материалы и получать от них удовольствие ✨`,
        continuousButtons
      );
    }

    if (answer === "writeKate") {
      console.log(answer);
    }

    if (answer === "pay") {
      await bot.sendMessage(
        cbChatId,
        `Чтобы оплатить подписку, переведи нужную сумму:
990₽ / 2970₽ / 5940₽

⁃ по номеру карты:
5536 9140 1779 5208
     
⁃ или по ссылке:
https://www.tinkoff.ru/rm/elaeva.ekaterina5/mGeOh69614
     
После этого нажми кнопку «Я оплатил(-а)`,
        payDoneButton
      );
    }

    if (answer === "payDone") {
      await bot.sendMessage(
        cbChatId,
        `Секунду, проверяем вашу оплату. 
      Это может занять некоторое время...`
      );
      // await bot.sendMessage(
      //   rarrikateChatId,
      //   `${cbMsg.from.username} ${cbMsg.from.last_name} ${cbMsg.from.first_name}`
      // );
    }
  });
};
start();
