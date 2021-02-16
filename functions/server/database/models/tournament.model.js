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
const dto_1 = require("../../../src/@common/dto");
let Tournament = class Tournament extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Comment('Nome'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Comment('Data'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Tournament.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Comment('Stato'),
    sequelize_typescript_1.Default(dto_1.TournamentProgress.New),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ENUM(dto_1.TournamentProgress.New, dto_1.TournamentProgress.PairsSelection, dto_1.TournamentProgress.Stage1, dto_1.TournamentProgress.Stage2)),
    __metadata("design:type", String)
], Tournament.prototype, "progress", void 0);
__decorate([
    sequelize_typescript_1.Comment('Visibile ad utenti non loggati'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Tournament.prototype, "public", void 0);
__decorate([
    sequelize_typescript_1.Comment('Ordinamento automatico'),
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Tournament.prototype, "autoOrder", void 0);
__decorate([
    sequelize_typescript_1.Comment('Label'),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            return `${this.name} @ ${this.progress}`;
        },
    }),
    __metadata("design:type", String)
], Tournament.prototype, "label", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Pair),
    __metadata("design:type", Array)
], Tournament.prototype, "pairs", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Stage1),
    __metadata("design:type", Array)
], Tournament.prototype, "Stage1", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Stage2),
    __metadata("design:type", Array)
], Tournament.prototype, "Stage2", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Comment('Id Owner'),
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Tournament.prototype, "ownerId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User, 'ownerId'),
    __metadata("design:type", _1.User)
], Tournament.prototype, "owner", void 0);
Tournament = __decorate([
    sequelize_typescript_1.Table({ tableName: 'tournament', modelName: 'Tournament', freezeTableName: true, version: false })
], Tournament);
exports.default = Tournament;
