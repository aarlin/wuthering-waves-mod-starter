"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectUtil = void 0);
const UE = require("ue"),
	EffectConfigById_1 = require("../../Core/Define/ConfigQuery/EffectConfigById"),
	EffectSystem_1 = require("../Effect/EffectSystem"),
	GlobalData_1 = require("../GlobalData");
class EffectUtil {
	static GetEffectPath(e) {
		return EffectConfigById_1.configEffectConfigById.GetConfig(e).Path;
	}
	static SpawnUiEffect(e, t, f = new UE.Transform(), c) {
		return (
			(e = EffectUtil.GetEffectPath(e)),
			EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				f,
				e,
				t,
				void 0,
				1,
			)
		);
	}
}
exports.EffectUtil = EffectUtil;
