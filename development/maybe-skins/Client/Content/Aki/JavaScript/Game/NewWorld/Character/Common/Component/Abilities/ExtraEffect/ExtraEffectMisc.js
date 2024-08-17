"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModifyToughReduce =
		exports.AddBuffToVision =
		exports.FrozenEffect =
		exports.AddPassiveSkill =
		exports.TimeScaleEffect =
		exports.LockLowerBound =
		exports.LockUpperBound =
		exports.LockValue =
		exports.ShieldEffect =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil"),
	PanelQteController_1 = require("../../../../../../Module/PanelQte/PanelQteController"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	AbilityUtils_1 = require("../AbilityUtils"),
	ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class ShieldEffect extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.ShieldTemplateId = 0);
	}
	InitParameters(e) {
		this.ShieldTemplateId = Number(e.ExtraEffectParameters[0]);
	}
	OnExecute() {}
}
exports.ShieldEffect = ShieldEffect;
class LockValue extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.Offset = 0),
			(this.Percent = -0);
	}
	InitParameters(e) {
		(this.AttributeId = Number(e.ExtraEffectParameters[0])),
			(this.Offset = Number(e.ExtraEffectParameters[1])),
			(this.Percent = 0),
			2 < e.ExtraEffectParameters.length &&
				(this.Percent = Number(e.ExtraEffectParameters[2]));
	}
	OnCreated() {
		this.OwnerEntity?.CheckGetComponent(155)?.AddStateAttributeLock(
			this.ActiveHandleId,
			this.AttributeId,
			this.Percent,
			this.Offset,
		);
	}
	OnExecute() {}
	OnRemoved() {
		this.OwnerEntity?.CheckGetComponent(155)?.RemoveStateAttributeLock(
			this.ActiveHandleId,
			this.AttributeId,
		);
	}
}
exports.LockValue = LockValue;
class LockUpperBound extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.Offset = 0),
			(this.Percent = -0);
	}
	InitParameters(e) {
		(this.AttributeId = Number(e.ExtraEffectParameters[0])),
			(this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
				e.ExtraEffectGrowParameters1,
				this.Level,
				0,
			)),
			(this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
				e.ExtraEffectGrowParameters2,
				this.Level,
				0,
			)),
			2 < e.ExtraEffectParameters.length &&
				(this.Percent = Number(e.ExtraEffectParameters[2]));
	}
	OnCreated() {
		this.OwnerEntity?.CheckGetComponent(155)?.AddIntervalLock(
			0,
			this.ActiveHandleId,
			this.AttributeId,
			this.Percent,
			this.Offset,
		);
	}
	OnExecute() {}
	OnRemoved() {
		this.OwnerEntity?.CheckGetComponent(155)?.RemoveIntervalLock(
			0,
			this.ActiveHandleId,
			this.AttributeId,
		);
	}
}
exports.LockUpperBound = LockUpperBound;
class LockLowerBound extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId =
				CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
			(this.Offset = 0),
			(this.Percent = -0);
	}
	InitParameters(e) {
		(this.AttributeId = Number(e.ExtraEffectParameters[0])),
			(this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
				e.ExtraEffectGrowParameters1,
				this.Level,
				0,
			)),
			(this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
				e.ExtraEffectGrowParameters2,
				this.Level,
				0,
			)),
			2 < e.ExtraEffectParameters.length &&
				(this.Percent = Number(e.ExtraEffectParameters[2]));
	}
	OnCreated() {
		this.OwnerEntity?.CheckGetComponent(155)?.AddIntervalLock(
			1,
			this.ActiveHandleId,
			this.AttributeId,
			this.Percent,
			this.Offset,
		);
	}
	OnExecute() {}
	OnRemoved() {
		this.OwnerEntity?.CheckGetComponent(155)?.RemoveIntervalLock(
			1,
			this.ActiveHandleId,
			this.AttributeId,
		);
	}
}
exports.LockLowerBound = LockLowerBound;
class TimeScaleEffect extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.Priority = 0),
			(this.Dilation = 0),
			(this.CurveId = -1),
			(this.CurveDt = void 0),
			(this.Active = !0);
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters),
			(this.Priority = Number(e[0])),
			(this.Dilation = Number(e[1])),
			(this.CurveId = Number(e[3] ?? -1)),
			(this.CurveId = this.CurveId % 1 == 0 ? this.CurveId : -1);
	}
	OnCreated() {
		this.LQo();
	}
	OnExecute() {}
	OnRemoved() {
		(this.Active = !1), this.DQo(), (this.CurveDt = void 0);
	}
	StartTimeScaleEffect() {
		this.LQo();
	}
	StopTimeScaleEffect() {
		this.DQo();
	}
	LQo() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Bullet",
				36,
				"AddTimeScaleByBuff",
				["this.CurveDt", void 0 === this.CurveDt],
				["this.CurveId", this.CurveId],
			),
			-1 === this.CurveId || this.CurveDt
				? this.RQo()
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Bullet", 36, "AddTimeScaleLoad", [
							"this.CurveId",
							this.CurveId,
						]),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						"/Game/Aki/Data/Fight/DT_BuffTimeScaleCurve.DT_BuffTimeScaleCurve",
						UE.DataTable,
						(e) => {
							this.Active
								? ((this.CurveDt = e), this.RQo())
								: Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Bullet", 36, "TimeScaleHasRemoved");
						},
					));
	}
	RQo() {
		var e = this.CurveDt
			? DataTableUtil_1.DataTableUtil.GetDataTableRow(
					this.CurveDt,
					this.CurveId.toString(),
				)
			: void 0;
		this.OwnerEntity?.CheckGetComponent(16)?.AddTimeScaleByBuff(
			this.ActiveHandleId,
			this.Priority,
			this.Dilation,
			e?.时间膨胀时长,
			e?.时间膨胀变化曲线,
		),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Bullet",
					36,
					"AddTimeScaleByBuff",
					["curve?.时间膨胀时长", e?.时间膨胀时长],
					["curve?.时间膨胀变化曲线", e?.时间膨胀变化曲线],
				);
	}
	DQo() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Bullet", 36, "RemoveTimeScaleByBuff", [
				"this.ActiveHandleId",
				this.ActiveHandleId,
			]),
			this.OwnerEntity?.CheckGetComponent(16)?.RemoveTimeScaleByBuff(
				this.ActiveHandleId,
			);
	}
}
exports.TimeScaleEffect = TimeScaleEffect;
class AddPassiveSkill extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.SkillIds = void 0);
	}
	InitParameters(e) {
		this.SkillIds =
			e.ExtraEffectParameters[0].split("#").map((e) => BigInt(e)) ?? [];
	}
	OnCreated() {
		var e = this.OwnerBuffComponent.GetPassiveSkillComponent();
		if (e?.Valid)
			for (const t of this.SkillIds)
				this.Buff
					? e.LearnPassiveSkill(t, { NeedBroadcast: !0, Buff: this.Buff })
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Bullet", 36, "没有Buff不能加被动技能");
	}
	OnExecute() {}
	OnRemoved() {
		var e = this.OwnerBuffComponent.GetPassiveSkillComponent();
		if (e?.Valid) for (const t of this.SkillIds) e.ForgetPassiveSkill(t, !0);
	}
}
exports.AddPassiveSkill = AddPassiveSkill;
class FrozenEffect extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.LockName = ""),
			(this.PanelQteId = 0),
			(this.PanelQteHandleId = 0);
	}
	InitParameters(e) {
		(this.LockName = "" + this.ActiveHandleId),
			0 < e.ExtraEffectParameters.length &&
				(this.PanelQteId = Number(e.ExtraEffectParameters[0]));
	}
	OnCreated() {
		this.OwnerBuffComponent?.GetEntity()
			?.CheckGetComponent(16)
			?.LockFrozen(this.LockName),
			this.PanelQteId &&
				(this.PanelQteHandleId =
					PanelQteController_1.PanelQteController.StartBuffQte(
						this.PanelQteId,
						this.BuffId,
						this.ActiveHandleId,
						this.OwnerBuffComponent?.GetEntity(),
						this.Buff.MessageId,
					));
	}
	OnExecute() {}
	OnRemoved() {
		this.OwnerBuffComponent?.GetEntity()
			?.CheckGetComponent(16)
			?.UnlockFrozen(this.LockName),
			this.PanelQteId &&
				0 < this.PanelQteHandleId &&
				PanelQteController_1.PanelQteController.StopQte(this.PanelQteHandleId);
	}
}
exports.FrozenEffect = FrozenEffect;
class AddBuffToVision extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.SummonType = 0),
			(this.SummonIndex = 0),
			(this.BuffIds = []);
	}
	InitParameters(e) {
		e.ExtraEffectParameters &&
			((this.SummonType = Number(e.ExtraEffectParameters[0] ?? 0)),
			(this.SummonIndex = Number(e.ExtraEffectParameters[1] ?? 0)),
			(this.BuffIds =
				e.ExtraEffectParameters[2]?.split("#")?.map((e) => BigInt(e ?? 0n)) ??
				[]));
	}
	OnCreated() {
		var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
				this.OwnerEntity,
				this.SummonType,
				this.SummonIndex,
			)?.Entity,
			t = this.Buff?.MessageId,
			r =
				(t ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Bullet", 36, "没有父Buff的上下文信息")),
				e?.GetComponent(157));
		if (r)
			for (const e of this.BuffIds)
				r.AddBuff(e, {
					InstigatorId:
						this.InstigatorBuffComponent?.CreatureDataId ??
						ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
					PreMessageId: t,
					Reason: `buff${this.BuffId}向召唤物共享buff`,
				});
	}
	OnExecute() {}
	OnRemoved() {
		var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
			this.OwnerEntity,
			this.SummonType,
		)?.Entity?.GetComponent(157);
		if (e)
			for (const t of this.BuffIds)
				e.RemoveBuff(t, -1, `召唤者的buff${this.BuffId}移除`);
	}
}
exports.AddBuffToVision = AddBuffToVision;
class ModifyToughReduce extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments), (this.ModifyRate = 0), (this.ModifierHandle = 0);
	}
	InitParameters(e) {
		e.ExtraEffectParameters &&
			(this.ModifyRate = Number(e.ExtraEffectParameters[0] ?? 0));
	}
	OnCreated() {
		var e = this.OwnerEntity?.CheckGetComponent(155);
		e &&
			(this.ModifierHandle = e.AddModifier(
				CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
				{ Type: 9, Value1: this.ModifyRate },
			));
	}
	OnExecute() {}
	OnRemoved() {
		var e = this.OwnerEntity?.CheckGetComponent(155);
		e &&
			e.RemoveModifier(
				CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
				this.ModifierHandle,
			);
	}
}
exports.ModifyToughReduce = ModifyToughReduce;
