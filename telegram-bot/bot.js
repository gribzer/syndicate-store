// telegram-bot/bot.js

const { Telegraf } = require('telegraf');
require('dotenv').config();

// Токен берем из .env или переменной среды
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Простейшая команда /start
bot.start((ctx) => {
  ctx.reply('Добро пожаловать в SyndicateStoreBot!');
});

// Пример запроса к Strapi (REST)
bot.command('products', async (ctx) => {
  try {
    // Допустим, Strapi доступен по https://syndicate-store.ru/api/products
    const res = await require('axios').get('https://syndicate-store.ru/api/products');
    const products = res.data?.data || []; 

    if (!products.length) {
      return ctx.reply('Товаров нет.');
    }

    let message = 'Список товаров:\n';
    products.forEach((p) => {
      message += `• ${p.attributes.name} — ${p.attributes.price} руб.\n`;
    });
    ctx.reply(message);
  } catch (err) {
    console.error(err);
    ctx.reply('Ошибка при получении списка товаров');
  }
});

// Запуск бота
bot.launch().then(() => {
  console.log('Telegram bot started');
});
