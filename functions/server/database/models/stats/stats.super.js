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
const math_utils_1 = require("../../../../src/@common/utils/math.utils");
class StatsGeneric extends sequelize_typescript_1.Model {
}
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "s1win", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "s1def", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "s2win", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "s2def", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "totwin", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "totdef", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "ratiotot", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totwin) + Number(this.totdef);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "totMatch", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.s1win) + Number(this.s1def);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "totS1", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.s2win) + Number(this.s2def);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "totS2", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.s1def) == 0 ? 1 : math_utils_1.roundNumber(Number(this.s1win) / Number(this.s1def), 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "ratioS1", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.s2def) == 0 ? 1 : math_utils_1.roundNumber(Number(this.s2win) / Number(this.s2def), 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "ratioS2", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totdef) == 0 ? 1 : math_utils_1.roundNumber(Number(this.totwin) / Number(this.totdef), 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "ratioTot", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totMatch) == 0
                ? 100
                : math_utils_1.roundNumber(((Number(this.s1win) + Number(this.s2win)) * 100) / this.totMatch, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "winPercentage", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totS1) == 0 ? 100 : math_utils_1.roundNumber((this.s1win * 100) / this.totS1, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "winS1Percentage", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totS2) == 0 ? 100 : math_utils_1.roundNumber((this.s2win * 100) / this.totS2, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "winS2Percentage", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totMatch) == 0
                ? 100
                : math_utils_1.roundNumber(((Number(this.s1def) + Number(this.s2def)) * 100) / this.totMatch, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "defPercentage", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totS1) == 0 ? 100 : math_utils_1.roundNumber((this.s1def * 100) / this.totS1, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "defS1Percentage", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL(sequelize_typescript_1.DataType.NUMBER),
        get() {
            return Number(this.totS2) == 0 ? 100 : math_utils_1.roundNumber((this.s2def * 100) / this.totS2, 2);
        },
    }),
    __metadata("design:type", Number)
], StatsGeneric.prototype, "defS2Percentage", void 0);
exports.default = StatsGeneric;
