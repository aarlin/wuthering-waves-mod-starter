"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MingSuInstance = void 0);
const DragonPoolById_1 = require("../../../Core/Define/ConfigQuery/DragonPoolById");
class MingSuInstance {
	constructor(t) {
		(this.RBi = 0),
			(this.ABi = 0),
			(this.PBi = 0),
			(this.xBi = 0),
			(this.DBi = void 0),
			(this.UBi = void 0),
			(this.RBi = t),
			(this.UBi = DragonPoolById_1.configDragonPoolById.GetConfig(this.RBi)),
			(this.ABi = 0),
			(this.PBi = 0),
			(this.xBi = 0);
	}
	SetDragonPoolLevel(t) {
		this.PBi = t;
	}
	GetDragonPoolLevel() {
		return this.PBi;
	}
	SetDragonPoolState(t) {
		this.ABi = t;
	}
	GetDragonPoolState() {
		return this.ABi;
	}
	SetHadCoreCount(t) {
		this.xBi = t;
	}
	GetHadCoreCount() {
		return this.xBi;
	}
	GetDragonPoolMaxLevel() {
		return this.UBi.Goal.length;
	}
	GetNeedCoreCount(t) {
		return this.UBi.Goal[t];
	}
	GetGoalList() {
		return this.UBi.Goal;
	}
	GetRewardId(t) {
		return this.UBi.DropIds[t];
	}
	GetCoreId() {
		return this.UBi.CoreId;
	}
	SetDropItemList(t) {
		this.DBi = t;
	}
	GetDropItemList() {
		return this.DBi;
	}
}
exports.MingSuInstance = MingSuInstance;
