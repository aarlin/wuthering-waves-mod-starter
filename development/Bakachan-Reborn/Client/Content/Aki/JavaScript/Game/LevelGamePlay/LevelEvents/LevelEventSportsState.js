"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSportsState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Global_1 = require("../../Global"),
	CharacterSlideComponent_1 = require("../../NewWorld/Character/Common/Component/Move/CharacterSlideComponent"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventSportsState extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		if (e) {
			var o = e.Config;
			switch (o.Type) {
				case "Slide":
					CharacterSlideComponent_1.CharacterSlideComponent.SetSlideConfig(
						o.SlideId,
					);
					break;
				case "Ski":
					switch (o.Config.Type) {
						case "Open":
							this.VRe(o.Config, t);
							break;
						case "Close":
							this.HRe(o.Config, t);
							break;
						case "Accelerate":
							this.jRe(o.Config, t);
					}
			}
		} else this.FinishExecute(!1);
	}
	VRe(e, t) {
		if (t instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext) {
			let o;
			(o =
				"Player" === e.Target.Type
					? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()
					: o)
				? o.GetComponent(32)?.EnterSkiMode(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						51,
						"目前仅Role支持触发滑雪模式",
						["ContextType", t.Type],
						["TreeId", t.TreeConfigId],
						["NodeId", t.NodeId],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					6,
					"LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext",
					["ContextType", t.Type],
				);
	}
	HRe(e, t) {
		if (t instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext) {
			let o;
			(o =
				"Player" === e.Target.Type
					? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()
					: o)
				? o.GetComponent(32)?.ExitSkiMode()
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						51,
						"目前仅Role支持关闭滑雪模式",
						["ContextType", t.Type],
						["TreeId", t.TreeConfigId],
						["NodeId", t.NodeId],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					6,
					"LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext",
					["ContextType", t.Type],
				);
	}
	jRe(e, t) {
		t instanceof LevelGeneralContextDefine_1.TriggerContext
			? EntitySystem_1.EntitySystem.GetComponent(
					t.OtherEntityId,
					32,
				)?.SetSkiAccel(e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					6,
					"LevelEventSportsState Ski: Triggered类型必须对应TriggerContext",
					["ContextType", t.Type],
				);
	}
}
exports.LevelEventSportsState = LevelEventSportsState;
