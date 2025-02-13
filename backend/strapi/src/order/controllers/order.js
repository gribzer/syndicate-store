"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Создаём новый заказ
  async create(ctx) {
    // ctx.state.user – пользователь, полученный из JWT (если вы используете аутентификацию)
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized("User not authenticated");
    }

    try {
      const { products, totalPrice, currency } = ctx.request.body;

      // Создаём заказ
      const newOrder = await strapi.db
        .query("api::order.order")
        .create({
          data: {
            status: "pending",
            totalPrice,
            currency,
            products,
            user: user.id,
          },
        });

      return newOrder;
    } catch (error) {
      console.error(error);
      return ctx.badRequest("Could not create order");
    }
  },

  // Обновление заказа (например, после оплаты)
  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, transactionHash } = ctx.request.body;

    try {
      const updatedOrder = await strapi.db
        .query("api::order.order")
        .update({
          where: { id },
          data: { status, transactionHash },
        });

      return updatedOrder;
    } catch (error) {
      console.error(error);
      return ctx.badRequest("Could not update order");
    }
  },
}));
