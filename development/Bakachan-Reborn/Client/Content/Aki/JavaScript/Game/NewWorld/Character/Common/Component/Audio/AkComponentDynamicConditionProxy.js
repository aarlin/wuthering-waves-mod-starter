"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AkComponentDynamicConditionProxy = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	BONE_HIDDEN_SWITCH = 4;
class BoneHiddenSwitch {
	constructor() {
		(this.BoneName = ""),
			(this.SwitchGroup = ""),
			(this.HiddenSwitch = ""),
			(this.VisibleSwitch = ""),
			(this.LastHidden = !1);
	}
	Init(i, t) {
		var e = t.BoneHiddenSwitch;
		4 !== e.length &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Audio",
				58,
				"[BoneHiddenSwitch] BoneHiddenSwitch配置无效",
				["ConfigId:", t.Id],
			),
			(this.BoneName = e[0]),
			(this.SwitchGroup = e[1]),
			(this.HiddenSwitch = e[2]),
			(this.VisibleSwitch = e[3]),
			(this.LastHidden = i.Actor.Mesh.IsBoneHiddenByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
			)),
			this.S$o(this.LastHidden, i);
	}
	Do(i) {
		var t = i.Actor.Mesh.IsBoneHiddenByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
			),
			e = t !== this.LastHidden;
		(this.LastHidden = t), e && this.S$o(this.LastHidden, i);
	}
	S$o(i, t) {}
	Clear() {}
}
class AkComponentDynamicConditionProxy {
	constructor() {
		this.Qte = new Array();
	}
	Init(i, t) {
		var e;
		this.Clear(),
			0 < t.BoneHiddenSwitch.length &&
				((e = new BoneHiddenSwitch()).Init(i, t), this.Qte.push(e));
	}
	Do(i) {
		for (const t of this.Qte) t.Do(i);
	}
	Clear() {
		for (const i of this.Qte) i.Clear();
		this.Qte.length = 0;
	}
}
exports.AkComponentDynamicConditionProxy = AkComponentDynamicConditionProxy;
