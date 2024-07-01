"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayAbilityVisionMorph = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../../../Core/Common/Log"),
	GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	BulletController_1 = require("../../../../../Bullet/BulletController"),
	VisionSkillHandle_1 = require("../../Skill/VisionSkillHandle"),
	GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
	GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionMorph extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
	constructor() {
		super(...arguments),
			(this.yzo = void 0),
			(this.Wpt = void 0),
			(this.Vzo = void 0),
			(this.$zo = void 0),
			(this.eAr = void 0),
			(this.Yzo = void 0),
			(this.Jzo = void 0),
			(this.EVs = void 0),
			(this.yVs = void 0),
			(this.tAr = !1),
			(this.iAr = !1),
			(this.tZo = !1),
			(this.iZo = !1),
			(this.HKo = void 0),
			(this.FLn = 0);
	}
	ExitMultiSkillState() {
		this.Yzo?.ExitMultiSkillState();
	}
	OnGoDown() {
		this.Yzo?.OnGoDown();
	}
	SetKeepMultiSkillState(t, i) {
		this.Yzo?.SetKeepMultiSkillState(t, i);
	}
	SetEnableAttackInputAction(t) {
		this.Yzo?.SetEnableAttackInputAction(t);
	}
	CanSummonerStartNextMultiSkill() {
		return this.Yzo?.CanSummonerStartNextMultiSkill() ?? !1;
	}
	OnVisionChanged() {
		this.ExitMultiSkillState();
	}
	OnDestroy() {
		this.oZo(), this.Yzo?.Clear();
	}
	OnTick(t) {
		var i, o;
		this.tZo &&
			((i = this.Vzo.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight),
			(o = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(
				this.Vzo.ActorLocationProxy,
			),
			(o.Z -= i),
			this.Cwr(this.ActorComponent.ActorLocationProxy, o)
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							29,
							"变身OnTick过程穿墙，需打断幻象变身技能",
						),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.VisionMorphInterrupt,
					),
					this.SkillComponent.EndSkill(
						this.SkillComponent.CurrentSkill.SkillId,
						"GameplayAbilityVisionMorph.IsHit",
					))
				: (this.ActorComponent.SetActorLocationAndRotation(
						o.ToUeVector(),
						this.Vzo.ActorRotation,
						"GameplayAbilityVisionMorph.OnTick",
						!1,
					),
					this.iZo &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Battle",
								29,
								"GameplayAbilityVisionMorph.OnTick设置位置",
								["人的位置", this.ActorComponent.ActorLocationProxy],
								["幻象的位置", this.Vzo.ActorLocationProxy],
							),
						(this.iZo = !1))));
	}
	OnActivateAbility() {
		return !(
			this.tAr ||
			!this.AU() ||
			((this.tAr = !0),
			this.Wpt.空中能否释放 ||
				this.SkillComponent.PlaySkillMontage(!1, 0, "", 0, () => {}),
			this.rZo(),
			this.GameplayTagComponent.AddTag(
				GameplayAbilityVisionMisc_1.invincibleTag,
			),
			this.MoveComponent.CharacterMovement.SetMovementMode(0),
			this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.roleHideBuffId, {
				InstigatorId: this.BuffComponent.CreatureDataId,
				Reason: "开始幻象变身时角色添加渐变隐藏材质特效",
			}),
			(this.EVs = TimerSystem_1.TimerSystem.Delay(() => {
				this.nZo(!0);
			}, GameplayAbilityVisionMisc_1.CHARACTER_HIDDEN_DELAY)),
			this.sZo(),
			0)
		);
	}
	OnEndAbility() {
		return (
			this.tAr &&
				((this.tAr = !1),
				this.BuffComponent.RemoveBuff(
					GameplayAbilityVisionMisc_1.damageReductionBuffId,
					-1,
					"结束幻象变身",
				),
				this.hZo(!1),
				this.GameplayTagComponent.RemoveTag(
					GameplayAbilityVisionMisc_1.invincibleTag,
				),
				this.GameplayTagComponent.RemoveTag(
					GameplayAbilityVisionMisc_1.morphTag,
				)),
			!0
		);
	}
	AU() {
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
				(this.$zo = this.yzo.Entity.GetComponent(157)),
				(this.eAr = this.yzo.Entity.GetComponent(19)),
				this.Yzo || (this.Yzo = new VisionSkillHandle_1.VisionSkillHandle()),
				this.Yzo.Init(this.EntityHandle, this.yzo),
				!0)
		);
	}
	rZo() {
		this.Vzo.Actor.CapsuleComponent.IgnoreActorWhenMoving(
			this.ActorComponent.Actor,
			!0,
		),
			this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(
				this.Vzo.Actor,
				!0,
			);
	}
	sZo() {
		(this.iAr = !0),
			PhantomUtil_1.PhantomUtil.SetVisionEnable(
				this.VisionComponent.Entity,
				!0,
			);
		var t,
			i = new UE.Vector(
				0,
				0,
				this.Vzo.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight,
			);
		this.Vzo.SetActorLocationAndRotation(
			this.ActorComponent.ActorLocation.op_Addition(i),
			this.ActorComponent.ActorRotation,
			"幻象变身出现位置",
			!1,
		),
			(this.iZo = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					29,
					"GameplayAbilityVisionMorph.MorphBegin设置位置",
					["人的位置", this.ActorComponent.ActorLocationProxy],
					["幻象的位置", this.Vzo.ActorLocationProxy],
				),
			(this.tZo = !0),
			this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.morphTag),
			this.Jzo ||
				(this.Jzo = this.GameplayTagComponent.ListenForTagAddOrRemove(
					GameplayAbilityVisionMisc_1.morphTag,
					(t, i) => {
						i || this.hZo(!0);
					},
				)),
			this.$zo.AddBuff(GameplayAbilityVisionMisc_1.visionAppearBuffId, {
				InstigatorId: this.$zo.CreatureDataId,
				Reason: "开始幻象变身时幻象自身的材质和粒子",
			}),
			this.BuffComponent.AddBuff(
				GameplayAbilityVisionMisc_1.damageReductionBuffId,
				{
					InstigatorId: this.BuffComponent.CreatureDataId,
					Reason: "幻象变身减伤",
				},
			),
			(this.FLn = this.Wpt.技能ID);
		for (let t = 0; t < this.Wpt.条件技能ID.Num(); ++t) {
			var o = this.Wpt.条件技能ID.GetKey(t);
			if (this.GameplayTagComponent.HasTag(o.TagId)) {
				this.FLn = this.Wpt.条件技能ID.Get(o);
				break;
			}
		}
		0 < this.FLn &&
			this.Yzo.BeginSkill(
				this.FLn,
				this.SkillComponent.SkillTarget?.Entity,
				this.SkillComponent.SkillTargetSocket,
			),
			(0, RegisterComponent_1.isComponentInstance)(this.AudioComponent, 170) &&
				((i = this.AudioComponent?.Config?.VisionMorphEvent),
				(t = this.AudioComponent?.GetAkComponent()),
				i) &&
				t &&
				AudioSystem_1.AudioSystem.PostEvent(i, t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.VisionMorphBegin,
				this.yzo,
				this.EntityHandle,
			);
	}
	hZo(t) {
		var i;
		this.iAr &&
			((this.iAr = !1),
			this.oZo(),
			this.Fzo(),
			this.nZo(!1),
			(i = this.aZo() ? 1 : 2),
			t &&
				this.SkillComponent.PlaySkillMontage(!1, i, "", 0, () => {
					this.SkillComponent.EndSkill(
						this.SkillComponent.CurrentSkill.SkillId,
						"GameplayAbilityVisionMorph.MorphEnd",
					);
				}),
			0 < this.FLn && this.Yzo.OnMorphEnd(this.FLn),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.VisionMorphEnd,
				this.EntityHandle,
				this.yzo,
			));
	}
	nZo(t) {
		var i, o;
		t ||
			(this.BuffComponent.AddBuff(
				GameplayAbilityVisionMisc_1.roleAppearBuffId,
				{
					InstigatorId: this.BuffComponent.CreatureDataId,
					Reason: "幻象变身结束时角色自身的材质和粒子",
				},
			),
			(i = this.ActorComponent.ActorRotation),
			(o = this.Vzo.ActorRotation),
			(o = new UE.Rotator(i.Pitch, o.Yaw, i.Roll)),
			this.ActorComponent.SetActorRotation(o, "GameplayAbilityVisionMorph")),
			ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
				this.Entity,
				!t,
				!0,
				!0,
				"幻象变身技能隐藏角色",
				!0,
			);
	}
	oZo() {
		(this.tZo = !1),
			this.Jzo && (this.Jzo.EndTask(), (this.Jzo = void 0)),
			this.EVs &&
				TimerSystem_1.TimerSystem.Has(this.EVs) &&
				(TimerSystem_1.TimerSystem.Remove(this.EVs), (this.EVs = void 0));
	}
	aZo() {
		var t = (0, GameplayAbilityVisionMisc_1.getLineTrace)(),
			i = this.ActorComponent.ActorLocationProxy,
			o = this.ActorComponent.ScaledHalfHeight + 20;
		o = Vector_1.Vector.Create(i.X, i.Y, i.Z - o);
		return (i =
			(TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, i),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, o),
			TraceElementCommon_1.TraceElementCommon.LineTrace(
				t,
				"GameplayAbilityVisionMorph.FixMovementMode",
			))) && t.HitResult.bBlockingHit
			? (this.MoveComponent.CharacterMovement.SetMovementMode(1), !0)
			: (this.MoveComponent.CharacterMovement.SetMovementMode(3), !1);
	}
	Fzo() {
		this.eAr?.CreateGameplayCue(
			GameplayCueById_1.configGameplayCueById.GetConfig(
				GameplayAbilityVisionMisc_1.morphParticleCueId,
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
	Cwr(t, i) {
		var o = (0, GameplayAbilityVisionMisc_1.getLineTrace)();
		return (
			(t =
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, t),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, i),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					o,
					"GameplayAbilityVisionMorph.FixLocation",
				))) && o.HitResult.bBlockingHit
		);
	}
}
exports.GameplayAbilityVisionMorph = GameplayAbilityVisionMorph;
