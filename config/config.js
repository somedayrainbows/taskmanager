const fs = require('fs');

module.exports = {
    development: {
        database: "taskmanager",
        host: "127.0.0.1",
        dialect: "postgres",
    },
    production: {
        dialect: "postgres",
        host: process.env.RDS_HOSTNAME,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        database: process.env.RDS_DB_NAME,
    }
};