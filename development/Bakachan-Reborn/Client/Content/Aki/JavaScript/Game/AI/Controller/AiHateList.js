"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiHateList = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	OnlineController_1 = require("../../Module/Online/OnlineController"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	MIN_HATE = 1,
	ONE_THOUSAND_MILLISECONDS = 1e3;
class HatredItem {
	constructor() {
		(this.HatredValue = 0),
			(this.TauntValue = 0),
			(this.DisengageTime = -1),
			(this.DecreaseCdEndTime = 0),
			(this.DecreaseEndTime = 0),
			(this.NextDecreaseTime = 0),
			(this.EarliestClearTime = 0),
			(this.InMaxArea = !1);
	}
	get InDecreasing() {
		return 0 < this.NextDecreaseTime;
	}
	get HatredValueActual() {
		return this.HatredValue + this.TauntValue;
	}
	AfterTriggerHatredDecrease() {
		Time_1.Time.WorldTime > this.DecreaseEndTime
			? (this.NextDecreaseTime = 0)
			: (this.NextDecreaseTime += 1e3);
	}
}
class AiHateList {
	constructor(e) {
		(this.Bte = e),
			(this.vie = void 0),
			(this.Mie = 0),
			(this.Sie = 0),
			(this.Eie = 0),
			(this.yie = 0),
			(this.Iie = 0),
			(this.Tie = 0),
			(this.Lie = void 0),
			(this.Die = void 0),
			(this.Rie = Vector_1.Vector.Create()),
			(this.Uie = (e, t, i, a, r, n, s) => {
				0 !== a.CalculateType ||
					(this.Lie?.Valid && this.Lie.HasTag(-893996770)) ||
					((a = e.GetComponent(185))?.Valid && a.HasTag(-1566015933)) ||
					((a = e.CheckGetComponent(3))?.Valid &&
						2 ===
							CampUtils_1.CampUtils.GetCampRelationship(
								this.Bte.CharActorComp.Actor.Camp,
								a.Actor.Camp,
							) &&
						((a = this.Aie.get(e.Id))
							? (a.HatredValue += Math.max(
									1,
									a.InDecreasing
										? -i * this.vie.IncreaseRateWhenDecreasing
										: -i,
								))
							: this.Pie(e.Id, Math.max(1, -i))));
			}),
			(this.xie = (e, t) => {
				var i;
				t &&
					this.vie &&
					(this.Die?.Valid &&
						this.Die === t &&
						(EventSystem_1.EventSystem.EmitWithTarget(
							this.Bte.CharAiDesignComp.Entity,
							EventDefine_1.EEventName.AiHateTargetChanged,
							e.Id,
							t.Id,
						),
						(this.Die = e),
						BlackboardController_1.BlackboardController.SetEntityIdByEntity(
							this.Bte.CharActorComp.Entity.Id,
							"HateTarget",
							e.Id,
						)),
					void 0 !== (i = this.Aie.get(t?.Id))) &&
					(this.wie(e.Id, i, "ChangeRole"), this.Bie(t.Id, "InActive"));
			}),
			(this.$4s = (e, t) => {
				this.vie &&
					void 0 !== (t = this.Aie.get(t?.Id)) &&
					this.wie(e.Id, t, "VisionMorph");
			}),
			(this.Aie = new Map()),
			(this.bie = new Array()),
			(this.qie = new Array()),
			(this.Gie = 0),
			(this.Nie = 0),
			(this.Oie = 0),
			(this.kie = 2);
	}
	get AiHate() {
		return this.vie;
	}
	set AiHate(e) {
		var t, i;
		this.vie !== e &&
			((t = this.Bte.CharActorComp.Entity.GetComponent(161)) &&
				((i = this.Fie()) &&
					BlackboardController_1.BlackboardController.SetVectorValueByEntity(
						this.Bte.CharActorComp.Entity.Id,
						"CenterLocation",
						i.X,
						i.Y,
						i.Z,
					),
				t.SetChain(e ? e.MaxMoveFromBorn : 0, i)),
			(this.vie = e)
				? (e.ExcludeTag &&
						(this.Mie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
							e.ExcludeTag,
						)),
					e.SwornHatredTag &&
						(this.Sie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
							e.SwornHatredTag,
						)),
					(this.Eie =
						e.DisengageDistanceRange.Min * e.DisengageDistanceRange.Min),
					(this.yie =
						e.DisengageDistanceRange.Max * e.DisengageDistanceRange.Max),
					(this.Iie =
						e.DisengageBornDistance.Min * e.DisengageBornDistance.Min),
					(this.Tie =
						e.DisengageBornDistance.Max * e.DisengageBornDistance.Max))
				: ((this.Die = void 0),
					this.Aie.clear(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							6,
							"RemoveHatredItem",
							["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
							["Reason", "SetAiHate"],
						)));
	}
	RefreshAbilityComp() {
		this.Lie = this.Bte.CharAiDesignComp?.Entity?.GetComponent(185);
	}
	GetHatredMap() {
		return this.Aie;
	}
	GetHatredMapDebugText() {
		let e = "";
		for (var [t, i] of this.Aie)
			(t =
				CharacterController_1.CharacterController.GetCharacterActorComponentById(
					t,
				)),
				t?.Valid &&
					(e +=
						"--" +
						t.Actor.GetName() +
						"(" +
						i.HatredValue +
						"," +
						i.TauntValue +
						"," +
						i.DisengageTime +
						")\n");
		return e + "AiHateConfig:" + this.AiHate.Id;
	}
	GetCurrentTarget() {
		return this.Die;
	}
	get IsCurrentTargetInMaxArea() {
		var e;
		return !!this.Die && !!(e = this.Aie.get(this.Die.Id)) && e.InMaxArea;
	}
	BindEvents() {
		this.vie &&
			(EventSystem_1.EventSystem.AddWithTarget(
				this.Bte.CharAiDesignComp.Entity,
				EventDefine_1.EEventName.CharBeDamage,
				this.Uie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.VisionMorphBegin,
				this.$4s,
			));
	}
	UnBindEvents() {
		this.Bte.CharAiDesignComp.Valid &&
			EventSystem_1.EventSystem.HasWithTarget(
				this.Bte.CharAiDesignComp.Entity,
				EventDefine_1.EEventName.CharBeDamage,
				this.Uie,
			) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Bte.CharAiDesignComp.Entity,
				EventDefine_1.EEventName.CharBeDamage,
				this.Uie,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnChangeRole,
					this.xie,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.VisionMorphBegin,
				this.$4s,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.VisionMorphBegin,
					this.$4s,
				);
	}
	Clear(e = !0) {
		e && (this.vie = void 0),
			(this.Die = void 0),
			(this.Lie = void 0),
			this.UnBindEvents(),
			this.Bie(0, "Clear");
	}
	Tick(e) {
		var t;
		this.vie &&
			((t = this.Bte.CharActorComp.ScaledHalfHeight),
			(e = this.Vie(e * MathUtils_1.MathUtils.MillisecondToSecond, t)),
			(t = this.Die?.Id),
			(this.Die = e
				? ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)
				: void 0),
			(e = this.Die?.Id) !== t &&
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Bte.CharAiDesignComp.Entity,
					EventDefine_1.EEventName.AiHateTargetChanged,
					e,
					t,
				),
			(e = this.Bte.CharAiDesignComp.Entity.Id),
			this.Die
				? (BlackboardController_1.BlackboardController.GetEntityIdByEntity(
						e,
						"HateTarget",
					) !== this.Die.Id &&
						BlackboardController_1.BlackboardController.SetEntityIdByEntity(
							e,
							"HateTarget",
							this.Die.Id,
						),
					(t = this.Aie.get(this.Die.Id)),
					Time_1.Time.WorldTime > t.DecreaseCdEndTime &&
						t.HatredValue > 1 &&
						((t.DecreaseCdEndTime =
							Time_1.Time.WorldTime + this.vie.DecreaseTimeCd),
						(t.DecreaseEndTime =
							Time_1.Time.WorldTime + this.vie.DecreaseTimeLength),
						(t.NextDecreaseTime = Time_1.Time.WorldTime + 1e3)))
				: BlackboardController_1.BlackboardController.HasValueByEntity(
						e,
						"HateTarget",
					) &&
					BlackboardController_1.BlackboardController.RemoveValueByEntity(
						e,
						"HateTarget",
					));
	}
	wie(e, t, i) {
		this.Aie.has(e)
			? this.Aie.set(e, t)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"AI",
						6,
						"AddHatredItem",
						["AiActor", this.Bte.CharActorComp.Actor.GetName()],
						["Target", e],
						["Reason", i],
					),
				this.Aie.set(e, t),
				(i = EntitySystem_1.EntitySystem.Get(e))?.Valid &&
					(EventSystem_1.EventSystem.EmitWithTarget(
						i,
						EventDefine_1.EEventName.AiHateAddOrRemove,
						!0,
						this.Bte,
					),
					this.Bte.AiPerceptionEvents.CollectAiHateEvent(!0, i)),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Bte.CharAiDesignComp.Entity,
					EventDefine_1.EEventName.AiInFight,
					0 < this.Aie.size,
				));
	}
	Pie(e, t = 1, i) {
		if (this.vie) {
			let a = this.Aie.get(e);
			return (
				a
					? ((a.HatredValue = t), i && (a.TauntValue = i))
					: (((a = new HatredItem()).HatredValue = t),
						i && (a.TauntValue = i),
						(a.EarliestClearTime =
							Time_1.Time.WorldTime + this.vie.MinClearTime),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"AI",
								6,
								"AddHatredItem",
								["AiActor", this.Bte.CharActorComp?.Actor?.GetName()],
								["Target", e],
								["Reason", "AddHatredItemByValue"],
							),
						this.Aie.set(e, a),
						(t = EntitySystem_1.EntitySystem.Get(e))?.Valid &&
							(EventSystem_1.EventSystem.EmitWithTarget(
								t,
								EventDefine_1.EEventName.AiHateAddOrRemove,
								!0,
								this.Bte,
							),
							this.Bte.AiPerceptionEvents.CollectAiHateEvent(!0, t)),
						this.Bte.CharAiDesignComp?.Entity &&
							EventSystem_1.EventSystem.EmitWithTarget(
								this.Bte.CharAiDesignComp.Entity,
								EventDefine_1.EEventName.AiInFight,
								0 < this.Aie.size,
							)),
				a
			);
		}
	}
	Bie(e, t) {
		if (
			("MaxArea" === t &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AI",
					6,
					"RemoveHatredItem",
					["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
					["Init", this.Rie],
					["HateId", this.AiHate?.Id],
					["SquaredDistMax", this.yie],
					["SquaredInitDistMax", this.Tie],
					["Height", this.vie?.DisengageHeightRangeMax.Min],
					["Height2", this.vie?.DisengageHeightRangeMax.Max],
				),
			e)
		) {
			if (this.Aie.has(e)) {
				const i = EntitySystem_1.EntitySystem.Get(e);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"AI",
						6,
						"RemoveHatredItem",
						["AiActor", this.Bte.CharActorComp.Actor.GetName()],
						["Target", i?.Id],
						["Reason", t],
						["Valid", i?.Valid],
						["Self Location", this.Bte.CharActorComp.ActorLocationProxy],
						["Target Location", i?.GetComponent(1)?.ActorLocationProxy],
					),
					i?.Valid &&
						(EventSystem_1.EventSystem.EmitWithTarget(
							i,
							EventDefine_1.EEventName.AiHateAddOrRemove,
							!1,
							this.Bte,
						),
						this.Bte.AiPerceptionEvents.CollectAiHateEvent(!1, i)),
					this.Aie.delete(e),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Bte.CharAiDesignComp.Entity,
						EventDefine_1.EEventName.AiInFight,
						0 < this.Aie.size,
					);
			}
		} else if (this.Aie.size) {
			for (var [i] of this.Aie) {
				const e = EntitySystem_1.EntitySystem.Get(i);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"AI",
						6,
						"RemoveHatredItem",
						["AiActor", this.Bte.CharActorComp?.Actor.GetName()],
						["Target", e?.Id],
						["Reason", t],
						["IsInit", e?.IsInit],
						["All", this.Bte.CharActorComp?.ActorLocationProxy],
					),
					e?.IsInit &&
						(EventSystem_1.EventSystem.EmitWithTarget(
							e,
							EventDefine_1.EEventName.AiHateAddOrRemove,
							!1,
							this.Bte,
						),
						this.Bte.AiPerceptionEvents.CollectAiHateEvent(!1, e));
			}
			this.Aie.clear(),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Bte.CharAiDesignComp.Entity,
					EventDefine_1.EEventName.AiInFight,
					0 < this.Aie.size,
				);
		}
	}
	Vie(e, t) {
		this.Rie.FromUeVector(this.Bte.CharActorComp.GetInitLocation());
		var i = this.Bte.CharActorComp.ActorLocationProxy;
		this.Hie(e, this.Rie, i, t), this.jie(this.Rie, i, t);
		let a = 0;
		for (const e of this.bie) this.Bie(e, this.qie[a]), ++a;
		return this.Gie;
	}
	Hie(e, t, i, a) {
		for (var [r, n] of ((this.Gie = 0),
		(this.Nie = this.yie),
		(this.Oie = 0),
		(this.kie = 2),
		(this.bie.length = 0),
		(this.qie.length = 0),
		this.Aie)) {
			var s =
				CharacterController_1.CharacterController.GetCharacterActorComponentById(
					r,
				);
			if (s && s.Entity.Active) {
				var o = Vector_1.Vector.DistSquared2D(i, s.ActorLocationProxy),
					h = s.ActorLocationProxy.Z - i.Z + a - s.ScaledHalfHeight,
					m = Vector_1.Vector.DistSquared2D(t, s.ActorLocationProxy);
				if (
					((n.InMaxArea = this.Wie(o, h, m)),
					Time_1.Time.WorldTime < n.EarliestClearTime)
				)
					!(n.DisengageTime <= 0) ||
						(n.InMaxArea && this.Kie(o, h, m)) ||
						(n.DisengageTime =
							Time_1.Time.WorldTime +
							MathUtils_1.MathUtils.GetRandomRange(
								this.vie.DisengageTimeRange.Min,
								this.vie.DisengageTimeRange.Max,
							));
				else {
					if (!n.InMaxArea) {
						this.bie.push(r), this.qie.push("MaxArea");
						continue;
					}
					if (0 < n.DisengageTime) {
						if (n.TauntValue <= 0 && Time_1.Time.WorldTime > n.DisengageTime) {
							this.bie.push(r), this.qie.push("MinAreaTimer");
							continue;
						}
						this.Kie(o, h, m) && (n.DisengageTime = -1);
					} else
						this.Kie(o, h, m) ||
							(n.DisengageTime =
								Time_1.Time.WorldTime +
								MathUtils_1.MathUtils.GetRandomRange(
									this.vie.DisengageTimeRange.Min,
									this.vie.DisengageTimeRange.Max,
								));
				}
				if (
					(n.InDecreasing &&
						Time_1.Time.WorldTime > n.NextDecreaseTime &&
						((n.HatredValue = Math.max(
							1,
							n.HatredValue * this.vie.DecreaseRate,
						)),
						n.AfterTriggerHatredDecrease()),
					(h = this.Qie(s.Entity, n.TauntValue)),
					!(this.kie > h))
				) {
					if (this.kie === h) {
						if (this.Oie > n.HatredValueActual) continue;
						if (this.Oie === n.HatredValueActual && this.Nie <= o) continue;
					}
					(this.kie = h),
						(this.Oie = n.HatredValue),
						(this.Nie = o),
						(this.Gie = r);
				}
			} else this.bie.push(r), this.qie.push("InActive");
		}
	}
	AddNewHateListForTaunt(e, t) {
		var i = this.Aie.get(e);
		i ? (i.TauntValue = t) : this.Pie(e, 1, t);
	}
	RemoveHateListForTaunt(e) {
		(e = this.Aie.get(e)) && (e.TauntValue = 0);
	}
	jie(e, t, i) {
		if (!(this.vie.BaseHatred <= 0) && this.Bte.AiPerception)
			for (const o of this.Bte.AiPerception.AllEnemies)
				if (!this.Aie.has(o)) {
					var a =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							o,
						);
					if (a?.Valid) {
						var r = this.Qie(a.Entity, 0);
						if (!(r <= 1)) {
							var n = Vector_1.Vector.DistSquared2D(t, a.ActorLocationProxy),
								s = a.ActorLocationProxy.Z - t.Z + i - a.HalfHeight;
							a = Vector_1.Vector.DistSquared2D(e, a.ActorLocationProxy);
							if (
								this.Kie(n, s, a) &&
								((s = this.Pie(o)) && (s.InMaxArea = !0), !(this.kie > r))
							) {
								if (this.kie === r) {
									if (this.Oie > 1) continue;
									if (1 === this.Oie && this.Nie <= n) continue;
								}
								(this.kie = r), (this.Oie = 1), (this.Nie = n), (this.Gie = o);
							}
						}
					}
				}
	}
	ChangeHatred(e, t, i) {
		if (0 === e)
			for (var [a, r] of this.Aie)
				(r.HatredValue = r.HatredValue * t + i),
					r.HatredValue <= 0 && this.Bie(a, "ForceChanged");
		else {
			var n = this.Aie.get(e);
			n ? (n.HatredValue = n.HatredValue * t + i) : 0 < i && this.Pie(e, i);
		}
	}
	ClearHatred(e) {
		0 === e ? this.Bie(0, "Clear") : this.Bie(e, "Clear");
	}
	Qie(e, t) {
		if (!e?.Active) return 0;
		var i = e.GetComponent(158);
		if (i?.Valid && !i.IsInGame) return 0;
		if ((i = e.GetComponent(185))) {
			if (this.Mie && i.HasTag(this.Mie)) return 1;
			if (i.HasTag(1008164187)) return 2;
			if (0 < t) return 6;
			if (
				((t = e.GetComponent(0).GetPlayerId()),
				!OnlineController_1.OnlineController.CheckPlayerNetHealthy(t))
			)
				return 3;
			if (this.Sie && i.HasTag(this.Sie)) return 5;
		} else if (
			((t = e.GetComponent(0).GetPlayerId()),
			!OnlineController_1.OnlineController.CheckPlayerNetHealthy(t))
		)
			return 3;
		return 4;
	}
	Kie(e, t, i) {
		return (
			e < this.Eie &&
			MathUtils_1.MathUtils.InRange(t, this.vie.DisengageHeightRange) &&
			i < this.Iie
		);
	}
	Wie(e, t, i) {
		return (
			e < this.yie &&
			MathUtils_1.MathUtils.InRange(t, this.vie.DisengageHeightRangeMax) &&
			i < this.Tie
		);
	}
	SharedHatredTarget(e) {
		var t;
		this.vie &&
			((t = this.Aie.get(e))
				? (t.EarliestClearTime = Time_1.Time.WorldTime + this.vie.MinClearTime)
				: this.Pie(e));
	}
	Fie() {
		if (
			(e = this.Bte.CharActorComp.CreatureData.GetPbEntityInitData()) &&
			((e = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"AiComponent",
			)?.CenterPoint),
			e)
		) {
			var e;
			if (
				(e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e))
			)
				return (
					(e = Vector_1.Vector.Create(
						e.Transform?.Pos.X ?? 0,
						e.Transform?.Pos.Y ?? 0,
						e.Transform?.Pos.Z ?? 0,
					)),
					Vector_1.Vector.Create(e.X, e.Y, e.Z)
				);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"AI",
					51,
					"CenterPoint实体非法, 请指定【TsEntity_用例_投放】以外的实体",
				);
		}
	}
}
exports.AiHateList = AiHateList;
