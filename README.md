# Syndicate Store

Интернет-магазин цифровых товаров (аккаунты, ключи и т.д.), интегрированный с криптовалютными платежами и Telegram-ботом. Проект реализован на **Strapi (Node.js)** для бэкенда, **Next.js (React)** для фронтенда и **Telegraf (Node.js)** для Telegram-бота. Всё это упаковано в Docker-контейнеры и управляется через **docker-compose**.

## Содержание
1. [Технологический стек](#%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9-%D1%81%D1%82%D0%B5%D0%BA)
2. [Структура репозитория](#%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F)
3. [Установка и запуск (Docker)](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B8-%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA-docker)
4. [Переменные окружения (.env)](#%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-env)
5. [Настройка Telegram-бота](#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-telegram-%D0%B1%D0%BE%D1%82%D0%B0)
6. [Конфигурация Nginx и SSL](#%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D1%8F-nginx-%D0%B8-ssl)
7. [Работа с проектом (dev / prod)](#%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-%D1%81-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D0%BC-dev-prod)
8. [Частые проблемы и решения](#%D1%87%D0%B0%D1%81%D1%82%D1%8B%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B-%D0%B8-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F)
9. [Лицензия](#%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F)

## Технологический стек
- **Strapi (Node.js)** – бэкенд (коллекции товаров, заказы, пользователи, вебхуки).
- **Next.js (React)** – фронтенд для каталога, корзины, оформления заказа.
- **Telegram Bot (Telegraf)** – позволяет пользователям получать уведомления и покупать товары через мессенджер.
- **PostgreSQL** – основная база данных.
- **Docker + docker-compose** – контейнеризация всех сервисов (Strapi, Next.js, Bot, Nginx, PostgreSQL).
- **Nginx** – reverse proxy, SSL, проксирование запросов к фронту/бэкенду.

## Структура репозитория
```
syndicate-store/
├── backend/
│   └── strapi/          # Исходники Strapi (package.json, config/, src/, ...)
├── frontend/
│   └── nextjs/          # Исходники Next.js
├── telegram-bot/
│   └── bot.js           # Исходники Telegram-бота (Telegraf / node-telegram-bot-api)
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.strapi
│   ├── Dockerfile.nextjs
│   ├── Dockerfile.bot
│   ├── Dockerfile.nginx
│   └── nginx/
│       └── default.conf # Конфигурация Nginx
├── .env.example         # Пример переменных окружения
└── README.md            # Данный файл
```

## Установка и запуск (Docker)
1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-account/syndicate-store.git
   cd syndicate-store
   ```
2. **Создайте .env:**
   ```bash
   cp .env.example .env
   ```
3. **Соберите образы и запустите контейнеры:**
   ```bash
   docker compose build
   docker compose up -d
   ```
4. **Проверьте работу:**
   - Фронтенд: [http://localhost](http://localhost)
   - Админка Strapi: [http://localhost/admin](http://localhost/admin)

## Переменные окружения (.env)
Пример содержимого **.env.example**:
```
POSTGRES_USER=synadmin
POSTGRES_PASSWORD=password
POSTGRES_DB=syndicate_db

STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337
SERVER_URL=https://syndicate-store.ru

NEXT_PUBLIC_SITE_URL=https://syndicate-store.ru
NEXT_PUBLIC_API_URL=https://syndicate-store.ru

TELEGRAM_BOT_TOKEN=1234567:ABCDEF
```

## Настройка Telegram-бота
1. Создайте бота в **BotFather** → получите **токен**.
2. Запишите в `.env` переменную `TELEGRAM_BOT_TOKEN=...`.
3. Запустите сервис бота через `docker-compose`.

## Конфигурация Nginx и SSL
Пример конфигурации **default.conf**:
```nginx
server {
    listen 80;
    server_name syndicate-store.ru www.syndicate-store.ru;
    return 301 https://$host$request_uri;
}
```

## Частые проблемы и решения
- **Порт 80 занят**: остановите Nginx/Apache или поменяйте порты в `docker-compose.yml`.
- **Strapi в зацикленном редиректе**: проверьте конфигурацию `default.conf`.
- **Бот не отвечает**: проверьте `TELEGRAM_BOT_TOKEN`, логи сервиса.
- **Ошибка подключения к БД**: убедитесь, что `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD` совпадают с `docker-compose.yml`.

## Лицензия
MIT License

