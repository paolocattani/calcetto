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
var Player_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
const dto_1 = require("../../../src/@common/dto");
let Player = Player_1 = class Player extends sequelize_typescript_1.Model {
    toString() {
        return `[ id=${this.id} , name=${this.name} , surname=${this.surname} , alias=${this.alias} , role=${this.role} , match_played=${this.match_played} ,  match_won=${this.match_won} , total_score=${this.total_score}]`;
    }
};
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Player.prototype, "surname", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Player.prototype, "alias", void 0);
__decorate([
    sequelize_typescript_1.Default(dto_1.PlayerRole.GoalKeeper),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ENUM(dto_1.PlayerRole.GoalKeeper, dto_1.PlayerRole.Striker, dto_1.PlayerRole.Master)),
    __metadata("design:type", String)
], Player.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Player.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Player.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Player.prototype, "match_played", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Player.prototype, "match_won", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Player.prototype, "total_score", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Comment('User'),
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Player.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User, 'userId'),
    __metadata("design:type", _1.User)
], Player.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            if (this.pair1 && this.pair1.length > 0)
                return false;
            return !(this.pair2 && this.pair2.length > 0);
        },
    }),
    __metadata("design:type", Boolean)
], Player.prototype, "editable", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            return this.alias ? this.alias : `${this.name} ${this.surname}`;
        },
    }),
    __metadata("design:type", String)
], Player.prototype, "label", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Pair, 'player1Id'),
    __metadata("design:type", Array)
], Player.prototype, "pair1", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Pair, 'player2Id'),
    __metadata("design:type", Array)
], Player.prototype, "pair2", void 0);
Player = Player_1 = __decorate([
    sequelize_typescript_1.Scopes(() => ({
        withPairs: {
            include: [Player_1.associations.pair1, Player_1.associations.pair2],
        },
    })),
    sequelize_typescript_1.Table({ tableName: 'player', modelName: 'Player', freezeTableName: true, version: false })
], Player);
exports.default = Player;
