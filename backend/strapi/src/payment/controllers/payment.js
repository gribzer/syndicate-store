"use strict";

module.exports = {
  async cryptoCallback(ctx) {
    try {
      // Данные от крипто-провайдера (webhook)
      const { orderId, txHash, amount, status } = ctx.request.body;

      // Находим заказ
      const order = await strapi.db.query("api::order.order").findOne({
        where: { id: orderId },
      });

      if (!order) {
        return ctx.notFound("Order not found");
      }

      // Проверяем статус транзакции от провайдера
      if (status === "SUCCESS") {
        // Обновляем статус
        await strapi.db.query("api::order.order").update({
          where: { id: orderId },
          data: {
            status: "paid",
            transactionHash: txHash,
          },
        });
      } else {
        await strapi.db.query("api::order.order").update({
          where: { id: orderId },
          data: {
            status: "canceled",
          },
        });
      }

      return { received: true };
    } catch (err) {
      console.error(err);
      return ctx.badRequest("Error processing webhook");
    }
  },
};
