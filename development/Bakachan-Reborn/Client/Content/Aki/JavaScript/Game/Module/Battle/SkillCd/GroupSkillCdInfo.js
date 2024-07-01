"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GroupSkillCdInfo = exports.SkillCdInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Queue_1 = require("../../../../Core/Container/Queue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	DEFAULT_PROPORTTION_VALUE = 1e4;
class SkillCdInfo {
	constructor() {
		(this.SkillId = 0),
			(this.SkillCd = -0),
			(this.CdDelay = -0),
			(this.IsShareAllCdSkill = !1);
	}
}
exports.SkillCdInfo = SkillCdInfo;
class GroupSkillCdInfo {
	constructor() {
		(this.GroupId = 0),
			(this.MaxCount = 0),
			(this.LimitCount = 0),
			(this.RemainingCount = 0),
			(this.SkillCdInfoMap = new Map()),
			(this.EntityIds = new Set()),
			(this.SkillIdQueue = new Queue_1.Queue()),
			(this.CdQueue = new Queue_1.Queue()),
			(this.CurMaxCd = 0),
			(this.CurRemainingCd = 0),
			(this.CurSkillId = 0),
			(this.CurRemainingDelayCd = -0),
			(this.CurDelaySkillId = 0),
			(this.CurDelaySkillCd = 0);
	}
	IsInCd() {
		return 0 < this.CurRemainingCd;
	}
	HasRemainingCount() {
		return 0 < this.RemainingCount;
	}
	IsInDelay() {
		return 0 < this.CurRemainingDelayCd;
	}
	StartCd(i, e, t = -1) {
		var n = this.SkillCdInfoMap.get(i);
		if (!n) return !1;
		if (this.RemainingCount <= 0) return !1;
		let C = t;
		return (
			-1 === C &&
				((t =
					e.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_CdReduse) / 1e4),
				(C = n.SkillCd * t)),
			this.IsInDelay()
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							18,
							"技能CD延迟期间，不能再用一次技能，必须先打断前一次技能",
							["skillId", i],
						),
					!1)
				: (0 < (e = n.CdDelay)
						? ((this.CurRemainingDelayCd = e),
							(this.CurDelaySkillId = i),
							(this.CurDelaySkillCd = C),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Battle", 18, "技能CD开始延迟CD", [
									"skillId",
									i,
								]))
						: C <= 0 ||
							(this.IsInCd()
								? (this.CdQueue.Push(C), this.SkillIdQueue.Push(i))
								: ((this.CurMaxCd = C),
									(this.CurRemainingCd = C),
									(this.CurSkillId = i)),
							this.RemainingCount--,
							this.jWe()),
					!0)
		);
	}
	Tick(i) {
		i *= TimeUtil_1.TimeUtil.Millisecond;
		var e = this.RemainingCount,
			t = this.WWe(i);
		let n = e !== this.RemainingCount;
		(i = this.KWe(i)),
			(n = n || e !== this.RemainingCount),
			0 < (t = Math.min(t, i)) &&
				(this.WWe(t), (n = n || e !== this.RemainingCount)),
			n && this.jWe();
	}
	WWe(i) {
		if (!this.IsInCd()) return i;
		let e = i;
		for (; 0 < e; ) {
			if (e < this.CurRemainingCd) return (this.CurRemainingCd -= e), 0;
			if (
				((e -= this.CurRemainingCd),
				(this.CurRemainingCd = 0),
				this.RemainingCount++,
				this.RemainingCount > this.LimitCount &&
					((this.RemainingCount = this.LimitCount), Log_1.Log.CheckError()) &&
					Log_1.Log.Error("Battle", 18, "技能CD结束，可用次数已达上限"),
				this.CdQueue.Size <= 0)
			)
				return e;
			(this.CurRemainingCd = this.CdQueue.Pop()),
				(this.CurSkillId = this.SkillIdQueue.Pop());
		}
		return 0;
	}
	KWe(i) {
		if (this.IsInDelay())
			if (i < this.CurRemainingDelayCd) this.CurRemainingDelayCd -= i;
			else if (
				((i -= this.CurRemainingCd),
				(this.CurRemainingDelayCd = 0),
				this.RemainingCount <= 0)
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						18,
						"技能CD延迟计时结束时，可用次数为0，不能进入CD",
					);
			else {
				var e = this.CurDelaySkillId,
					t = this.CurDelaySkillCd;
				if (!this.IsInCd())
					return (
						(this.CurMaxCd = t),
						(this.CurRemainingCd = t),
						this.RemainingCount--,
						i
					);
				this.CdQueue.Push(t), this.SkillIdQueue.Push(e), this.RemainingCount--;
			}
		return 0;
	}
	SetLimitCount(i) {
		(i = i || this.MaxCount), (this.LimitCount = i), this.ResetAllCd();
	}
	ResetAllCd() {
		(this.CurRemainingCd = 0),
			(this.CurRemainingDelayCd = 0),
			(this.RemainingCount = this.LimitCount),
			this.jWe();
	}
	ResetDelayCd() {
		return !(this.CurRemainingDelayCd <= 0 || (this.CurRemainingDelayCd = 0));
	}
	ModifyRemainingCd(i, e) {
		this.IsInCd() &&
			((this.CurRemainingCd = this.CurRemainingCd + i + this.CurMaxCd * e),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					18,
					"技能CD修改剩余CD",
					["skillId", this.CurSkillId],
					["cd", this.CurRemainingCd],
				),
			this.CurRemainingCd <= 0
				? ((this.CurRemainingCd = 0),
					this.RemainingCount++,
					this.RemainingCount > this.LimitCount
						? ((this.RemainingCount = this.LimitCount),
							this.CdQueue.Clear(),
							this.SkillIdQueue.Clear(),
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("Battle", 18, "技能CD结束，可用次数已达上限"))
						: (0 < this.CdQueue.Size &&
								((this.CurRemainingCd = this.CdQueue.Pop()),
								(this.CurSkillId = this.SkillIdQueue.Pop())),
							this.jWe()))
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CharSkillRemainCdChanged,
						this,
					));
	}
	jWe() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				18,
				"技能CD可用次数改变",
				["skillId", this.CurSkillId],
				["count", this.RemainingCount],
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharSkillCountChanged,
				this,
			);
	}
	CheckConfigValid() {}
}
exports.GroupSkillCdInfo = GroupSkillCdInfo;
