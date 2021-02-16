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
let Pair = class Pair extends sequelize_typescript_1.Model {
    toString() {
        var _a, _b;
        return `[ id=${this.id} , tournamentId=${this.tournamentId} , player1=${(_a = this.player1) === null || _a === void 0 ? void 0 : _a.toString()} , player2=${(_b = this.player2) === null || _b === void 0 ? void 0 : _b.toString()} , alias=${this.alias} , stage1Name=${this.stage1Name}]`;
    }
};
__decorate([
    sequelize_typescript_1.Comment('Pair alias'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Pair.prototype, "alias", void 0);
__decorate([
    sequelize_typescript_1.Comment('Stage 1 name'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Pair.prototype, "stage1Name", void 0);
__decorate([
    sequelize_typescript_1.Comment('Placement in stage 1'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Pair.prototype, "placement", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Comment('Selected for stage 2'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Pair.prototype, "stage2Selected", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Pair.prototype, "paid1", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Pair.prototype, "paid2", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Tournament),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Pair.prototype, "tournamentId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Tournament),
    __metadata("design:type", _1.Tournament)
], Pair.prototype, "tournament", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Player),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Pair.prototype, "player1Id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Player, 'player1Id'),
    __metadata("design:type", _1.Player)
], Pair.prototype, "player1", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Player),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Pair.prototype, "player2Id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Player, 'player2Id'),
    __metadata("design:type", _1.Player)
], Pair.prototype, "player2", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Stage2),
    __metadata("design:type", Array)
], Pair.prototype, "stage2", void 0);
Pair = __decorate([
    sequelize_typescript_1.Table({ tableName: 'pairs', modelName: 'Pair', freezeTableName: true, version: false })
], Pair);
exports.default = Pair;
