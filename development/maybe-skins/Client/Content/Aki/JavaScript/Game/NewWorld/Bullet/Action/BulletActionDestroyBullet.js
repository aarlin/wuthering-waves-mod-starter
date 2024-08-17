"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionDestroyBullet = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	BulletController_1 = require("../BulletController"),
	BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
	BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDestroyBullet extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var t = this.ActionInfo;
		if (
			(t.SummonChild &&
				(this.BulletInfo.ChildInfo
					? this.BulletInfo.ChildInfo.SetIsActiveSummonChildBullet(!0)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							18,
							"销毁时生成子子弹，但是缺少子子弹的配置",
							["BulletId", this.BulletInfo.BulletRowName],
							["EntityId", this.BulletInfo.BulletEntityId],
						)),
			1 === t.DestroyReason && this.x4o(),
			this.BulletInfo.AttackerHandle?.Valid &&
				this.BulletInfo.AttackerActorComp?.Actor &&
				(this.B4o(), this.b4o()),
			this.G4o(),
			this.N4o(),
			this.BulletInfo.NeedNotifyChildrenWhenDestroy &&
				this.BulletInfo.ChildEntityIds)
		)
			for (const t of this.BulletInfo.ChildEntityIds)
				BulletController_1.BulletController.DestroyBullet(t, !1, 1);
		for (const t of this.BulletInfo.CollisionInfo.LastArrayHitActorData)
			t.IsValidHit &&
				BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(
					this.BulletInfo,
					t,
				);
	}
	x4o() {
		BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(
			this.BulletInfo,
		) &&
			(BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
				this.BulletInfo,
				8,
				"[BulletActionDestroyBullet.OnParentDestroy]",
			),
			this.BulletInfo.ChildInfo?.SetIsNumberNotEnough(!0));
	}
	b4o() {
		var t, l;
		this.BulletInfo.AttackerActorComp?.Actor?.IsValid() &&
			((t =
				this.BulletInfo.BulletDataMain.Execution
					.SendGameplayEventTagToAttackerOnEnd),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.BulletInfo.Attacker,
				EventDefine_1.EEventName.BulletDestroy,
				this.BulletInfo,
			),
			t) &&
			t.TagName !== StringUtils_1.NONE_STRING &&
			(((l = new UE.GameplayEventData()).OptionalObject =
				this.BulletInfo.Actor),
			UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
				this.BulletInfo.AttackerActorComp.Actor,
				t,
				l,
			));
	}
	N4o() {
		var t = this.BulletInfo.BulletDataMain;
		0 === this.BulletInfo.SummonServerEntityId ||
			t.Summon.EntityId <= 0 ||
			!t.Summon.DestroyEntityOnBulletEnd ||
			ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(
				this.BulletInfo.BulletInitParams.SkillId,
				this.BulletInfo.SummonAttackerId,
				this.BulletInfo.SummonServerEntityId,
			);
	}
	B4o() {
		var t = this.BulletInfo.ChildInfo,
			l = this.BulletInfo.BulletDataMain.Children,
			e = l.length;
		for (let n = 0; n < e; ++n) {
			var o,
				i = l[n];
			((4 === i.Condition && this.BulletInfo.IsTimeNotEnough) ||
				(3 === i.Condition && t.IsNumberNotEnough) ||
				(0 === i.Condition && t.IsActiveSummonChildBullet)) &&
				((o = Number(i.RowName)),
				isNaN(o) ||
					!o ||
					i.Num < 1 ||
					((o = BulletController_1.BulletController.CreateBulletCustomTarget(
						this.BulletInfo.AttackerActorComp.Actor,
						i.RowName.toString(),
						this.BulletInfo.ActorComponent.ActorTransform,
						{
							SkillId: this.BulletInfo.BulletInitParams.SkillId,
							ParentTargetId: this.BulletInfo.Target?.Id,
							ParentId: this.BulletInfo.Entity.Id,
							DtType: this.BulletInfo.BulletInitParams.DtType,
						},
						this.BulletInfo.ContextId,
					)) &&
						BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
							this.BulletInfo,
							o,
						)));
		}
	}
	G4o() {
		this.BulletInfo.IsDestroyByCharSkillEnd &&
			BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
				this.BulletInfo,
				1,
				"[BulletActionDestroyBullet.BulletEffectOnDestroy] 1",
			),
			this.BulletInfo.IsTimeNotEnough &&
				BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
					this.BulletInfo,
					0,
					"[BulletActionDestroyBullet.BulletEffectOnDestroy] 2",
				),
			this.BulletInfo.ActionLogicComponent.ActionDestroy(),
			BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(
				this.BulletInfo.EffectInfo,
			);
	}
}
((exports.BulletActionDestroyBullet = BulletActionDestroyBullet).w4o = void 0),
	(BulletActionDestroyBullet.q4o = void 0),
	(BulletActionDestroyBullet.k4o = void 0),
	(BulletActionDestroyBullet.F4o = void 0),
	(BulletActionDestroyBullet.O4o = void 0);
