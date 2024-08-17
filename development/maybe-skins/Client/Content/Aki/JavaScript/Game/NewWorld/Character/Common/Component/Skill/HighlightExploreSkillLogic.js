"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HighlightExploreSkillLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	RouletteController_1 = require("../../../../../Module/Roulette/RouletteController");
class HighlightExploreSkillLogic {
	constructor() {
		(this.MJo = -2028614394),
			(this.Gco = 1001),
			(this.SJo = !1),
			(this.EJo = !1),
			(this.TDe = void 0),
			(this.Lie = void 0),
			(this.yJo = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"LevelEvent",
						43,
						"高亮时间结束，玩家探索技能取消高亮",
						["Id", this.Gco],
					),
					this.IJo(this.SJo);
			}),
			(this.TJo = () => {
				ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !==
					this.Gco &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							43,
							"切换探索技能，玩家探索技能取消高亮",
							["Id", this.Gco],
						),
					this.IJo(!1));
			}),
			(this.LJo = (e, t, o) => {
				t === this.Gco - 1001 + 210001 &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							43,
							"使用高亮技能，玩家探索技能取消高亮",
							["Id", this.Gco],
						),
					this.IJo(this.SJo));
			});
	}
	Init(e) {
		this.Lie = e;
	}
	Clear() {
		this.EJo && this.IJo(), (this.Lie = void 0);
	}
	ShowHighlightExploreSkill(e, t, o) {
		this.EJo ||
			((this.Gco = e),
			(this.SJo = void 0 !== o && o),
			(e = t * TimeUtil_1.TimeUtil.InverseMillisecond),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("LevelEvent", 43, "主动触发玩家探索技能高亮", [
					"Id",
					this.Gco,
				]),
			this.DJo(e));
	}
	HideHighlightExploreSkill() {
		this.EJo &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("LevelEvent", 43, "主动触发玩家探索技能取消高亮", [
					"Id",
					this.Gco,
				]),
			this.IJo(this.SJo));
	}
	DJo(e) {
		(this.EJo = !0),
			this.Lie && !this.Lie.HasTag(this.MJo) && this.Lie.AddTag(this.MJo),
			RouletteController_1.RouletteController.ExploreSkillSetRequest(this.Gco),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUseSkill,
				this.LJo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.TJo,
			),
			(this.TDe = TimerSystem_1.TimerSystem.Delay(this.yJo, e));
	}
	IJo(e = !1) {
		(this.EJo = !1),
			this.Lie && this.Lie.HasTag(this.MJo) && this.Lie.RemoveTag(this.MJo),
			e && RouletteController_1.RouletteController.SetLastSkillId(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharUseSkill,
				this.LJo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.TJo,
			),
			this.TDe &&
				TimerSystem_1.TimerSystem.Has(this.TDe) &&
				(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
	}
}
exports.HighlightExploreSkillLogic = HighlightExploreSkillLogic;
