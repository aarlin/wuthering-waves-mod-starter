"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideEffectAssistant = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	QuestDefine_1 = require("../QuestDefine"),
	SAMPLE_STEP = 200,
	SHOW_EFFECT_DISTANCE = 5e4,
	TRACE_DISTANCE = 500,
	PROFILE_KEY = "GuideEffectAssistant_GenerateNavigationPoint";
class EffectData {
	constructor() {
		(this.Duration = 0),
			(this.ShowTime = 0),
			(this.HideTime = 0),
			(this.EffectHandle = 0),
			(this.SplinePoints = void 0),
			(this.CurActor = void 0),
			(this.SplineData = void 0),
			(this.SplineLength = 0),
			(this.State = 0),
			(this.BestIndex = 0);
	}
}
class GuideEffectAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.zio = 0),
			(this.Zio = 0),
			(this.eoo = IComponent_1.EEffectSplineCreateMode.WholeLine),
			(this._0e = 0),
			(this.too = new Map()),
			(this.ioo = new Set()),
			(this.ooo = (e, t) => {
				if (
					t === QuestDefine_1.SCAN_SKILL_ID &&
					e === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()
				)
					if (this.zio)
						if ((t = this.too.get(this.zio))) {
							var o,
								i,
								n =
									Global_1.Global.BaseCharacter?.CharacterActorComponent
										?.ActorLocationProxy;
							let e = MathUtils_1.MathUtils.MaxFloat,
								d = -1;
							for ([o, i] of t) {
								if (!i.SplinePoints)
									return void (
										Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Guide",
											32,
											"当前追踪任务Spline未找到",
											["TrackQuestId:", this.zio],
											["SplineId", o],
										)
									);
								var [a, r, s] = this.roo(n, i);
								!a ||
									s >
										ConfigManager_1.ConfigManager.LevelGamePlayConfig
											.GenExtraGuideEffectMaxDist ||
									((i.BestIndex = r), s < e && ((e = s), (d = o)));
							}
							var l,
								c,
								f =
									e >
									ConfigManager_1.ConfigManager.LevelGamePlayConfig
										.GenExtraGuideEffectMinDist;
							for ([l, c] of (this.noo(), t)) {
								var m,
									E = this.soo(n, c, c.BestIndex, l === d && f);
								this.Zio <= 0
									? Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Guide",
											32,
											"当前位置无法生成spline",
											["TrackQuestId:", this.zio],
											["SplineId", l],
										)
									: ((m = c.SplineData.Effect),
										(m = this.aoo(m, E)),
										(c.CurActor = E),
										EffectSystem_1.EffectSystem.IsValid(m) &&
											((c.EffectHandle = m),
											(c.State = 1),
											EffectSystem_1.EffectSystem.GetEffectActor(
												m,
											).K2_AttachToActor(E, void 0, 2, 2, 2, !1),
											(E =
												EffectSystem_1.EffectSystem.GetNiagaraComponent(
													m,
												)) instanceof UE.NiagaraComponent &&
												E.ReinitializeSystem(),
											this.eoo ===
												IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
												((m = Math.ceil(c.SplineLength / this._0e)),
												E.SetIntParameter(new UE.FName("SpawnCount"), m)),
											(c.ShowTime = Time_1.Time.Now),
											(c.HideTime =
												c.ShowTime +
												c.Duration * TimeUtil_1.TimeUtil.InverseMillisecond)));
							}
						} else
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Guide", 34, "当前追踪任务未配置引导特效", [
									"TrackQuestId:",
									this.zio,
								]);
					else
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Guide", 34, "当前无追踪任务");
			}),
			(this.hoo = (e, t, o) => {
				t === Protocol_1.Aki.Protocol.kMs.Proto_Finish &&
					this.too.has(e) &&
					(this.zio === e && (this.noo(), (this.zio = void 0)),
					this.too.delete(e));
			}),
			(this.Gdt = (e) => {
				e === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
					(this.noo(),
					(e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
					(this.zio = e ? e.Id : void 0));
			});
	}
	aoo(e, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Guide", 32, "[GuideEffectAssistant] 生成新的特效");
		var o = MathUtils_1.MathUtils.DefaultTransform;
		return EffectSystem_1.EffectSystem.SpawnEffect(
			GlobalData_1.GlobalData.World,
			o,
			e,
			"[GuideEffectAssistant.GenerateEffectHandle]",
			new EffectContext_1.EffectContext(void 0, t),
		);
	}
	OnDestroy() {
		this.too.clear();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CharUseSkill,
			this.ooo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQuestStateChange,
				this.hoo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CharUseSkill,
			this.ooo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQuestStateChange,
				this.hoo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			);
	}
	noo() {
		var e = this.too.get(this.zio);
		if (e) for (var [, t] of e) this.loo(t);
	}
	loo(e) {
		var t = e.CurActor;
		if (t?.IsValid()) {
			var o = e.EffectHandle;
			if (EffectSystem_1.EffectSystem.IsValid(o)) {
				if (1 === e.State) {
					const t = e.CurActor;
					this.ioo.add(t),
						EffectSystem_1.EffectSystem.AddFinishCallback(
							e.EffectHandle,
							(e) => {
								this._oo(t);
							},
						),
						(e.CurActor = void 0),
						EffectSystem_1.EffectSystem.StopEffectById(
							o,
							"[GuideEffectAssistant.ClearCurSplineAndEffectHandle]",
							!1,
						),
						(e.State = 2);
				}
			} else ActorSystem_1.ActorSystem.Put(t), (e.CurActor = void 0);
		}
	}
	_oo(e) {
		e?.IsValid() &&
			this.ioo.has(e) &&
			(this.ioo.delete(e), ActorSystem_1.ActorSystem.Put(e));
	}
	UpdateQuestGuideEffect(e) {
		if (this.zio) {
			var t = this.too.get(this.zio);
			if (t)
				for (var [, o] of t)
					Time_1.Time.Now >= o.HideTime &&
						(this.noo(), (o.HideTime = Number.MAX_VALUE));
		}
	}
	roo(e, t) {
		var o, i;
		t = t.SplinePoints;
		let n = Number.MAX_VALUE,
			a = -1;
		for ([o, i] of t.entries()) {
			var r = Vector_1.Vector.Dist(i, e);
			r < n && ((n = r), (a = o));
		}
		return -1 === a ? [!1, 0, 0] : [!0, a, n];
	}
	soo(e, t, o, i) {
		var n = ActorSystem_1.ActorSystem.Get(
				UE.BP_BasePathLine_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			),
			a =
				(n.K2_SetActorLocation(e.ToUeVector(), !1, void 0, !0),
				n.GetComponentByClass(UE.SplineComponent.StaticClass())),
			r = t.SplinePoints,
			s = UE.NewArray(UE.Vector);
		i && this.uoo(e, r[o], s);
		var l = o + 1 + Math.ceil(250);
		l = MathUtils_1.MathUtils.Clamp(l, o + 1, r.length);
		for (let t = o + 1; t < l; t++) {
			var c = Vector_1.Vector.Create();
			c.DeepCopy(r[t]), c.SubtractionEqual(e), s.Add(c.ToUeVector());
		}
		return a.SetSplinePoints(s, 0, !0), (this.Zio = s.Num()), n;
	}
	uoo(e, t, o) {
		var i = UE.NavigationSystemV1.FindPathToLocationSynchronously(
			GlobalData_1.GlobalData.World,
			e.ToUeVector(),
			t.ToUeVector(),
			void 0,
			void 0,
			!0,
		);
		for (let t = 0; t < i.PathPoints.Num(); t++) {
			var n =
				((n = Vector_1.Vector.Create(i.PathPoints.Get(t))).SubtractionEqual(e),
				n.ToUeVector());
			this.aoe(n, GlobalData_1.GlobalData.World),
				n.Set(
					n.X,
					n.Y,
					n.Z +
						ConfigManager_1.ConfigManager.LevelGamePlayConfig
							.ExtraGuideEffectRaiseDist,
				),
				o.Add(n);
		}
	}
	coo(e, t) {
		var o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
		if (o)
			if (
				(n = (0, IComponent_1.getComponent)(
					o.ComponentsData,
					"SplineComponent",
				))
			)
				if (
					((o = Vector_1.Vector.Create(
						o.Transform?.Pos.X ?? 0,
						o.Transform?.Pos.Y ?? 0,
						o.Transform?.Pos.Z ?? 0,
					)),
					n.Option.Type !== IComponent_1.ESplineType.Effect)
				)
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect",
							["SplineEntityId", e],
						);
				else {
					(this.eoo = n.Option.CreateOption.Type),
						this.eoo ===
							IComponent_1.EEffectSplineCreateMode.EquidistantPoint &&
							((n = n.Option.CreateOption), (this._0e = n.Space));
					var i =
							ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
								e,
								Global_1.Global.BaseCharacter.EntityId,
								1,
							),
						n =
							ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
								e,
							);
					if (ObjectUtils_1.ObjectUtils.IsValid(n)) {
						n.K2_SetActorLocation(o.ToUeVector(), !1, void 0, !1);
						var a = new Array();
						for (let e = 0; e < i.GetNumberOfSplinePoints() - 1; ++e) {
							var r = i.GetDistanceAlongSplineAtSplinePoint(e),
								s = i.GetDistanceAlongSplineAtSplinePoint(e + 1);
							for (let e = r; e < s; e += 200) {
								const t = i.GetWorldLocationAtDistanceAlongSpline(e);
								a.push(Vector_1.Vector.Create(t));
							}
						}
						const e = i.GetWorldLocationAtSplinePoint(
							i.GetNumberOfSplinePoints() - 1,
						);
						a.push(Vector_1.Vector.Create(e)),
							(t.SplinePoints = a),
							(t.SplineData = n.SplineData),
							(t.SplineLength = i.GetSplineLength());
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Level",
								32,
								"[SceneItemGuidePathComponent.LoadPathAsset] Spline生成失败",
								["SplineEntityId", e],
							);
				}
			else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						32,
						"[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置",
						["SplineEntityId", e],
					);
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Level",
					32,
					"[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity",
					["SplineEntityId", e],
				);
	}
	ClearQuestTraceEffect(e) {
		this.too.delete(e);
	}
	aoe(e, t) {
		if (!GuideEffectAssistant.uoe) {
			const e = UE.NewObject(UE.TraceLineElement.StaticClass());
			(e.bIsSingle = !0),
				(e.bIgnoreSelf = !0),
				e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
				(GuideEffectAssistant.uoe = e);
		}
		const o = GuideEffectAssistant.uoe;
		(o.WorldContextObject = t),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, e),
			o.SetEndLocation(e.X, e.Y, e.Z - 500);
		t = TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY);
		var i = o.HitResult;
		t
			? TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, e)
			: (o.SetEndLocation(e.X, e.Y, e.Z + 500),
				TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY) &&
					((i = o.HitResult),
					TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, e)));
	}
	AddQuestTraceEffect(e, t, o) {
		var i = new EffectData();
		let n = new Map();
		this.too.has(e) ? (n = this.too.get(e)) : this.too.set(e, n),
			n.set(o, i),
			(i.Duration = t),
			this.coo(o, i);
	}
	RemoveQuestTraceEffect(e, t) {
		var o;
		void 0 !== (e = this.too.get(e)) &&
			void 0 !== (o = e.get(t)) &&
			(ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, t),
			this.loo(o),
			e.delete(t));
	}
}
(exports.GuideEffectAssistant = GuideEffectAssistant).uoe = void 0;
