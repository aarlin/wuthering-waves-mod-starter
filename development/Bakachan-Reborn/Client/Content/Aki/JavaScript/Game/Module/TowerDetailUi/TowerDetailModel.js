"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDetailModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TowerDetailData_1 = require("./TowerDetailData");
class TowerDetailModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.CurrentSelectDetailId = 0),
			(this.TowerTitle = ""),
			(this.SwitchButtonIndex = 0),
			(this.SwitchData = new Array()),
			(this.IQ = new Map()),
			(this.WTo = new Map());
	}
	AddSwitchData(e, t) {
		var a = new TowerDetailData_1.TowerSwitchData();
		(a.Index = e),
			(a.Name = t),
			this.IQ.set(a, new Array()),
			this.WTo.set(a, new Array()),
			this.SwitchData.push(a);
	}
	AddBuff(e, t, a, r) {
		const i = new TowerDetailData_1.TowerDetailBuffData();
		(i.Buffs = t),
			(i.Title = a),
			(i.Priority = r),
			this.SwitchData.forEach((t) => {
				t.Index === e && this.IQ.get(t).push(i);
			});
	}
	GetBuffs(e) {
		return this.IQ.get(e);
	}
	AddMonster(e, t, a, r) {
		const i = new TowerDetailData_1.TowerDetailMonsterData();
		(i.Title = a),
			(i.MonsterInfos = t),
			(i.Priority = r),
			this.SwitchData.forEach((t) => {
				t.Index === e && this.WTo.get(t).push(i);
			});
	}
	GetMonsters(e) {
		return this.WTo.get(e);
	}
	Reset() {
		(this.IQ = new Map()),
			(this.WTo = new Map()),
			(this.SwitchData = new Array());
	}
}
exports.TowerDetailModel = TowerDetailModel;
