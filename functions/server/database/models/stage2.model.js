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
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
let Stage2 = class Stage2 extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Comment('Id Torneo'),
    sequelize_typescript_1.ForeignKey(() => _1.Tournament),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage2.prototype, "tournamentId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Tournament),
    __metadata("design:type", _1.Tournament)
], Stage2.prototype, "tournament", void 0);
__decorate([
    sequelize_typescript_1.Comment('Id Coppia'),
    sequelize_typescript_1.ForeignKey(() => _1.Pair),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage2.prototype, "pairId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Pair, 'pairId'),
    __metadata("design:type", _1.Pair)
], Stage2.prototype, "pair", void 0);
__decorate([
    sequelize_typescript_1.Comment('Step'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage2.prototype, "step", void 0);
__decorate([
    sequelize_typescript_1.Comment('Order'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage2.prototype, "order", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Comment('Rank'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage2.prototype, "rank", void 0);
Stage2 = __decorate([
    sequelize_typescript_1.Table({ tableName: 'stage2', comment: 'Stage2', modelName: 'Stage2', freezeTableName: true, version: false })
], Stage2);
exports.default = Stage2;
