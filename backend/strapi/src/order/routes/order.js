"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders",
      handler: "order.create",
      config: {
        auth: {
          // можно ограничить доступ, например, только авторизованные пользователи
          scope: ['authenticated']
        },
      },
    },
    {
      method: "PUT",
      path: "/orders/:id/status",
      handler: "order.updateStatus",
      config: {
        auth: false,
      },
    },
  ],
};
