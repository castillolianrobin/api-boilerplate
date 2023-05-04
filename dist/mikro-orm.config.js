"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    entities: ["dist/**/entities/**/*.js"],
    entitiesTs: ["src/**/entities/**/*.ts"],
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    debug: process.env.NODE_ENV !== 'production',
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map