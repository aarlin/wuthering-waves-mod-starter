"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelUtil = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
	EffectUtil_1 = require("../../Utils/EffectUtil");
class UiModelUtil {
	static PlayEffectOnRoot(e, t) {
		var o = e.CheckGetComponent(4);
		(e = e.CheckGetComponent(1)),
			(t = EffectUtil_1.EffectUtil.GetEffectPath(t)),
			(e = e?.MainMeshComponent);
		e
			? o?.PlayEffectOnRoot(
					t,
					e,
					CharacterNameDefines_1.CharacterNameDefines.ROOT,
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 44, "MainMeshComponent为空");
	}
	static PlayEffectAtRootComponent(e, t) {
		var o = e.CheckGetComponent(4);
		(e = e.CheckGetComponent(1)),
			(t = EffectUtil_1.EffectUtil.GetEffectPath(t)),
			(e = e?.Actor?.RootComponent);
		e
			? o?.PlayEffectOnRoot(t, e, FNameUtil_1.FNameUtil.EMPTY)
			: Log_1.Log.CheckError() && Log_1.Log.Error("Character", 44, "Actor为空");
	}
	static SetRenderingMaterial(e, t) {
		return e.CheckGetComponent(5)?.SetRenderingMaterial(t) ?? 0;
	}
	static RemoveRenderingMaterial(e, t) {
		e.CheckGetComponent(5)?.RemoveRenderingMaterial(t);
	}
	static SetVisible(e, t) {
		return e.CheckGetComponent(0)?.SetVisible(t) ?? !1;
	}
}
exports.UiModelUtil = UiModelUtil;
