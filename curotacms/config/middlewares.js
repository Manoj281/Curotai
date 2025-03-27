module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: false,
      cors: {
        enabled: true,
        origin: ['*'],
        methods: ['*'],
        headers: ['*']
      }
    }
  },
  'strapi::cors', // Keep this default middleware
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon', // Required middleware
  'strapi::public'
];
