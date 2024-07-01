"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var r,
			i = arguments.length,
			a =
				i < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, n, o);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(r = t[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(e, n, a) : r(e, n)) || a);
		return 3 < i && a && Object.defineProperty(e, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterPatrolComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
	GameSplineComponent_1 = require("../../../../../LevelGamePlay/Common/GameSplineComponent"),
	LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	BaseActorComponent_1 = require("../../../../Common/Component/BaseActorComponent");
class PatrolRecord {
	constructor() {
		(this.IsActive = !1),
			(this.PatrolState = 0),
			(this.LastPointIndex = -1),
			(this.OnArrivePointHandle = void 0),
			(this.OnTriggerActionsHandle = void 0),
			(this.OnPatrolEndHandle = void 0);
	}
}
class SplineInfo {
	constructor() {
		(this.SplineId = 0),
			(this.SplineComp = void 0),
			(this.VirtualSplinePoints = void 0),
			(this.SegmentsMoveConfig = void 0),
			(this.IsLoop = !1),
			(this.IsCircle = !1);
	}
}
let CharacterPatrolComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.MoveComp = void 0),
			(this.CreatureData = void 0),
			(this.RecordList = void 0),
			(this.SplineInfoList = void 0),
			(this.CurrentPatrol = void 0),
			(this.CurrentSplineInfo = void 0),
			(this.PauseKey = void 0),
			(this.PauseHandle = void 0),
			(this.PauseKeyMap = new Map()),
			(this.CacheVector = void 0),
			(this.CacheVector2 = void 0),
			(this.DebugMode = !1),
			(this.OnSegmentPatrolFinished = (t) => {
				switch (t) {
					case 2:
						var e = this.CurrentPatrol?.OnPatrolEndHandle;
						e && e(2);
						break;
					case 1:
						(e = this.GetPointActions(this.CurrentPatrol.LastPointIndex)) &&
						e.length
							? this.OnTriggerSplineActions(e)
							: (e = this.GetNextPointMoveConfig())
								? ((e.StartIndex = 0), this.MoveComp.MoveAlongPath(e))
								: this.OnPatrolFinished();
				}
			}),
			(this.OnPatrolFinished = () => {
				var t = this.CurrentPatrol?.OnPatrolEndHandle;
				this.StopPatrol(), t && t(1);
			}),
			(this.OnTriggerSplineActions = (t) => {
				var e = this.CurrentSplineInfo.SplineId,
					n = this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex),
					o = this.CurrentPatrol.OnTriggerActionsHandle;
				(this.CurrentPatrol.PatrolState = 2),
					this.PausePatrol("ExecuteSplineAction"),
					o && o(t),
					this.SplineActionRunner(e, n, t);
			});
	}
	OnStart() {
		return (
			(this.CreatureData = this.Entity.GetComponent(0)),
			(this.ActorComp = this.Entity.GetComponent(1)),
			(this.MoveComp = this.Entity.GetComponent(36)),
			(this.RecordList = new Map()),
			(this.SplineInfoList = new Map()),
			(this.CacheVector = Vector_1.Vector.Create()),
			(this.CacheVector2 = Vector_1.Vector.Create()),
			(this.PauseHandle = new BaseActorComponent_1.DisableEntityHandle(
				"PausePatrolInGame",
			)),
			!0
		);
	}
	OnActivate() {}
	OnClear() {
		return !0;
	}
	StartPatrol(t, e) {
		if (!this.CurrentPatrol?.IsActive)
			if (this.RestoreSplineState(t) || this.InitSpline(t, e)) {
				var n = new PatrolRecord();
				(this.CurrentPatrol = n),
					(this.CurrentPatrol.IsActive = !0),
					(this.CurrentPatrol.PatrolState = 1),
					(this.CurrentPatrol.OnArrivePointHandle = e.OnArrivePointHandle),
					(this.CurrentPatrol.OnTriggerActionsHandle =
						e.OnTriggerActionsHandle),
					(this.CurrentPatrol.OnPatrolEndHandle = e.OnPatrolEndHandle),
					this.RecordList.set(t, n),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							51,
							"[CharacterPatrolComp.StartPatrol] 开始巡逻",
							["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
							["Actor", this.ActorComp?.Owner?.GetName()],
							["SplineId", t],
							["LastPoint", this.CurrentPatrol?.LastPointIndex],
						);
				let o = this.GetNextPointIndex();
				e.UseNearestPoint && (o = this.GetNearestPatrolPointIndex()),
					(n = this.GetSegmentInfo(o)),
					(e = this.CurrentSplineInfo.SegmentsMoveConfig[n.SegmentIndex]) &&
						((e.StartIndex = n.PointIndex),
						this.MoveComp.MoveAlongPath(e),
						this.PatrolBeginRequest());
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"AI",
						51,
						"初始化样条失败，无法开始巡逻",
						["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
						["SplineId", t],
					),
					this.ResetState();
	}
	PausePatrol(t) {
		var e;
		this.CurrentPatrol &&
			(this.PauseKeyMap.has(t)
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						51,
						"[CharacterPlanComponent] 重复使用暂停巡逻的Key",
						["PbDataId", this.CreatureData?.GetPbDataId()],
						["context", this.constructor.name],
						["Key", t],
					)
				: ((e = this.PauseHandle.Disable(t, this.constructor.name)),
					this.PauseKeyMap.set(t, e),
					void 0 === this.PauseKey &&
						((this.PauseKey = this.Disable(
							"[CharacterPatrolComp.PausePatrol]",
						)),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"AI",
								51,
								"[CharacterPatrolComp.PausePatrol] 暂停巡逻",
								["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
								["Actor", this.ActorComp?.Owner?.GetName()],
								["SplineId", this.CurrentSplineInfo?.SplineId],
								["LastPoint", this.CurrentPatrol?.LastPointIndex],
							),
						(this.CurrentPatrol.IsActive = !1),
						this.MoveComp.StopMove(!0),
						this.PatrolEndRequest())));
	}
	ResumePatrol(t) {
		var e;
		this.CurrentPatrol &&
			((e = this.PauseKeyMap.get(t)),
			this.PauseKeyMap.delete(t)
				? this.PauseHandle.Enable(e, this.constructor.name) &&
					this.PauseHandle.Empty &&
					(this.Enable(this.PauseKey, "CharacterPatrolComp.ResumePatrol"),
					(this.PauseKey = void 0),
					(this.CurrentPatrol.IsActive = !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							51,
							"[CharacterPatrolComp.ResumePatrol] 继续巡逻",
							["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
							["Actor", this.ActorComp?.Owner?.GetName()],
							["SplineId", this.CurrentSplineInfo?.SplineId],
							["LastPoint", this.CurrentPatrol?.LastPointIndex],
						),
					this.MoveAlongPathWithRecord(),
					this.PatrolBeginRequest())
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						51,
						"[CharacterPatrolComp] 继续巡逻使用了未定义的Key",
						["PbDataId", this.CreatureData?.GetPbDataId()],
						["context", this.constructor.name],
						["Key", t],
					));
	}
	StopPatrol() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"AI",
				51,
				"[CharacterPatrolComp.StopPatrol] 停止巡逻",
				["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
				["Actor", this.ActorComp?.Owner?.GetName()],
				["SplineId", this.CurrentSplineInfo?.SplineId],
				["LastPoint", this.CurrentPatrol?.LastPointIndex],
			),
			this.MoveComp.StopMove(!0),
			this.RecordList.delete(this.CurrentSplineInfo.SplineId),
			this.ResetState(),
			this.PatrolEndRequest();
	}
	GetLastPointRawIndex() {
		return this.CurrentPatrol
			? this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex)
			: -1;
	}
	GetLastPointLocation() {
		if (this.CurrentPatrol && this.CurrentSplineInfo)
			return this.CurrentSplineInfo.VirtualSplinePoints[
				this.CurrentPatrol.LastPointIndex
			].Point;
	}
	GetCurrentPatrolSplineId() {
		return this.CurrentPatrol && this.CurrentSplineInfo
			? this.CurrentSplineInfo.SplineId
			: 0;
	}
	HasPatrolRecord(t) {
		return t ? !!this.RecordList?.has(t) : !!this.CurrentPatrol;
	}
	SplineActionRunner(t, e, n) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"AI",
				51,
				"开始执行同步事件",
				["PbDataId", this.CreatureData?.GetPbDataId()],
				["SplineId", t],
				["PointIndex", e],
			),
			ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
				n,
				LevelGeneralContextDefine_1.EntityContext.Create(
					this.ActorComp.Entity.Id,
				),
				(n) => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"AI",
							51,
							"同步事件执行完毕",
							["PbDataId", this.CreatureData?.GetPbDataId()],
							["SplineId", t],
							["PointIndex", e],
						),
						(this.RecordList.get(t).PatrolState = 1),
						this.ResumePatrol("ExecuteSplineAction");
				},
			);
	}
	InitSpline(t, e) {
		var n = new GameSplineComponent_1.GameSplineComponent(t);
		if (!this.TryInitSplineFromAiPatrol(n) && !n.Initialize())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						43,
						"[CharacterPatrolComp.InitSpline] GameSplineComponent初始化失败",
						["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
						["SplinePbDataId", t],
					),
				!1
			);
		if (
			n.Option.Type !== IComponent_1.ESplineType.LevelAI &&
			n.Option.Type !== IComponent_1.ESplineType.Patrol
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						51,
						"[CharacterPatrolComp.InitSpline] 非巡逻样条或关卡Ai样条，无法初始化",
						["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
						["SplinePbDataId", t],
					),
				!1
			);
		var o = new SplineInfo();
		switch (((o.SplineId = t), (this.CurrentSplineInfo = o), n.Option.Type)) {
			case IComponent_1.ESplineType.Patrol:
				(this.CurrentSplineInfo.IsLoop = !1),
					(this.CurrentSplineInfo.IsCircle = !1),
					n.Option.CycleOption &&
						n.Option.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop &&
						((this.CurrentSplineInfo.IsLoop = !0),
						(this.CurrentSplineInfo.IsCircle = n.Option.CycleOption.IsCircle));
				break;
			case IComponent_1.ESplineType.LevelAI:
				(this.CurrentSplineInfo.IsLoop = !0),
					(this.CurrentSplineInfo.IsCircle = !!n.Option.CycleOption?.IsCircle);
		}
		if (
			((this.CurrentSplineInfo.SplineComp = n),
			(this.CurrentSplineInfo.VirtualSplinePoints = n.PathPoint.slice(0)),
			this.CurrentSplineInfo.IsCircle &&
				2 < this.CurrentSplineInfo.VirtualSplinePoints.length)
		)
			for (let t = n.PathPoint.length - 2; 0 < t; --t)
				this.CurrentSplineInfo.VirtualSplinePoints.push(n.PathPoint[t]);
		return !!this.PartitionSpline(e) && (this.SplineInfoList.set(t, o), !0);
	}
	PartitionSpline(t) {
		if (!this.CurrentSplineInfo) return !1;
		if (!this.CurrentSplineInfo.VirtualSplinePoints.length) return !1;
		this.CurrentSplineInfo.SegmentsMoveConfig = new Array();
		let e = [],
			n = 0;
		var o = this.CurrentSplineInfo.VirtualSplinePoints.length;
		for (let i = 0; i < o; ++i) {
			var r = this.CurrentSplineInfo.VirtualSplinePoints[i];
			e.push(r),
				(i === o - 1 || (r.Actions && 0 !== r.Actions.length)) &&
					(this.CreateMoveConfig(e, n, t), (n += e.length), (e = []));
		}
		return !0;
	}
	CreateMoveConfig(t, e, n) {
		if (this.CurrentSplineInfo?.SplineComp && t.length)
			switch (this.CurrentSplineInfo.SplineComp.Option.Type) {
				case IComponent_1.ESplineType.LevelAI:
					this.CreateLevelAiSplineMoveConfig(t, e, n);
					break;
				case IComponent_1.ESplineType.Patrol:
					this.CreatePatrolSplineMoveConfig(t, e, n);
			}
	}
	CreatePatrolSplineMoveConfig(t, e, n) {
		var o,
			r = [];
		for (let n = 0; n < t.length; n++) {
			const o = t[n];
			var i = {
				Index: n,
				Position: o.Point,
				Actions: new Array(),
				MoveState: o.MoveState,
				MoveSpeed: o.MoveSpeed,
				Callback: () => {
					this.UpdatePatrolRecord(n + e),
						o.IsMain &&
							this.CurrentPatrol?.OnArrivePointHandle &&
							this.CurrentPatrol.OnArrivePointHandle();
				},
			};
			r.push(i);
		}
		((o = {
			Points: r,
			Navigation:
				(o = this.CurrentSplineInfo.SplineComp.Option).IsNavigation ?? !1,
			IsFly: o.IsFloating ?? !1,
			DebugMode: n.DebugMode ?? !1,
			Loop: !1,
			CircleMove: !1,
			UsePreviousIndex: !1,
			UseNearestPoint: !1,
			ReturnFalseWhenNavigationFailed: !1,
		}).Callback = this.OnSegmentPatrolFinished),
			this.CurrentSplineInfo.SegmentsMoveConfig.push(o);
	}
	CreateLevelAiSplineMoveConfig(t, e, n) {}
	UpdatePatrolRecord(t) {
		this.CurrentPatrol?.IsActive &&
			(this.CurrentSplineInfo.IsLoop &&
				this.CurrentSplineInfo.IsCircle &&
				this.DirectionChangeRequest(t),
			(this.CurrentPatrol.LastPointIndex = t),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"AI",
				51,
				"到达点巡逻点",
				["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
				["Actor", this.ActorComp?.Owner?.GetName()],
				["SplineId", this.CurrentSplineInfo?.SplineId],
				["PointIndex", this.CurrentPatrol.LastPointIndex],
			);
	}
	MoveAlongPathWithRecord() {
		var t, e, n;
		this.CurrentPatrol?.IsActive &&
			this.CurrentSplineInfo &&
			((t = (n = 2 === this.CurrentPatrol.PatrolState)
				? this.CurrentPatrol.LastPointIndex
				: this.GetNextPointIndex()),
			(e = this.GetSegmentInfo(t)),
			n || -1 !== e.SegmentIndex
				? (((n =
						this.CurrentSplineInfo.SegmentsMoveConfig[
							e.SegmentIndex
						]).StartIndex = e.PointIndex),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							51,
							"[CharacterPatrolComp.MoveAlongPathWithRecord] 依据历史选择下个目标点",
							["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
							["Actor", this.ActorComp?.Owner?.GetName()],
							["SplineId", this.CurrentSplineInfo?.SplineId],
							["StartIndex", t],
						),
					this.MoveComp.MoveAlongPath(n))
				: -1 !==
						(e = this.GetSegmentInfo(this.CurrentPatrol.LastPointIndex))
							.SegmentIndex &&
					e.IsEnd &&
					this.OnPatrolFinished());
	}
	ResetState() {
		(this.CurrentPatrol = void 0), (this.CurrentSplineInfo = void 0);
		for (const t of this.PauseKeyMap.values())
			this.PauseHandle.Enable(t, this.constructor.name);
		this.PauseKeyMap.clear(),
			this.PauseKey &&
				(this.Enable(this.PauseKey, "CharacterPatrolComp.ResetState"),
				(this.PauseKey = void 0));
	}
	RestoreState(t) {
		return this.RestorePatrolState(t) && this.RestoreSplineState(t);
	}
	RestorePatrolState(t) {
		return !!(t = this.RecordList.get(t)) && ((this.CurrentPatrol = t), !0);
	}
	RestoreSplineState(t) {
		return (
			!!(t = this.SplineInfoList.get(t)) && ((this.CurrentSplineInfo = t), !0)
		);
	}
	PatrolBeginRequest() {
		var t;
		this.CreatureData.IsMonster() &&
			(((t = Protocol_1.Aki.Protocol.WYn.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(
					this.CreatureData.GetCreatureDataId(),
				)),
			(t.okn =
				this.CurrentPatrol.LastPointIndex <
				this.CurrentSplineInfo.SplineComp.PathPoint.length - 1),
			Net_1.Net.Call(11810, t, () => {}));
	}
	PatrolEndRequest() {
		var t;
		this.CreatureData.IsMonster() &&
			(((t = Protocol_1.Aki.Protocol.QYn.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(
					this.CreatureData.GetCreatureDataId(),
				)),
			Net_1.Net.Call(21134, t, () => {}));
	}
	DirectionChangeRequest(t) {
		var e;
		this.CreatureData.IsMonster() &&
			(0 === t
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("AI", 51, "往返式巡逻：回到起点", [
							"PbDataID",
							this.ActorComp.CreatureData.GetPbDataId(),
						]),
					((e = Protocol_1.Aki.Protocol.YYn.create()).rkn =
						MathUtils_1.MathUtils.NumberToLong(
							this.CreatureData.GetCreatureDataId(),
						)),
					(e.okn = !0),
					Net_1.Net.Call(10604, e, () => {}))
				: t === this.CurrentSplineInfo.SplineComp.PathPoint.length - 1 &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("AI", 51, "往返式巡逻：走到终点", [
							"PbDataID",
							this.ActorComp.CreatureData.GetPbDataId(),
						]),
					((e = Protocol_1.Aki.Protocol.YYn.create()).rkn =
						MathUtils_1.MathUtils.NumberToLong(
							this.ActorComp.CreatureData.GetCreatureDataId(),
						)),
					(e.okn = !1),
					Net_1.Net.Call(10604, e, () => {})));
	}
	GetSegmentInfo(t) {
		if (
			!(
				!this.CurrentSplineInfo?.SegmentsMoveConfig ||
				t < 0 ||
				t >= this.CurrentSplineInfo.VirtualSplinePoints.length
			)
		) {
			let o = 0;
			var e = this.CurrentSplineInfo.SegmentsMoveConfig.length;
			for (let r = 0; r < e; ++r) {
				var n = this.CurrentSplineInfo.SegmentsMoveConfig[r].Points.length;
				if (t >= o && t < o + n)
					return { SegmentIndex: r, PointIndex: t - o, IsEnd: t - o == n - 1 };
				o += n;
			}
		}
		return { SegmentIndex: -1, PointIndex: -1, IsEnd: !1 };
	}
	GetPointActions(t) {
		if (
			!(
				!this.CurrentSplineInfo?.VirtualSplinePoints ||
				t < 0 ||
				t >= this.CurrentSplineInfo.VirtualSplinePoints.length
			)
		)
			return this.CurrentSplineInfo.VirtualSplinePoints[t].Actions;
	}
	GetNearestPatrolPointIndex() {
		if (!this.CurrentSplineInfo?.VirtualSplinePoints?.length)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("AI", 51, "获取最近点失败", [
						"PbDataId",
						this.ActorComp.CreatureData.GetPbDataId(),
					]),
				0
			);
		var t = this.CurrentSplineInfo.VirtualSplinePoints;
		let e = 0,
			n = Number.MAX_VALUE;
		var o = this.ActorComp.ActorLocationProxy,
			r = Vector_1.Vector.Create(),
			i = Vector_1.Vector.Create();
		for (let s = 0; s < t.length - 1; s++) {
			r.DeepCopy(t[s].Point),
				i.DeepCopy(t[s + 1].Point),
				this.CacheVector.Set(i.X, i.Y, i.Z),
				this.CacheVector.Subtraction(r, this.CacheVector);
			var a = this.CacheVector.Size();
			this.CacheVector2.Set(o.X, o.Y, o.Z),
				this.CacheVector2.Subtraction(i, this.CacheVector2),
				0 < this.CacheVector.DotProduct(this.CacheVector2) ||
					(this.CacheVector2.Set(o.X, o.Y, o.Z),
					this.CacheVector2.Subtraction(r, this.CacheVector2),
					this.CacheVector.DotProduct(this.CacheVector2) < 0) ||
					this.CacheVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ||
					(this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector),
					(a = this.CacheVector.Size() / a) < n && ((n = a), (e = s + 1)));
		}
		return e;
	}
	GetRawIndexInSpline(t) {
		var e;
		return this.CurrentSplineInfo
			? ((e = this.CurrentSplineInfo.SplineComp.PathPoint.length),
				(!this.CurrentSplineInfo.IsCircle && e <= t) ||
				(this.CurrentSplineInfo.IsCircle &&
					t >= this.CurrentSplineInfo.VirtualSplinePoints.length)
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelAi",
								51,
								"[CharacterPatrolComp.GetRawIndexInSpline] 索引越界",
								["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
								["SplineId", this.CurrentSplineInfo?.SplineId],
							),
						-1)
					: this.CurrentSplineInfo.SplineComp.GetLastMainPointIndex(
							t < e ? t : 2 * e - 2 - t,
						))
			: -1;
	}
	GetNextPointIndex(t) {
		return this.CurrentPatrol &&
			this.CurrentSplineInfo &&
			((t = t ?? this.CurrentPatrol.LastPointIndex) !==
				this.CurrentSplineInfo.VirtualSplinePoints.length - 1 ||
				this.CurrentSplineInfo.IsLoop)
			? (t + 1) % this.CurrentSplineInfo.VirtualSplinePoints.length
			: -1;
	}
	GetNextPointMoveConfig() {
		if (this.CurrentPatrol && this.CurrentSplineInfo?.SegmentsMoveConfig) {
			var t = this.GetNextPointIndex();
			if (-1 !== (t = this.GetSegmentInfo(t)).SegmentIndex)
				return this.CurrentSplineInfo.SegmentsMoveConfig[t.SegmentIndex];
		}
	}
	GetSymmetryPointIndex(t) {
		return this.CurrentSplineInfo?.IsLoop && this.CurrentSplineInfo.IsCircle
			? 0 === t
				? t
				: this.CurrentSplineInfo.VirtualSplinePoints.length - t
			: -1;
	}
	TryInitSplineFromAiPatrol(t) {
		var e = this.Entity.GetComponent(38)?.AiController.AiPatrol;
		if (!e?.AllPatrolPoints || !e.AllPatrolPoints.length) return !1;
		if (!t.InitializeWithSubPoints(this.CreatureData.GetPbDataId())) return !1;
		t.PathPoint.length = 0;
		for (const n of e.AllPatrolPoints) t.PathPoint.push(n);
		t.MainPointIndexArray = new Array();
		for (let e = 0; e < t.PathPoint.length; e++)
			t.PathPoint[e].IsMain && t.MainPointIndexArray.push(e);
		return !0;
	}
};
(CharacterPatrolComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(39)],
	CharacterPatrolComponent,
)),
	(exports.CharacterPatrolComponent = CharacterPatrolComponent);
