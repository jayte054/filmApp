"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = __importDefault(require("config"));
const authEntity_1 = require("../authModule/authEntity");
const filmEntity_1 = require("../filmModule/filmEntity");
const purchaseEntity_1 = require("../purchaseModule/purchaseEntity");
const dbConfig = config_1.default.get('db');
exports.typeOrmConfig = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [authEntity_1.AuthEntity, filmEntity_1.FilmEntity, purchaseEntity_1.PurchaseEntity],
    synchronize: process.env.TypeORM_SYNC || dbConfig.synchronize,
    migrations: ['dist/migrations/*.js'],
};
//# sourceMappingURL=typeOrmConfig.js.map