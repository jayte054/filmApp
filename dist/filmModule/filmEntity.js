"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmEntity = void 0;
const authEntity_1 = require("../authModule/authEntity");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
let FilmEntity = class FilmEntity extends typeorm_1.BaseEntity {
};
exports.FilmEntity = FilmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FilmEntity.prototype, "filmId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => authEntity_1.AuthEntity, (user) => user.authId, { eager: false }),
    __metadata("design:type", authEntity_1.AuthEntity)
], FilmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FilmEntity.prototype, "userAuthId", void 0);
exports.FilmEntity = FilmEntity = __decorate([
    (0, typeorm_1.Entity)()
], FilmEntity);
//# sourceMappingURL=filmEntity.js.map