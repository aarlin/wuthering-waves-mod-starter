"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectManagerBusinessProxy = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global");
class EffectManagerBusinessProxy {
	constructor() {
		(this.Clr = void 0),
			(this.glr = void 0),
			(this.flr = void 0),
			(this.plr = 0),
			(this.vlr = (e) => {
				EffectSystem_1.EffectSystem.GetHideOnBurstSkill(e) && this.glr.add(e);
			}),
			(this.Mlr = (e) => {
				this.glr.delete(e);
			}),
			(this.xie = () => {
				(this.flr = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()),
					(this.plr =
						Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0);
			}),
			(this.EYe = (e, t, s) => {
				this.flr &&
					e === this.plr &&
					(e = this.flr.GetComponent(33)?.GetSkillInfo(t)) &&
					3 === e.SkillGenre &&
					this.glr.forEach((e) => {
						EffectSystem_1.EffectSystem.IsValid(e) &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("RenderEffect", 26, "Effect Recycled By Burst", [
									"path",
									EffectSystem_1.EffectSystem.GetPath(e),
								]),
							EffectSystem_1.EffectSystem.StopEffectById(
								e,
								"[EffectManagerBusinessProxy.OnCharUseSkill]",
								!0,
							));
					});
			});
	}
	static Get() {
		return (
			this.Me || ((this.Me = new EffectManagerBusinessProxy()), this.Me.Init()),
			this.Me
		);
	}
	Init() {
		(this.Clr = void 0),
			(this.glr = new Set()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BeforePlayEffect,
				this.vlr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.FinishEffect,
				this.Mlr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUseSkill,
				this.EYe,
			);
	}
}
exports.EffectManagerBusinessProxy = EffectManagerBusinessProxy;
