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
let Stage1 = class Stage1 extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Stage1.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Tournament),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage1.prototype, "tournamentId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Tournament),
    __metadata("design:type", _1.Tournament)
], Stage1.prototype, "tournament", void 0);
__decorate([
    sequelize_typescript_1.Comment('Pair 1'),
    sequelize_typescript_1.ForeignKey(() => _1.Pair),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage1.prototype, "pair1Id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Pair, 'pair1Id'),
    __metadata("design:type", _1.Pair)
], Stage1.prototype, "pair1", void 0);
__decorate([
    sequelize_typescript_1.Comment('Pair 2'),
    sequelize_typescript_1.ForeignKey(() => _1.Pair),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage1.prototype, "pair2Id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Pair, 'pair2Id'),
    __metadata("design:type", _1.Pair)
], Stage1.prototype, "pair2", void 0);
__decorate([
    sequelize_typescript_1.Comment('Score of pair1 vs pair2'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage1.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Stage1.prototype, "placement", void 0);
Stage1 = __decorate([
    sequelize_typescript_1.Table({ tableName: 'stage1', modelName: 'Stage1', freezeTableName: true, version: false })
], Stage1);
exports.default = Stage1;
