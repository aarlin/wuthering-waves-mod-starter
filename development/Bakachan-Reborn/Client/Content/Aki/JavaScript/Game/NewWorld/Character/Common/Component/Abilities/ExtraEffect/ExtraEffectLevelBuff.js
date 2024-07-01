"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExtraEffectLevelBuff = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	AbilityUtils_1 = require("../AbilityUtils"),
	ExtraEffectBase_1 = require("./ExtraEffectBase"),
	LevelBuffSceneItem_1 = require("./LevelBuffs/LevelBuffSceneItem"),
	LevelBuffSetWalkableFloorAngle_1 = require("./LevelBuffs/LevelBuffSetWalkableFloorAngle"),
	levelBuffClassMap = {
		LevelBuffSceneItem: LevelBuffSceneItem_1.LevelBuffSceneItem,
		LevelBuffSetWalkableFloorAngle:
			LevelBuffSetWalkableFloorAngle_1.LevelBuffSetWalkableFloorAngle,
	};
class ExtraEffectLevelBuff extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.IQo = void 0);
	}
	InitParameters(e) {
		var t = e.ExtraEffectParameters[0],
			f = e.ExtraEffectParameters.slice(1),
			l = AbilityUtils_1.AbilityUtils.GetLevelValue(
				e.ExtraEffectGrowParameters1,
				this.Level,
				0,
			),
			r =
				((e = AbilityUtils_1.AbilityUtils.GetLevelValue(
					e.ExtraEffectGrowParameters2,
					this.Level,
					0,
				)),
				levelBuffClassMap[t]);
		r
			? (this.IQo = new r(this.OwnerEntity, this.BuffId, f, l, e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					29,
					"没有注册玩法效果",
					["ClassName", t],
					["Buff", this.BuffId],
				);
	}
	OnCreated() {
		this.IQo?.OnCreated();
	}
	OnExecute() {}
	OnRemoved(e) {
		this.IQo?.OnRemoved(e);
	}
	OnStackIncreased(e, t) {
		this.IQo?.OnStackChanged(e, t, !1);
	}
	OnStackDecreased(e, t, f) {
		this.IQo?.OnStackChanged(e, t, f);
	}
}
exports.ExtraEffectLevelBuff = ExtraEffectLevelBuff;
