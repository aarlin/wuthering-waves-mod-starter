"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayAbilityVisionSummon = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem"),
	GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	BulletController_1 = require("../../../../../Bullet/BulletController"),
	GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
	GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionSummon extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
	constructor() {
		super(...arguments),
			(this.yzo = void 0),
			(this.Wpt = void 0),
			(this.lZo = 0),
			(this.Vzo = void 0),
			(this.Hzo = void 0),
			(this._Zo = void 0),
			(this.$zo = void 0),
			(this.eAr = void 0),
			(this.oAr = void 0),
			(this.HKo = void 0),
			(this.yVs = void 0),
			(this.jzo = (t) => {
				t.BulletEntityId === this.lZo &&
					this.rAr(t.MoveInfo.LastFramePosition.ToUeVector());
			});
	}
	OnCreate() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Entity,
			EventDefine_1.EEventName.BulletDestroy,
			this.jzo,
		);
	}
	OnDestroy() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Entity,
			EventDefine_1.EEventName.BulletDestroy,
			this.jzo,
		),
			this.oZo();
	}
	OnActivateAbility() {
		if (!this.Kzo()) return !1;
		let t;
		this.uZo() ||
			this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.roleSummonBuffId, {
				InstigatorId: this.BuffComponent.CreatureDataId,
				Reason: "幻象召唤时触发子弹、镜头和特效",
			});
		var i = this.Entity.GetComponent(33);
		if (i?.Valid)
			for (const e of i.GetAllActivatedSkill())
				if (9 === e.SkillInfo?.SkillGenre) {
					t = e.CombatMessageId;
					break;
				}
		return (
			(this.lZo = BulletController_1.BulletController.CreateBulletCustomTarget(
				this.Entity,
				this.Wpt.葫芦轨迹子弹,
				this.ActorComponent.ActorTransform,
				{},
				t,
			).Id),
			!0
		);
	}
	Kzo() {
		return (
			(this.yzo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
				this.VisionComponent.Entity,
				Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantVision,
			)),
			!!this.yzo.IsInit &&
				!this.yzo.Entity.Active &&
				((this.Wpt = PhantomUtil_1.PhantomUtil.GetVisionData(
					this.VisionComponent.GetVisionId(),
				)),
				(this.Vzo = this.yzo.Entity.GetComponent(3)),
				(this.Hzo = this.yzo.Entity.GetComponent(33)),
				(this._Zo = this.yzo.Entity.GetComponent(185)),
				(this.$zo = this.yzo.Entity.GetComponent(157)),
				(this.eAr = this.yzo.Entity.GetComponent(19)),
				!0)
		);
	}
	uZo() {
		return this.Wpt.空中能否释放 && this.GameplayTagComponent.HasTag(40422668);
	}
	rAr(t) {
		var i = new UE.Vector(0, 0, this.Vzo.ScaledHalfHeight);
		this.Vzo.SetActorLocationAndRotation(
			t.op_Addition(i),
			this.ActorComponent.ActorRotation,
			"召唤幻象生成位置",
		),
			PhantomUtil_1.PhantomUtil.SetVisionEnable(
				this.VisionComponent.Entity,
				!0,
			),
			this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.summonTag),
			this.oAr ||
				(this.oAr = this.GameplayTagComponent.ListenForTagAddOrRemove(
					GameplayAbilityVisionMisc_1.summonTag,
					(t, i) => {
						i || this.nAr();
					},
				)),
			this._Zo.AddTag(-993206571),
			this.$zo.AddBuff(GameplayAbilityVisionMisc_1.visionSummonBuffId, {
				InstigatorId: this.$zo.CreatureDataId,
				Reason: "召唤系幻象的出生特效",
			}),
			this.Hzo.SetSkillAcceptInput(!0);
		let e = this.Wpt.技能ID;
		for (let t = 0; t < this.Wpt.条件技能ID.Num(); ++t) {
			var o = this.Wpt.条件技能ID.GetKey(t);
			if (this.GameplayTagComponent.HasTag(o.TagId)) {
				e = this.Wpt.条件技能ID.Get(o);
				break;
			}
		}
		0 < e &&
			this.Hzo.BeginSkill(e, {
				Target: this.SkillComponent.SkillTarget?.Entity,
				SocketName: this.SkillComponent.SkillTargetSocket,
				Context: "GameplayAbilityVisionSummon.PostSummon",
			}),
			(0, RegisterComponent_1.isComponentInstance)(this.AudioComponent, 170) &&
				((t = this.AudioComponent?.Config?.VisionSummonEvent),
				(i = this.AudioComponent?.GetAkComponent()),
				t) &&
				i &&
				AudioSystem_1.AudioSystem.PostEvent(t, i);
	}
	nAr() {
		this.oZo(), this.Fzo();
	}
	oZo() {
		this.oAr && (this.oAr.EndTask(), (this.oAr = void 0));
	}
	Fzo() {
		this.eAr?.CreateGameplayCue(
			GameplayCueById_1.configGameplayCueById.GetConfig(
				GameplayAbilityVisionMisc_1.summonParticleCueId,
			),
			{ Sync: !0 },
		),
			(this.HKo = this.eAr?.CreateGameplayCue(
				GameplayCueById_1.configGameplayCueById.GetConfig(
					GameplayAbilityVisionMisc_1.materialCueId,
				),
				{
					EndCallback: () => {
						BulletController_1.BulletController.CreateBulletCustomTarget(
							this.yzo.Entity,
							GameplayAbilityVisionMisc_1.VISION_END_BULLET,
							void 0,
						),
							PhantomUtil_1.PhantomUtil.SetVisionEnable(
								this.VisionComponent.Entity,
								!1,
							),
							this.HKo?.Destroy(),
							(this.HKo = void 0),
							this.yVs &&
								TimerSystem_1.TimerSystem.Has(this.yVs) &&
								(TimerSystem_1.TimerSystem.Remove(this.yVs),
								(this.yVs = void 0));
					},
					Sync: !0,
				},
			)),
			(this.yVs = TimerSystem_1.TimerSystem.Delay(() => {
				PhantomUtil_1.PhantomUtil.SetVisionEnable(
					this.VisionComponent.Entity,
					!1,
				);
			}, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY));
	}
}
exports.GameplayAbilityVisionSummon = GameplayAbilityVisionSummon;
