module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', 'https://syndicate-store.ru/api'), 
    app: {
      keys: env.array('APP_KEYS', ['yourKey1', 'yourKey2']),
    },
  });
  