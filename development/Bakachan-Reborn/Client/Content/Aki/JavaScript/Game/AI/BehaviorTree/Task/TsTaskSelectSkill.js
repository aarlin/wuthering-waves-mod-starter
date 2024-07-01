"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	AiLibrary_1 = require("../../Common/AiLibrary"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSelectSkill extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.SkillType = -1),
			(this.DebugLog = !1),
			(this.IsInitTsVariables = !1),
			(this.TsSkillType = 0),
			(this.TsDebugLog = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsSkillType = this.SkillType),
			(this.TsDebugLog = this.DebugLog));
	}
	ReceiveTickAI(t, e, i) {
		var o,
			l,
			r = t.AiController;
		r
			? (this.InitTsVariables(),
				r.AiSkill
					? (o = r.CharAiDesignComp.Entity.GetComponent(33)).Valid
						? (l = r.AiHateList.GetCurrentTarget())?.Valid
							? this.SelectSkillWithTarget(r, o, l.Entity.GetComponent(3))
								? this.FinishExecute(!0)
								: this.FinishExecute(!1)
							: this.SelectSkillWithoutTarget(r, o)
								? this.FinishExecute(!0)
								: this.FinishExecute(!1)
						: this.FinishExecute(!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("BehaviorTree", 6, "没有配置技能", [
								"AiBaseId",
								r.AiBase.Id,
							]),
						this.FinishExecute(!1)))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
						"Type",
						t.GetClass().GetName(),
					]),
				this.FinishExecute(!1));
	}
	SelectSkillWithTarget(t, e, i) {
		var o = t.CharActorComp,
			l = o.Entity.GetComponent(185),
			r = Vector_1.Vector.Create(),
			a =
				(MathUtils_1.MathUtils.InverseTransformPositionNoScale(
					i.FloorLocation,
					i.ActorRotationProxy,
					o.FloorLocation,
					r,
				),
				Vector_1.Vector.GetAngleByVector2D(r)),
			s =
				(MathUtils_1.MathUtils.InverseTransformPositionNoScale(
					o.FloorLocation,
					o.ActorRotationProxy,
					i.FloorLocation,
					r,
				),
				r.Z),
			n = r.Size2D() - o.ScaledRadius - i.ScaledRadius,
			c = Vector_1.Vector.GetAngleByVector2D(r);
		let k = 0,
			h = 0,
			S = 0;
		this.TsDebugLog &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"AI",
				6,
				"SelectSkillWithTarget",
				["Owner", t.CharActorComp.Actor.GetName()],
				["BT", this.TreeAsset.GetName()],
			);
		for (const i of t.AiSkill.ActiveSkillGroup)
			for (const o of t.AiSkill.BaseSkill.RandomSkills[i].ArrayInt) {
				var g,
					d = t.AiSkill.SkillInfos.get(o);
				d
					? d.SkillWeight <= 0 ||
						(AiLibrary_1.AiLibrary.IsSkillAvailable(
							t,
							o,
							e,
							l,
							this.TsSkillType,
							a,
							s,
							n,
							c,
							!0,
							this.TsDebugLog,
						) &&
							((k += g = d.SkillWeight),
							MathUtils_1.MathUtils.GetRandomRange(0, k) < g) &&
							((h = o), (S = Number(d.SkillId))))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", o]);
			}
		return (
			this.TsDebugLog &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("AI", 6, "SelectSkillWithTarget Success", [
					"SkillId",
					S,
				]),
			!!S &&
				(BlackboardController_1.BlackboardController.SetStringValueByEntity(
					o.Entity.Id,
					"SkillId",
					S.toString(),
				),
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					o.Entity.Id,
					"SkillInfoId",
					h,
				),
				!0)
		);
	}
	SelectSkillWithoutTarget(t, e) {
		var i = t.CharActorComp;
		const o = i.Entity.GetComponent(185);
		let l = 0,
			r = 0,
			a = 0;
		return (
			t.AiSkill.ActiveSkillGroup.forEach((i, s, n) => {
				t.AiSkill.BaseSkill.RandomSkills[i].ArrayInt.forEach((i, s, n) => {
					var c,
						k,
						h = t.AiSkill.SkillInfos.get(i);
					h
						? (k = t.AiSkill.SkillPreconditionMap.get(h.SkillPreconditionId))
							? k.NeedTarget ||
								(0 <= this.TsSkillType && h.SkillType !== this.TsSkillType) ||
								(e.IsCanUseSkill(Number(h.SkillId)) &&
									t.AiSkill.CanActivate(i) &&
									((c = t.AiSkill.PreconditionTagMap.get(
										h.SkillPreconditionId,
									)?.TagId),
									!k.NeedTag || !c || (o.Valid && o.HasTag(c))) &&
									((k = h.SkillWeight),
									(l += k),
									MathUtils_1.MathUtils.GetRandomRange(0, l) < k) &&
									((r = i), (a = Number(h.SkillId))))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
									"Id",
									h.SkillPreconditionId,
								])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", i]);
				});
			}),
			!!a &&
				(BlackboardController_1.BlackboardController.SetStringValueByEntity(
					i.Entity.Id,
					"SkillId",
					a.toString(),
				),
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					i.Entity.Id,
					"SkillInfoId",
					r,
				),
				!0)
		);
	}
}
exports.default = TsTaskSelectSkill;
