module.exports = {
  apps: [
    {
      name: "wgp-api",
      script: "./index.js",
      watch: true,
      env: {
        NODE_ENV: "dev",
      },
      env_production: {
        NODE_ENV: "prod",
      },
    },
  ],
};
