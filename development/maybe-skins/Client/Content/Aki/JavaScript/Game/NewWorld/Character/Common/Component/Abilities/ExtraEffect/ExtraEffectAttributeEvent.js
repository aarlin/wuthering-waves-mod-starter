"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttributeEventEffects = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	BulletController_1 = require("../../../../../Bullet/BulletController"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck"),
	ExtraEffectBase_1 = require("./ExtraEffectBase"),
	ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AttributeEventEffects extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.TargetType = 0),
			(this.GoalType = 0),
			(this.Ids = void 0),
			(this.Times = void 0),
			(this.$Ko = void 0),
			(this.YKo = void 0),
			(this.JKo = !1),
			(this.xat = !1),
			(this.zKo = new Array()),
			(this.ZKo = 0),
			(this.mEo = (t, e, i) => {
				var s = this.xat;
				(this.xat = this.$Ko.CheckListenActiveness(e, this.YKo)),
					s !== this.xat &&
						(this.xat
							? this.TryExecute({}, this.OwnerBuffComponent)
							: this.tQo());
			});
	}
	InitParameters(t) {
		var e = t.ExtraEffectParameters,
			i = t.ExtraEffectGrowParameters1,
			s = ((t = t.ExtraEffectGrowParameters2), this.Level),
			r = Number(e[0]),
			o = 1 === Number(e[1]);
		(i = AbilityUtils_1.AbilityUtils.GetLevelValue(i, s, -1)),
			(t = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, -1));
		(this.$Ko = new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(
			r,
			i,
			t,
			o,
		)),
			(this.GoalType = Number(e[2])),
			(this.Ids = e[3].split("#").map((t) => BigInt(t))),
			(this.JKo = 1 === Number(e[4] ?? 0)),
			1 === Number(e[5] ?? 0) ? (this.ZKo = 2) : (this.ZKo = 0),
			1 === Number(e[6] ?? 0) ? (this.TargetType = 2) : (this.TargetType = 0);
	}
	OnCreated() {
		var t = this.eQo();
		t
			? ((this.YKo = t.GetComponent(156)),
				this.$Ko.IsPerTenThousand && void 0 === this.$Ko.MaxAttributeId
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							20,
							"Buff额外效果6 监听属性变化到特定区间，基于相对最大值的万分比，但是监听的属性没有对应的最大值属性，该效果无效",
							["buff Id", this.BuffId],
							["属性Id", this.$Ko.ListenAttributeId],
						)
					: ((t = this.YKo.GetCurrentValue(this.$Ko.ListenAttributeId)),
						this.mEo(this.$Ko.ListenAttributeId, t, t),
						this.YKo.AddListener(
							this.$Ko.ListenAttributeId,
							this.mEo,
							"ExtraEffectAttributeEvent",
						)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					20,
					"Invalid listen target when add extra effect attribute event",
					["handle", this.ActiveHandleId],
					["instigator id", this.InstigatorEntityId],
					[
						"instigator name",
						this.InstigatorBuffComponent?.ActorComponent?.Actor?.GetName(),
					],
					["owner id", this.OwnerEntity?.Id],
					[
						"owner name",
						this.OwnerBuffComponent?.GetActorComponent()?.Actor?.GetName(),
					],
					["listen type", this.ZKo],
				);
	}
	OnRemoved() {
		this.YKo?.RemoveListener(this.$Ko.ListenAttributeId, this.mEo);
	}
	CheckExecutable() {
		return !!this.OwnerBuffComponent?.HasBuffAuthority();
	}
	OnExecute() {
		if (this.xat)
			switch (this.GoalType) {
				case 1:
					this.ExecuteAddBullet();
					break;
				case 0:
					this.ExecuteAddBuffs();
			}
	}
	eQo() {
		return 2 !== this.ZKo ? this.OwnerEntity : this.InstigatorEntity?.Entity;
	}
	GetEffectTarget() {
		return 2 !== this.TargetType
			? this.OwnerBuffComponent
			: this.InstigatorBuffComponent;
	}
	tQo() {
		if (0 === this.GoalType) {
			if (this.JKo)
				for (const t of this.zKo)
					this.GetEffectTarget()?.RemoveBuffByHandle(
						t,
						-1,
						`因为其它buff属性监听额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
					);
			this.zKo.length = 0;
		}
	}
	ExecuteAddBuffs() {
		var t = this.GetEffectTarget();
		if (this.CheckExecutable() && t)
			for (let s = 0; s < this.Ids.length; s++) {
				var e = this.Ids[s],
					i = AbilityUtils_1.AbilityUtils.GetArrayValue(
						this.Times,
						s,
						ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BUFF_ADD_TIMES,
					);
				e = t.AddBuffLocal(e, {
					InstigatorId: this.InstigatorBuffComponent.CreatureDataId,
					Level: this.Level,
					OuterStackCount: i,
					PreMessageId: this.Buff.MessageId,
					ServerId: this.ServerId,
					Reason: `因为其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
				});
				this.JKo && 0 < e && this.zKo.push(e);
			}
	}
	ExecuteAddBullet() {
		var t = this.GetEffectTarget().GetActorComponent(),
			e = t?.ActorTransform,
			i = this.InstigatorEntity,
			s = t?.Actor;
		if (e && i && s)
			for (let t = 0; t < this.Ids.length; t++) {
				var r = String(this.Ids[t]),
					o = AbilityUtils_1.AbilityUtils.GetArrayValue(
						this.Times,
						t,
						ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES,
					),
					a = this.Buff.MessageId;
				for (let t = 0; t < o; t++)
					BulletController_1.BulletController.CreateBulletCustomTarget(
						s,
						r,
						e,
						{ SyncType: 1 },
						a,
					);
			}
	}
}
exports.AttributeEventEffects = AttributeEventEffects;
