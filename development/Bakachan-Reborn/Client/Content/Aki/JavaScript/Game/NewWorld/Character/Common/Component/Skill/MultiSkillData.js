"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiSkillData = exports.MultiSkillInfo = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MultiSkillInfo {
	constructor() {
		(this.FirstSkillId = 0),
			(this.CurSkillId = 0),
			(this.NextSkillId = void 0),
			(this.StartTime = -0),
			(this.RemainingStartTime = -0),
			(this.StopTime = -0),
			(this.RemainingStopTime = -0),
			(this.IsReset = !1),
			(this.IsResetOnChangeRole = !1);
	}
}
exports.MultiSkillInfo = MultiSkillInfo;
class MultiSkillData {
	constructor() {
		(this.MultiSkillInfoMap = new Map()),
			(this.MultiSkillInfos = []),
			(this.EntityId = 0),
			(this.VisionEntityId = 0);
	}
	Init(i, t = 0) {
		(this.EntityId = i), (this.VisionEntityId = t);
	}
	IsMultiSkill(i) {
		return 1 < i.CooldownConfig.SectionCount;
	}
	CanStartMultiSkill(i) {
		var t = i.SkillId,
			e = this.MultiSkillInfoMap.get(t);
		i = i.SkillInfo.CooldownConfig;
		return e
			? e.NextSkillId
				? e.NextSkillId !== t
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Battle",
								18,
								"多段技能使用的不是下一段技能",
								["传入技能Id", t],
								["下一段技能Id", e.NextSkillId],
							),
						!1)
					: !(
							0 < e.RemainingStartTime &&
							(Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Battle",
									18,
									"多段技能还没到下一段技能可使用的时间",
									["技能Id", t],
								),
							1)
						)
				: e.FirstSkillId === t ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Battle",
							18,
							"多段技能必须从第一段技能开始",
							["传入技能Id", t],
							["第一段技能Id", e.FirstSkillId],
						),
					!1)
			: i.SectionCount - i.SectionRemaining == 1 ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Battle",
							18,
							"多段技能必须从第一段技能开始",
							["传入技能Id", t],
							["段数", i.SectionCount - i.SectionRemaining],
						),
					!1);
	}
	StartMultiSkill(i, t = !0) {
		if (t && !this.CanStartMultiSkill(i)) return !1;
		t = i.SkillId;
		let e = this.MultiSkillInfoMap.get(t);
		return (
			(i = i.SkillInfo.CooldownConfig),
			e ||
				(((e = new MultiSkillInfo()).FirstSkillId = t),
				this.MultiSkillInfoMap.set(t, e),
				this.MultiSkillInfos.push(e)),
			(e.CurSkillId = t),
			(e.NextSkillId = i.NextSkillId),
			(e.IsReset = i.IsReset),
			(e.IsResetOnChangeRole = i.IsResetOnChangeRole),
			0 === e.NextSkillId ||
				((e.StartTime = i.StartTime),
				(e.RemainingStartTime = e.StartTime),
				(e.StopTime = i.StopTime),
				(e.RemainingStopTime = e.StopTime),
				this.MultiSkillInfoMap.set(e.NextSkillId, e)),
			this.RJo(e),
			!0
		);
	}
	OnTick(i) {
		var t = i * TimeUtil_1.TimeUtil.Millisecond;
		for (const i of this.MultiSkillInfos)
			0 !== i.NextSkillId &&
				(0 < i.RemainingStartTime &&
					((i.RemainingStartTime -= t), i.RemainingStartTime <= 0) &&
					this.UJo(i),
				(i.RemainingStopTime -= t),
				i.RemainingStopTime <= 0) &&
				((i.NextSkillId = 0), this.RJo(i));
	}
	ResetMultiSkills(i, t = !1) {
		var e = this.MultiSkillInfoMap.get(i);
		e &&
			(e.IsReset || t) &&
			e.NextSkillId &&
			e.CurSkillId === i &&
			((e.NextSkillId = 0),
			(e.RemainingStartTime = 0),
			(e.RemainingStopTime = 0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "多段技能被打断", ["技能Id", i]),
			this.RJo(e));
	}
	ResetOnChangeRole() {
		for (const i of this.MultiSkillInfos)
			i.IsResetOnChangeRole &&
				((i.NextSkillId = 0),
				(i.RemainingStartTime = 0),
				(i.RemainingStopTime = 0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "换人时清理所有多段技能", [
						"vision",
						i.FirstSkillId,
					]),
				this.RJo(i));
	}
	ClearAllSkill() {
		for (const i of this.MultiSkillInfos)
			0 !== i.NextSkillId &&
				((i.NextSkillId = 0),
				(i.RemainingStartTime = 0),
				(i.RemainingStopTime = 0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Battle", 18, "清理所有多段技能", [
						"vision",
						this.VisionEntityId,
					]),
				this.RJo(i));
	}
	GetNextMultiSkillId(i) {
		var t = this.MultiSkillInfoMap.get(i);
		return t ? t.NextSkillId || t.FirstSkillId : i;
	}
	GetMultiSkillInfo(i) {
		return this.MultiSkillInfoMap.get(i);
	}
	RJo(i) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				18,
				"多段技能Id变化",
				["当前技能Id", i.CurSkillId],
				["下一段技能Id", i.NextSkillId],
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMultiSkillIdChanged,
				this.EntityId,
				i,
				this.VisionEntityId,
			);
	}
	UJo(i) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				18,
				"多段技能可用",
				["当前技能Id", i.CurSkillId],
				["下一段技能Id", i.NextSkillId],
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnMultiSkillEnable,
				this.EntityId,
				i,
				this.VisionEntityId,
			);
	}
}
exports.MultiSkillData = MultiSkillData;
