"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiPerception = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	PROFILE_KEY = "AiPerception_IsActorInSense",
	MINUS_HALF = -180,
	MINUS_QUATER = -90;
class AiSenseObject {
	constructor(e) {
		(this.AiSense = e),
			(this.WithAngleHorizontal =
				e.HorizontalAngle.Min > -180 || e.HorizontalAngle.Max < 180),
			(this.WithAngleVertical =
				e.VerticalAngle.Min > -90 || e.VerticalAngle.Max < 90),
			(this.Coe = e.SenseDistanceRange.Min * e.SenseDistanceRange.Min),
			(this.goe = e.SenseDistanceRange.Max * e.SenseDistanceRange.Max),
			(this.foe = e.WalkSenseRate * e.WalkSenseRate),
			(this.poe = e.AirSenseRate * e.AirSenseRate);
	}
	InArea(e, t, i, o, s, n) {
		if (
			this.WithAngleHorizontal &&
			!MathUtils_1.MathUtils.InRange(t, this.AiSense.HorizontalAngle)
		)
			return !1;
		if (
			this.WithAngleVertical &&
			!MathUtils_1.MathUtils.InRange(i, this.AiSense.VerticalAngle)
		)
			return !1;
		let a = e;
		return (
			o === CharacterUnifiedStateTypes_1.ECharPositionState.Ground
				? (s !== CharacterUnifiedStateTypes_1.ECharMoveState.Other &&
						s !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand &&
						s !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
						s !== CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop) ||
					(a /= this.foe)
				: s === CharacterUnifiedStateTypes_1.ECharMoveState.Glide &&
					(a /= this.poe),
			!(n ? a > this.goe : a > this.Coe)
		);
	}
}
class AiPerception {
	constructor(e, t, i) {
		(this.Bte = e),
			(this.AiSenseGroup = t),
			(this.Allies = new Set()),
			(this.Enemies = new Set()),
			(this.Neutrals = new Set()),
			(this.SceneItems = new Set()),
			(this.AllEnemies = new Set()),
			(this.ShareAllyLink = new Set()),
			(this.voe = new Set()),
			(this.Moe = new Set()),
			(this.Soe = new Set()),
			(this.f6 = new Array()),
			(this.EntitiesInSense = new Map()),
			(this.EntitiesToAdd = new Map()),
			(this.Eoe = new Array()),
			(this.yoe = new Map()),
			(this.Ioe = []),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Toe = new Set()),
			(this.Loe = new Array()),
			(this.Doe = new Map()),
			(this.Roe = new Map()),
			(this.Uoe = 0),
			(this.Aoe = 0),
			(this.uoe = void 0),
			(this.MaxSenseRange = 0),
			(this.Poe = !1),
			(this.q7s = !1),
			(this.xoe = void 0),
			(this.woe = void 0),
			(this.Boe = void 0),
			(this.boe = void 0),
			(this.qoe = void 0),
			(this.Goe = void 0);
		var o = e.CharActorComp?.CreatureData;
		(this.q7s = 122000237 === o?.GetPbDataId()),
			(this.E0 = e.CharActorComp.Entity.Id),
			(this.Noe = e.CharActorComp.Actor.Camp),
			this.EntitiesInSense.set(this.E0, 0),
			this.Roe.set(0, new Set()),
			this.Roe.set(1, new Set());
		let s = -1;
		for (const e of i) {
			var n = new AiSenseObject(e);
			this.Loe.push(n),
				0 < ++s ||
					(this.q7s &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							6,
							"EnableAiSense Init",
							["Actor", this.Bte.CharActorComp.Actor.GetName()],
							["AiSenseObject", n.AiSense.Id],
						),
					n.WithAngleHorizontal && ++this.Uoe,
					n.WithAngleVertical && ++this.Aoe,
					e.SenseDistanceRange.Max > this.MaxSenseRange &&
						(this.MaxSenseRange = e.SenseDistanceRange.Max),
					this.Roe.get(n.AiSense.SenseTarget)?.add(n));
		}
		(this.Ooe = t ? t.ShareDis * t.ShareDis : 0), this.koe();
	}
	koe() {
		(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.WorldContextObject = this.Bte.CharActorComp.Actor),
			(this.uoe.bIsSingle = !0),
			(this.uoe.bIgnoreSelf = !0);
	}
	GetEnableAiSenseDebug() {
		let e = "感知配置激活情况: ";
		for (let i = 0; i < this.Loe.length; ++i) {
			var t = this.Loe[i];
			e +=
				this.Loe[i].AiSense.Id +
				":" +
				(t = this.Roe.get(t.AiSense.SenseTarget).has(t)) +
				"; ";
		}
		return e;
	}
	Foe(e, t) {
		var i = this.Roe.get(e.AiSense.SenseTarget);
		i.has(e) !== t &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AI",
					6,
					"EnableAiSense",
					["Actor", this.Bte.CharActorComp.Actor.GetName()],
					["AiSenseObject", e.AiSense.Id],
					["enable", t],
				),
			t
				? (e.WithAngleHorizontal && ++this.Uoe,
					e.WithAngleVertical && ++this.Aoe,
					i.add(e))
				: (e.WithAngleHorizontal && --this.Uoe,
					e.WithAngleVertical && --this.Aoe,
					i.delete(e)));
	}
	SetAiSenseEnable(e, t) {
		e < 0 || this.Loe.length <= e || this.Foe(this.Loe[e], t);
	}
	SetAllAiSenseEnable(e) {
		if (!e) {
			for (var [t] of this.EntitiesInSense)
				t !== this.E0 &&
					(t = EntitySystem_1.EntitySystem.Get(t)) &&
					this.Voe(t, !1);
			this.Allies.clear(),
				this.Enemies.clear(),
				this.Neutrals.clear(),
				this.AllEnemies.clear(),
				this.EntitiesInSense.clear(),
				this.EntitiesInSense.set(this.E0, 0);
		}
		(this.Poe = !e),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Ai",
				this.Bte.CharActorComp?.Entity,
				"禁用全部感知",
				["forbid", this.Poe],
			);
	}
	AddOrRemoveAiSense(e, t) {
		t &&
			!this.Doe.has(e) &&
			(i = ConfigManager_1.ConfigManager.AiConfig.LoadAiSense(e.toString())) &&
			this.Doe.set(e, new AiSenseObject(i));
		var i = this.Doe.get(e);
		i && this.Foe(i, t);
	}
	EnableAiSenseByType(e, t) {
		for (const i of this.Loe) i.AiSense.SenseType === e && this.Foe(i, t);
		for (var [, i] of this.Doe) i.AiSense.SenseType === e && this.Foe(i, t);
	}
	Clear(e = !0) {
		this.Allies.clear(),
			this.Enemies.clear(),
			this.Neutrals.clear(),
			this.SceneItems.clear(),
			this.AllEnemies.clear(),
			(this.f6.length = 0),
			this.EntitiesInSense.clear(),
			this.EntitiesInSense.set(this.E0, 0),
			this.EntitiesToAdd.clear(),
			(this.Eoe.length = 0),
			this.yoe.clear(),
			e && (this.Ioe.length = 0);
	}
	Tick() {
		if (this.Bte.CharActorComp?.Valid)
			if (this.AiSenseGroup) {
				if (!this.Poe) {
					for (var [e, t] of (this.Hoe(), this.joe(), this.EntitiesToAdd))
						this.EntitiesInSense.set(e, t),
							(t = EntitySystem_1.EntitySystem.Get(e)),
							this.Voe(t, !0);
					this.EntitiesToAdd.clear(), this.Woe(), this.Koe();
				}
			} else this.Koe();
	}
	Qoe(e, t, i, o = !1) {
		var s = this.Bte.CharActorComp.ActorLocationProxy,
			n = e.GetComponent(1),
			a = o && n.CreatureData.IsRole(),
			r = (n.ActorLocationProxy.Subtraction(s, this.Lz), this.Lz.SizeSquared());
		let h = 0,
			l = 0;
		(this.Uoe || this.Aoe) &&
			(this.Lz.FromUeVector(
				this.Bte.CharActorComp.ActorRotation.UnrotateVector(
					this.Lz.ToUeVector(),
				),
			),
			this.Uoe &&
				(h = MathUtils_1.MathUtils.RadToDeg * Math.atan2(this.Lz.Y, this.Lz.X)),
			this.Aoe) &&
			(l =
				MathUtils_1.MathUtils.RadToDeg * Math.asin(this.Lz.Z / Math.sqrt(r)));
		o = e.GetComponent(89);
		var c = o?.Valid
				? o.PositionState
				: CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
			A = o?.Valid
				? o.MoveState
				: CharacterUnifiedStateTypes_1.ECharMoveState.Other;
		TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, s),
			this.Toe.clear();
		for (const e of this.Roe.get(i))
			if (e.InArea(r, h, l, c, A, t)) {
				if (
					(a &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							6,
							"Mingzhongzhigui Ai InArea",
							["actor", n.Owner?.GetName()],
							["CantBeBlock", e.AiSense.CantBeBlock],
						),
					!e.AiSense.CantBeBlock)
				) {
					if (this.Toe.has(e.AiSense.BlockType)) continue;
					if (
						(this.uoe.SetTraceTypeQuery(e.AiSense.BlockType),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.uoe,
							n.ActorLocationProxy,
						),
						TraceElementCommon_1.TraceElementCommon.LineTrace(
							this.uoe,
							PROFILE_KEY,
						))
					) {
						var S = this.uoe.HitResult;
						if (S.bBlockingHit && S.Actors.Get(0) !== n.Owner) {
							a &&
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"AI",
									6,
									"Mingzhongzhigui Ai Hit",
									["actor", S.Actors.Get(0)?.GetName()],
									["Comp", S.Components.Get(0)?.GetName()],
								),
								this.Toe.add(e.AiSense.BlockType);
							continue;
						}
					}
				}
				return !0;
			}
		return !1;
	}
	Hoe() {
		var e,
			t,
			i = this.Bte.CharActorComp.ActorLocationProxy;
		for ([e, t] of (this.EntitiesToAdd.clear(), this.Roe))
			if (0 !== t.size) {
				let o = 0;
				for (const e of t) o = Math.max(o, e.AiSense.SenseDistanceRange.Min);
				0 === e
					? ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
							i,
							o,
							2,
							this.Ioe,
						)
					: ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
							i,
							o,
							1,
							this.Ioe,
						);
				for (const t of this.Ioe)
					t.Entity?.Valid &&
						t.Entity.Active &&
						(this.EntitiesInSense.has(t.Entity.Id) ||
							(this.Qoe(t.Entity, !1, e, this.q7s) &&
								(this.q7s &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("AI", 6, "Mingzhongzhigui In Sense", [
										"actor",
										t.Id,
									]),
								this.EntitiesToAdd.set(t.Entity.Id, e))));
			}
	}
	joe() {
		for (var [e, t] of ((this.Eoe.length = 0), this.EntitiesInSense)) {
			var i;
			e !== this.E0 &&
				((i = EntitySystem_1.EntitySystem.Get(e))?.Valid && i.Active
					? this.Qoe(i, !0, t)
						? this.yoe.delete(e)
						: this.Eoe.push(e)
					: (this.EntitiesInSense.delete(e),
						this.yoe.delete(e),
						this.Allies.delete(e) &&
							this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
								!1,
								e,
								1,
							),
						this.Enemies.delete(e) &&
							this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
								!1,
								e,
								2,
							),
						this.Neutrals.delete(e) &&
							this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(
								!1,
								e,
								0,
							),
						this.SceneItems.delete(e)));
		}
		for (var [o, s] of this.yoe)
			Time_1.Time.Now > s &&
				(this.EntitiesInSense.delete(o),
				(s = EntitySystem_1.EntitySystem.Get(o))?.Valid && this.Voe(s, !1),
				this.yoe.delete(o));
		for (const e of this.Eoe)
			this.yoe.has(e) ||
				this.yoe.set(
					e,
					Time_1.Time.Now +
						MathUtils_1.MathUtils.GetRandomRange(
							this.AiSenseGroup.LoseDelay.Min,
							this.AiSenseGroup.LoseDelay.Max,
						),
				);
	}
	Voe(e, t) {
		var i = e.Id;
		e = e.GetComponent(3);
		if (e?.Valid) {
			var o = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, e.Actor.Camp);
			let s;
			switch (o) {
				case 1:
					s = this.Allies;
					break;
				case 2:
					s = this.Enemies;
					break;
				default:
					s = this.Neutrals;
			}
			t
				? s.has(i) ||
					(s.add(i),
					this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
						!0,
						e,
						o,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAiSenseEntityEnter,
						this.E0,
						e.Entity,
					))
				: s.delete(i) &&
					(this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
						!1,
						e,
						o,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAiSenseEntityLeave,
						this.E0,
						e.Entity,
					));
		} else
			t
				? this.SceneItems.has(i) ||
					(this.SceneItems.add(i),
					this.Bte.AiPerceptionEvents.OnSenseSceneItem(e))
				: this.SceneItems.delete(i);
	}
	Woe() {
		if (!(this.AiSenseGroup.ShareDis <= 0)) {
			var e,
				t,
				i = this.Bte.CharActorComp.ActorLocationProxy,
				o =
					(ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
						i,
						this.AiSenseGroup.ShareDis,
						2,
						this.Ioe,
					),
					this.voe.clear(),
					this.voe.add(this.E0),
					this.Bte.CharActorComp.Actor.Camp);
			for (const t of this.Ioe)
				!t.Entity?.Active ||
					this.voe.has(t.Entity.Id) ||
					!(e = t.Entity.GetComponent(3))?.Valid ||
					o !== e.Actor.Camp ||
					Vector_1.Vector.DistSquared(i, e.ActorLocationProxy) > this.Ooe ||
					(this.voe.add(t.Entity.Id), this.ShareAllyLink.has(t.Entity.Id)) ||
					((e = t.Entity.GetComponent(38))?.Valid &&
						e.AiController.AiPerception?.Moe.add(this.E0));
			for (const e of this.ShareAllyLink)
				this.voe.has(e) ||
					((t = EntitySystem_1.EntitySystem.Get(e))?.Valid &&
						(t = t.GetComponent(38))?.Valid &&
						t.AiController.AiPerception?.Moe.delete(this.E0));
			var s = this.voe;
			(this.voe = this.ShareAllyLink), (this.ShareAllyLink = s);
		}
	}
	Koe() {
		this.AllEnemies.clear();
		for (const e of this.Enemies) this.AllEnemies.add(e);
		this.Soe.clear(), (this.f6.length = 0), this.Soe.add(this.E0);
		for (const e of this.Moe) this.f6.push(e), this.Soe.add(e);
		for (; 0 < this.f6.length; ) {
			var e = this.f6.pop();
			e = EntitySystem_1.EntitySystem.Get(e);
			if (
				e?.Valid &&
				((e = e.GetComponent(38)), e?.Valid && e.AiController.AiPerception)
			) {
				for (const t of e.AiController.AiPerception.Enemies)
					this.AllEnemies.add(t);
				for (const t of e.AiController.AiPerception.Moe)
					this.Soe.has(t) || (this.Soe.add(t), this.f6.push(t));
			}
		}
	}
}
exports.AiPerception = AiPerception;
