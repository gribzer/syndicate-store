"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  // Пример переопределённого метода find
  async find(ctx) {
    // Добавим свою бизнес-логику при необходимости
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
