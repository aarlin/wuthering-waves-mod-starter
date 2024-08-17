"use strict";
var SceneItemHitComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, i) {
			var o,
				r = arguments.length,
				a =
					r < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(t, e, n, i);
			else
				for (var l = t.length - 1; 0 <= l; l--)
					(o = t[l]) &&
						(a = (r < 3 ? o(a) : 3 < r ? o(e, n, a) : o(e, n)) || a);
			return 3 < r && a && Object.defineProperty(e, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemHitComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
	BulletCollisionUtil_1 = require("../Bullet/BulletStaticMethod/BulletCollisionUtil"),
	BulletUtil_1 = require("../Bullet/BulletUtil"),
	SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
class ComponentHitReg {
	constructor() {
		(this.ComponentHitConditionCheck = []),
			(this.ComponentHitBaseConfig = void 0);
	}
}
let SceneItemHitComponent = (SceneItemHitComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Snn = void 0),
			(this.Hte = void 0),
			(this.Wfn = void 0),
			(this.Kfn = new Array()),
			(this.Qfn = new Map()),
			(this.Xfn = void 0),
			(this.$fn = void 0),
			(this.Yfn = void 0),
			(this.Jfn = Rotator_1.Rotator.Create()),
			(this.efn = 0);
	}
	OnStart() {
		return (
			(this.Snn = this.Entity.GetComponent(177)),
			(this.Wfn = this.Entity.GetComponent(115)),
			(this.Hte = this.Entity.GetComponent(182)),
			(this.efn = this.Entity.GetComponent(0).GetEntityOnlineInteractType()),
			!0
		);
	}
	zfn(t) {
		if (this.Snn.HasTag(-1431780499)) return !1;
		if (this.Wfn?.IsLocked) return !1;
		if (this.Entity.GetComponent(0)?.IsConcealed) return !1;
		let e = !0;
		if (0 < this.Kfn.length) for (const n of this.Kfn) if (!(e &&= n(t))) break;
		return e;
	}
	Zfn(t, e) {
		if (((t = this.Qfn.get(t)?.ComponentHitConditionCheck), void 0 === t))
			return !0;
		let n = !0;
		if (0 < t.length) for (const i of t) if (!(n &&= i(e))) break;
		return n;
	}
	epn(t, e) {
		return (
			(t = this.Qfn.get(t)?.ComponentHitBaseConfig?.HitBullet),
			!t ||
				SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(
					t,
					e,
					this.Entity,
				)
		);
	}
	OnSceneItemHit(t, e) {
		if (
			(EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSceneItemEntityHitAlways,
				t,
			),
			!LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
				this.efn,
				!1,
			))
		)
			return !1;
		var n = EntitySystem_1.EntitySystem.Get(t.BulletEntityId)?.GetBulletInfo();
		if (n) {
			if (this.Entity.GetComponent(146)?.ReboundBullet(t, n)) return !1;
			if (0 !== t.CalculateType) return !1;
			if (this.zfn(t)) {
				for (var [i] of (this.c6r(t),
				this.tpn(t, e),
				this.ipn(t),
				this.Lwr(t),
				this.Qfn))
					this.epn(i, t) && this.Zfn(i, t) && this.opn(i, t);
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneItemEntityHit,
				),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAnySceneItemEntityHit,
						this.Entity,
					);
			}
		}
		return !0;
	}
	GetPenetrationType() {
		return this.Entity.GetComponent(0).GetBaseInfo().Category
			.BulletPenetrationType;
	}
	c6r(t) {
		var e,
			n = t.ReBulletData.Render.EffectOnHit.get(4);
		n &&
			0 !== n.length &&
			((e = new UE.Transform(
				t.HitEffectRotation.ToUeRotator(),
				t.HitPosition.ToUeVector(),
				Vector_1.Vector.OneVector,
			)),
			BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(
				t.Attacker,
				n,
				e,
				t.ReBulletData.Render.AudioOnHit,
			));
	}
	tpn(t, e) {
		var n = this.Entity.GetComponent(177);
		if (n) {
			var i =
				SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(
					this.Hte.GetSceneInteractionLevelHandleId(),
				);
			let o;
			i && 0 < i
				? 1 === e.ValidProcessIndex &&
					(o =
						SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(
							this.Hte.GetSceneInteractionLevelHandleId(),
							e.Actor,
						)?.TagId)
				: ((e = (i = EntitySystem_1.EntitySystem.Get(
						t.BulletEntityId,
					).GetBulletInfo()).BulletDataMain.Base.BeHitEffect),
					(t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
						i.Attacker,
						e,
					)),
					BulletUtil_1.BulletUtil.GetHitRotator(i, this.Hte, this.Jfn),
					(e = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(
						this.Hte,
						t?.被击动作,
						this.Jfn.Yaw,
					)),
					(o = this.rpn(e))),
				void 0 !== this.Yfn && (n.RemoveTag(this.Yfn), (this.Yfn = void 0)),
				void 0 !== o && (n.AddTag(o), (this.Yfn = o));
		}
	}
	ipn(t) {
		var e = t.ReBulletData.Base.BeHitEffect;
		(e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
			t.Attacker,
			e,
		)) && this.Hte.UpdateHitInfo(t.HitPosition, e.地面受击速度);
	}
	opn(t, e) {
		t?.Valid &&
			(EventSystem_1.EventSystem.EmitWithTarget(
				t,
				EventDefine_1.EEventName.OnSceneItemHit,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				t,
				EventDefine_1.EEventName.OnSceneItemHitByHitData,
				e,
			));
	}
	Lwr(t) {
		this.npn(t), this.spn(t);
	}
	npn(t) {
		var e,
			n = t.ReBulletData.TimeScale,
			i = n.TimeScaleOnAttack,
			o = this.Xfn?.ValueRatio ?? 1,
			r = this.Xfn?.TimeRatio ?? 1,
			a = this.Xfn?.MaxExtraTime ?? 0;
		n.TimeScaleOnAttackIgnoreAttacker
			? 0 < i.时间膨胀时长 &&
				((e = EntitySystem_1.EntitySystem.Get(
					t.BulletEntityId,
				).GetBulletInfo()),
				BulletUtil_1.BulletUtil.SetTimeScale(
					e,
					i.优先级,
					i.时间膨胀值 * o,
					i.时间膨胀变化曲线,
					Math.min(i.时间膨胀时长 * r, i.时间膨胀时长 + a),
					1,
				))
			: 0 < i.时间膨胀时长 &&
				(t.Attacker.GetComponent(107)?.SetTimeScale(
					i.优先级 - 1,
					i.时间膨胀值 * o,
					i.时间膨胀变化曲线,
					Math.min(i.时间膨胀时长 * r, i.时间膨胀时长 + a),
					1,
				),
				(e = n.CharacterCustomKeyTimeScale),
				StringUtils_1.StringUtils.IsEmpty(e) ||
					((n = ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
						t.Attacker.Id,
						e,
						t.BulletId.toString(),
					)) &&
						EntitySystem_1.EntitySystem.Get(n)
							?.GetComponent(107)
							?.SetTimeScale(
								i.优先级,
								i.时间膨胀值 * o,
								i.时间膨胀变化曲线,
								Math.min(i.时间膨胀时长 * r, i.时间膨胀时长 + a),
								1,
							)));
	}
	spn(t) {
		var e, n, i;
		t.ReBulletData.Base.ContinuesCollision ||
			((t = t.ReBulletData.TimeScale.TimeScaleOnHit),
			(e = this.$fn?.ValueRatio ?? 1),
			(n = this.$fn?.TimeRatio ?? 1),
			(i = this.$fn?.MaxExtraTime ?? 0),
			0 < t.时间膨胀时长 &&
				this.Entity.GetComponent(107)?.SetTimeScale(
					t.优先级,
					t.时间膨胀值 * e,
					t.时间膨胀变化曲线,
					Math.min(t.时间膨胀时长 * n, t.时间膨胀时长 + i),
					2,
				));
	}
	AddHitCondition(t) {
		this.Kfn.push(t);
	}
	RemoveHitCondition(t) {
		-1 !== (t = this.Kfn.indexOf(t)) && this.Kfn.splice(t, 1);
	}
	RegisterComponent(t, e) {
		var n;
		this.Qfn.has(t) ||
			(((n = new ComponentHitReg()).ComponentHitBaseConfig = e),
			this.Qfn.set(t, n),
			e?.AttackerHitTimeScaleRatio && (this.Xfn = e.AttackerHitTimeScaleRatio),
			e?.VictimHitTimeScaleRatio && (this.$fn = e.VictimHitTimeScaleRatio));
	}
	AddComponentHitCondition(t, e) {
		var n;
		this.Qfn.has(t) || ((n = new ComponentHitReg()), this.Qfn.set(t, n)),
			this.Qfn.get(t).ComponentHitConditionCheck.push(e);
	}
	RemoveComponentHitCondition(t, e) {
		(t = this.Qfn.get(t)?.ComponentHitConditionCheck),
			void 0 !== t && -1 !== (e = t.indexOf(e)) && t.splice(e, 1);
	}
	rpn(t) {
		return SceneItemHitComponent_1.apn.get(t);
	}
});
(SceneItemHitComponent.apn = new Map([
	[8, 631236362],
	[1, -40693742],
	[9, 1688432695],
	[0, 178446985],
	[10, -1474770640],
	[3, -1876401816],
	[11, -350051159],
	[2, -2061161961],
])),
	(SceneItemHitComponent = SceneItemHitComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(138)],
			SceneItemHitComponent,
		)),
	(exports.SceneItemHitComponent = SceneItemHitComponent);
