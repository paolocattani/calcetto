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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var StatsPairs_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const player_model_1 = __importDefault(require("../player.model"));
const stats_super_1 = __importDefault(require("./stats.super"));
let StatsPairs = StatsPairs_1 = class StatsPairs extends stats_super_1.default {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => player_model_1.default),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsPairs.prototype, "player1id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => player_model_1.default, 'player1id'),
    __metadata("design:type", player_model_1.default)
], StatsPairs.prototype, "player1", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => player_model_1.default),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsPairs.prototype, "player2id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => player_model_1.default, 'player2id'),
    __metadata("design:type", player_model_1.default)
], StatsPairs.prototype, "player2", void 0);
StatsPairs = StatsPairs_1 = __decorate([
    sequelize_typescript_1.DefaultScope(() => ({
        include: [StatsPairs_1.associations.player1, StatsPairs_1.associations.player2],
    })),
    sequelize_typescript_1.Table({ tableName: 'stats_pairs', freezeTableName: true, version: false, timestamps: false })
], StatsPairs);
exports.default = StatsPairs;
