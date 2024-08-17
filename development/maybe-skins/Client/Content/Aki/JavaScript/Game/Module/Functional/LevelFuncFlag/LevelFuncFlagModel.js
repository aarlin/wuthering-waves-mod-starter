"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelFuncFlagModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LevelFuncFlagDefine_1 = require("./LevelFuncFlagDefine");
class LevelFuncFlagModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.BRe = new Map());
	}
	OnInit() {
		for (var [e, n] of LevelFuncFlagDefine_1.levelFuncFlagDefaultVal)
			this.BRe.set(e, n);
		for (var [t, l] of this.BRe)
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnLevelFuncFlagSet,
				t,
				l,
			);
		return !0;
	}
	OnClear() {
		return this.BRe.clear(), !0;
	}
	GetFuncFlagEnable(e) {
		return this.BRe.get(e) ?? !1;
	}
	GetFuncFlagDefault(e) {
		return LevelFuncFlagDefine_1.levelFuncFlagDefaultVal.get(e) ?? !1;
	}
	SetFuncFlagEnable(e, n) {
		this.BRe.get(e) !== n &&
			(this.BRe.set(e, n),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Functional",
					40,
					"关卡功能标记更新",
					["funcFlagId", e],
					["enable", n],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnLevelFuncFlagChanged,
				e,
				n,
			));
	}
	ResetFuncFlagToDefault(e) {
		var n = LevelFuncFlagDefine_1.levelFuncFlagDefaultVal.get(e) ?? !1;
		this.SetFuncFlagEnable(e, n);
	}
}
exports.LevelFuncFlagModel = LevelFuncFlagModel;
