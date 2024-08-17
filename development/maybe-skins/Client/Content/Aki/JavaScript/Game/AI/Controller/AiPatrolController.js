"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PatrolPoint = exports.AiPatrolController = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	Net_1 = require("../../../Core/Net/Net"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	AiPatrolConfig_1 = require("./AiPatrolConfig"),
	PATROL_ANGLE_LIMIT = 15,
	TRACE_DISTANCE = 500,
	PROFILE_KEY = "AiPatrolController_GenerateNavigationPoint",
	INDEX_KEY = "PatrolIndex",
	TIMES_KEY = "PatrolTimes",
	END_KEY = "PatrolEnd";
class AiPatrolController {
	constructor() {
		(this.Hte = void 0),
			(this.Xie = new Array()),
			(this.$ie = void 0),
			(this.Yie = void 0),
			(this.Jie = void 0),
			(this.zie = void 0),
			(this.Zie = !1),
			(this.eoe = void 0),
			(this.E0 = 0),
			(this.toe = 0),
			(this.ioe = 0),
			(this.ooe = !1),
			(this.StartWithInversePath = void 0),
			(this.roe = void 0);
	}
	Init(t) {
		(this.Hte = t),
			Info_1.Info.IsBuildDevelopmentOrDebug ||
				(AiPatrolController.OpenNpcPatrolDebugMode = !1);
	}
	get IsInitialized() {
		return this.Zie;
	}
	HasPatrolConfig() {
		return !!this.$ie && !!this.Zie && 0 !== this.Xie.length;
	}
	ResetPatrol(t) {
		var e = this.Hte.Entity.GetComponent(38);
		e = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfig(
			e.AiController.AiBase,
			t,
		);
		this.ResetConfig(e);
	}
	ResetPatrolById(t) {
		(t = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfigById(t)),
			this.ResetConfig(t);
	}
	ResetConfig(t) {
		var e;
		t &&
			t !== this.$ie &&
			((this.$ie = t),
			this.Yie || (this.Yie = new AiPatrolConfig_1.AiPatrolConfig()),
			this.Yie.Init(t),
			(this.Zie = !1),
			(t = this.Hte.CreatureData?.GetPbEntityInitData())) &&
			((t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent")) &&
				(void 0 !== t.Patrol
					? (t.Patrol.SplineEntityId &&
							(this.Yie.SplineEntityId = t.Patrol.SplineEntityId),
						t.Patrol.SplineEntityId || (this.Yie.Id = 0),
						t.Patrol.IsCircle
							? ((this.Yie.Loop = !0), (this.Yie.CirclePatrol = !0))
							: (this.Yie.CirclePatrol = !1),
						((t = Protocol_1.Aki.Protocol.QYn.create()).rkn =
							MathUtils_1.MathUtils.NumberToLong(
								this.Hte.CreatureData.GetCreatureDataId(),
							)),
						Net_1.Net.Call(21134, t, () => {}))
					: (this.Yie.Id = 0)),
			0 !== this.Yie.Id) &&
			(t = this.Hte.Entity.GetComponent(185)) &&
			!t.HasTag((e = 2003306528)) &&
			t.AddTag(e);
	}
	GetConfig() {
		return this.Yie;
	}
	GeneratePatrol(t) {
		this.Yie
			? this.Zie ||
				(this.Yie.SplineEntityId &&
					((this.Zie = !0),
					this.HC(t),
					void 0 !==
						(t =
							this.Hte.CreatureData.ComponentDataMap.get("Cps")?.Cps?.okn)) &&
					(this.StartWithInversePath = !t))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"AI",
					43,
					"[AiPatrolController] NewPatrolConfig没有正确初始化",
					["EntityId", this.E0],
				);
	}
	HC(t) {
		var e,
			o,
			i = this.Yie.SplineEntityId,
			r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(i);
		r
			? (e = (0, IComponent_1.getComponent)(
					r.ComponentsData,
					"SplineComponent",
				))
				? ((r = Vector_1.Vector.Create(
						r.Transform?.Pos.X ?? 0,
						r.Transform?.Pos.Y ?? 0,
						r.Transform?.Pos.Z ?? 0,
					)),
					e.Option.Type !== IComponent_1.ESplineType.Patrol
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Level",
								32,
								"[AiPatrolController.InitSplineNew] SplineComponent配置类型不是Patrol",
								["SplineEntityId", i],
							)
						: ((e =
								ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
									i,
									this.Hte.CreatureData.GetPbDataId(),
								)),
							(o =
								ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
									i,
								)),
							ObjectUtils_1.ObjectUtils.IsValid(o)
								? (o.K2_SetActorLocation(r.ToUeVector(), !1, void 0, !1),
									(this.zie = e),
									(this.Jie = o),
									this.noe("新样条实体" + i, t),
									this.soe())
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Level",
										32,
										"[AiPatrolController.InitSplineNew] Spline获取失败",
										["SplineEntityId", i],
									)))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						32,
						"[AiPatrolController.InitSplineNew] 无法找到SplineComponent配置",
						["SplineEntityId", i],
					)
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Level",
					32,
					"[AiPatrolController.InitSplineNew] 无法找到Spline Entity",
					["SplineEntityId", i],
				);
	}
	noe(t, e) {
		if (this.Yie && this.zie) {
			var o = this.Hte.CreatureData?.GetPbEntityInitData();
			let S;
			o &&
				((o = (0, IComponent_1.getComponent)(o.ComponentsData, "AiComponent")),
				(S = o?.Patrol));
			var i = this.zie,
				r = this.Jie,
				n = this.Yie.IsNavigation,
				a = this.Yie.Sampling,
				l = ((o = i.GetNumberOfSplinePoints()), GlobalData_1.GlobalData.World),
				s = this.Xie;
			(s.length = 0), s.splice(0, s.length);
			for (let t = 0, g = o; t < g; t++) {
				var h = i.GetWorldLocationAtSplinePoint(t),
					C = (n && l && this.aoe(h, l), new PatrolPoint());
				if (
					((C.IsMain = !0),
					(C.Point = Vector_1.Vector.Create(h)),
					this.hoe(r),
					this.loe(t, C, r),
					s.push(C),
					S && !S.Disabled && this._oe(t, C, r),
					e)
				) {
					let e = i.GetDirectionAtSplinePoint(t, 1);
					if (0 < a && t < g - 1) {
						h = i.GetDistanceAlongSplineAtSplinePoint(t);
						var d = i.GetDistanceAlongSplineAtSplinePoint(t + 1);
						for (let t = h + a; t < d; t += a) {
							var c,
								E = i.GetDirectionAtDistanceAlongSpline(t, 1);
							MathUtils_1.MathUtils.GetAngleByVectorDot(e, E) < 15 ||
								((e = E),
								(E = i.GetWorldLocationAtDistanceAlongSpline(t)),
								n && l && this.aoe(E, l),
								((c = new PatrolPoint()).IsMain = !1),
								(c.Point = Vector_1.Vector.Create(E)),
								s.push(c));
						}
					}
				}
			}
			0 === s.length &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Level", 30, "Spline初始化移动点为空", ["Path", t]);
		}
	}
	aoe(t, e) {
		if (!AiPatrolController.uoe) {
			const t = UE.NewObject(UE.TraceLineElement.StaticClass());
			(t.bIsSingle = !0),
				(t.bIgnoreSelf = !0),
				t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
				(AiPatrolController.uoe = t);
		}
		const o = AiPatrolController.uoe;
		(o.WorldContextObject = e),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, t),
			o.SetEndLocation(t.X, t.Y, t.Z - 500);
		e = TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY);
		var i = o.HitResult;
		(e ||
			(o.SetEndLocation(t.X, t.Y, t.Z + 500),
			TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY))) &&
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, t);
	}
	hoe(t) {
		t.SplineData.Type === IComponent_1.ESplineType.Patrol &&
			((t = t.SplineData).CycleOption &&
				(t.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop
					? ((this.Yie.Loop = !0),
						(this.Yie.CirclePatrol = t.CycleOption.IsCircle))
					: (this.Yie.Loop = !1)),
			t.IsFloating && (this.Yie.ContainZ = t.IsFloating),
			t.IsNavigation && (this.Yie.IsNavigation = t.IsNavigation),
			t.TurnSpeed) &&
			(this.Yie.TurnSpeed = t.TurnSpeed);
	}
	loe(t, e, o) {
		(o = o.SplineData),
			(e.MoveState = o.Points[t].MoveState),
			(e.MoveSpeed = o.Points[t].MoveSpeed),
			(e.IsIgnorePoint = o.Points[t].IgnorePoint ?? !1),
			(e.StayTime = o.Points[t].StayTime ?? 0),
			(e.IsHide = o.Points[t].IsHide ?? !1);
	}
	_oe(t, e, o) {
		(o = o.SplineData.Points[t].Actions) && (e.Actions = o);
	}
	GetNearestPatrolPointIndex(t) {
		let e = 0,
			o = Number.MAX_VALUE;
		for (let r = 0, n = this.Xie.length; r < n; r++) {
			var i = this.Xie[r];
			i.IsMain &&
				(i = Vector_1.Vector.DistSquared(t, i.Point)) < o &&
				((o = i), (e = r));
		}
		return e;
	}
	ResetBaseInfoByMainPoint(t, e, o) {
		var i = this.ioe;
		if (!(0 === this.Xie.length || this.Xie.length <= i)) {
			let n = this.Xie[i];
			if (!n?.IsMain)
				for (let t = i; -1 < t; t--) {
					var r = this.Xie[t];
					if (r?.IsMain) {
						n = r;
						break;
					}
				}
			let a = o;
			n?.IsMain && 0 < n.MoveState && (a = n.MoveState),
				this.ChangeMoveState(e, a),
				n?.IsMain &&
					(this.ChangeMoveSpeed(t, e, n.MoveSpeed),
					(i = this.Hte).SkeletalMesh?.SetVisibility(!n.IsHide),
					(o = i.Entity.GetComponent(185))) &&
					((t = -841499802),
					n.IsHide
						? o.HasTag(t) || o.AddTag(t)
						: o.HasTag(t) && o.RemoveTag(t));
		}
	}
	ChangeMoveSpeed(t, e, o) {
		t &&
			(0 < o ? t.SetMaxSpeed(o) : e && ((o = e.MoveState), t.ResetMaxSpeed(o)));
	}
	CheckMoveStateChanged(t, e) {
		let o = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
		switch (e) {
			case 1:
				o = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
				break;
			case 2:
				o = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
		}
		return (
			t &&
				(e = t.MoveState) !== o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					30,
					"巡逻过程中MoveState发生改变",
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["CorrectState", o],
					["NowState", e],
				),
			!1
		);
	}
	ChangeMoveState(t, e) {
		let o = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
		switch (e) {
			case 1:
				o = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
				break;
			case 2:
				o = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
		}
		t && t.MoveState !== o && t.SetMoveState(o);
	}
	AddPerformanceTags(t) {
		this.eoe || (this.eoe = new Array());
		for (let e = 0, o = t.length; e < o; e++) this.eoe.push(t[e]);
		var e,
			o = this.Hte.Entity.GetComponent(185);
		o && !o.HasTag((e = -1645015979)) && o.AddTag(e);
	}
	GetNextPerformanceTag() {
		if (this.eoe && 0 !== this.eoe.length) return this.eoe.shift();
	}
	soe() {
		this.Yie?.SplineEntityId &&
			this.Jie?.IsValid() &&
			((this.Jie = void 0),
			ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
				this.Yie.SplineEntityId,
				this.Hte.CreatureData.GetPbDataId(),
			)),
			(this.zie = void 0);
	}
	StartPatrol(t, e) {
		var o = this.Hte;
		(e =
			((this.E0 = o.Entity.Id),
			(this.roe = e),
			BlackboardController_1.BlackboardController.SetIntValueByEntity(
				this.E0,
				END_KEY,
				0,
			),
			BlackboardController_1.BlackboardController.GetIntValueByEntity(
				this.E0,
				TIMES_KEY,
			)))
			? ((this.toe = e), this.toe % 2 != 0 && (this.ooe = !0))
			: ((this.toe = 0), (this.ooe = !!this.StartWithInversePath)),
			t
				? void 0 !==
						(e =
							BlackboardController_1.BlackboardController.GetIntValueByEntity(
								this.E0,
								INDEX_KEY,
							)) && e < this.Xie.length
					? this.coe(e)
					: ((t = this.GetNearestPatrolPointIndex(o.ActorLocationProxy)),
						this.coe(t))
				: ((e = this.GetNearestPatrolPointIndex(o.ActorLocationProxy)),
					this.coe(e)),
			BlackboardController_1.BlackboardController.SetIntValueByEntity(
				this.E0,
				INDEX_KEY,
				this.ioe,
			);
	}
	coe(t) {
		(this.ioe = t), this.roe && this.roe();
	}
	CheckPatrolEnd() {
		return this.$ie.CirclePatrol ? this.moe() : this.doe();
	}
	SetPatrolIndex(t) {
		this.ioe !== t &&
			((this.ioe = t),
			this.Yie.CirclePatrol
				? (this.ioe + 1) % this.Xie.length === this.Yie.StartIndex &&
					(++this.toe,
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						this.E0,
						TIMES_KEY,
						this.toe,
					),
					this.Yie.Loop ||
						BlackboardController_1.BlackboardController.SetIntValueByEntity(
							this.E0,
							END_KEY,
							1,
						))
				: this.ooe
					? 0 === this.ioe &&
						((this.ooe = !1),
						++this.toe,
						BlackboardController_1.BlackboardController.SetIntValueByEntity(
							this.E0,
							TIMES_KEY,
							this.toe,
						))
					: this.ioe === this.Xie.length - 1 &&
						(++this.toe,
						BlackboardController_1.BlackboardController.SetIntValueByEntity(
							this.E0,
							TIMES_KEY,
							this.toe,
						),
						this.Yie.Loop
							? (this.ooe = !0)
							: BlackboardController_1.BlackboardController.SetIntValueByEntity(
									this.E0,
									END_KEY,
									1,
								)),
			this.roe) &&
			this.roe();
	}
	moe() {
		if (
			(this.coe((this.ioe + 1) % this.Xie.length),
			this.ioe === this.$ie.StartIndex)
		) {
			if (!this.$ie.Loop)
				return (
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						this.E0,
						END_KEY,
						1,
					),
					!0
				);
			++this.toe,
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					this.E0,
					TIMES_KEY,
					this.toe,
				);
		}
		return !1;
	}
	doe() {
		if (this.ooe)
			0 === this.ioe
				? ((this.ooe = !1),
					this.coe(0),
					++this.toe,
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						this.E0,
						TIMES_KEY,
						this.toe,
					))
				: this.coe(this.ioe - 1);
		else if (this.ioe === this.Xie.length - 1) {
			if (
				(++this.toe,
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					this.E0,
					TIMES_KEY,
					this.toe,
				),
				!this.$ie.Loop)
			)
				return (
					BlackboardController_1.BlackboardController.SetIntValueByEntity(
						this.E0,
						END_KEY,
						1,
					),
					!0
				);
			(this.ooe = !0), this.coe(this.Xie.length - 2);
		} else this.coe(this.ioe + 1);
		return !1;
	}
	PatrolFinish() {
		BlackboardController_1.BlackboardController.GetIntValueByEntity(
			this.E0,
			INDEX_KEY,
		) !== this.ioe &&
			BlackboardController_1.BlackboardController.SetIntValueByEntity(
				this.E0,
				INDEX_KEY,
				this.ioe,
			),
			(this.roe = void 0);
	}
	GetPatrolPoint(t) {
		if (this.Xie && 0 !== this.Xie.length && !(this.Xie.length <= t))
			return this.Xie[t];
	}
	get PatrolIndex() {
		return this.ioe;
	}
	get PatrolPoint() {
		return this.GetPatrolPoint(this.ioe);
	}
	get AllPatrolPoints() {
		return this.Xie;
	}
	GetLastPatrolPoint() {
		var t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
			this.E0,
			INDEX_KEY,
		);
		if (t && (t = this.GetPatrolPoint(t))) return t.Point;
	}
	Clear() {
		(this.Xie.length = 0),
			(this.$ie = void 0),
			(this.Yie = void 0),
			(this.roe = void 0),
			this.soe();
	}
}
(exports.AiPatrolController = AiPatrolController).OpenNpcPatrolDebugMode = !0;
class PatrolPoint {
	constructor() {
		(this.IsMain = !1),
			(this.Point = void 0),
			(this.MoveState = 0),
			(this.MoveSpeed = 0),
			(this.IsIgnorePoint = !1),
			(this.StayTime = 0),
			(this.IsHide = !1),
			(this.Actions = void 0);
	}
}
exports.PatrolPoint = PatrolPoint;
