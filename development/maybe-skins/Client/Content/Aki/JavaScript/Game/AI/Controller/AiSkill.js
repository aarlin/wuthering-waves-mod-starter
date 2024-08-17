"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiSkill = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager");
class AiSkill {
	constructor(e) {
		(this.BaseSkill = void 0),
			(this.SkillInfos = new Map()),
			(this.SkillPreconditionMap = new Map()),
			(this.PreconditionTagMap = new Map()),
			(this.Tre = new Map()),
			(this.ActiveSkillGroup = new Set()),
			(this.Bte = e);
	}
	ActivateSkillGroup(e, i) {
		0 <= e &&
			e < this.BaseSkill.RandomSkills.length &&
			(i ? this.ActiveSkillGroup.add(e) : this.ActiveSkillGroup.delete(e));
	}
	AddSkillCd(e, i) {
		this.Bte.AddCoolDownTime(e, i);
	}
	CanActivate(e) {
		return this.Bte.GetCoolDownReady(e);
	}
	SetSkillCdFromNow(e) {
		var i;
		e &&
			(i = this.SkillInfos.get(e)) &&
			this.Bte.AddCoolDownTime(
				e,
				MathUtils_1.MathUtils.GetRandomRange(
					i.SkillCdRange.Min,
					i.SkillCdRange.Max,
				),
			);
	}
	GetSkillWeight(e) {
		var i = this.Tre.get(e);
		return void 0 !== i ? i : (i = this.SkillInfos.get(e)) ? i.SkillWeight : 0;
	}
	ChangeSkillWeight(e, i) {
		0 < i ? this.Tre.set(e, i) : this.Tre.delete(e);
	}
	InitTagMap() {
		for (var [e, i] of (this.PreconditionTagMap.clear(),
		this.SkillPreconditionMap))
			i.NeedTag &&
				(i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
					i.NeedTag,
				)) &&
				this.PreconditionTagMap.set(e, i);
	}
	GetCdDebugString() {
		let e = "";
		var i,
			t,
			l = ModelManager_1.ModelManager.GameModeModel.IsMulti
				? TimeUtil_1.TimeUtil.GetServerTimeStamp()
				: Time_1.Time.WorldTime;
		for ([i, [t]] of this.Bte.AiCoolDownList)
			e += "\n\t\t\t" + i + " : " + Math.max(0, t - l);
		return e;
	}
}
exports.AiSkill = AiSkill;
