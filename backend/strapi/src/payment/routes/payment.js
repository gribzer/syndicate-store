"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment/crypto-callback",
      handler: "payment.cryptoCallback",
      config: {
        auth: false, // если не нужно требовать JWT
      },
    },
  ],
};
