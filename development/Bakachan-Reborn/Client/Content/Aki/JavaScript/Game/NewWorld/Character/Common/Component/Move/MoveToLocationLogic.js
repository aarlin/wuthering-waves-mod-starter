"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MoveToPointConfig =
		exports.MoveToLocation =
		exports.MoveToLocationController =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
	QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
	MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
	Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
	AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	CharacterActorComponent_1 = require("../CharacterActorComponent"),
	FIX_LOCATION_TOLERANCE = 2,
	PROFILE_KEY = "PatrolMoveLogic_ResetActorLocation",
	END_DISTANCE = 30,
	DEFAULT_TURN_SPEED = 360,
	RESET_LOCATION_TOLERANCE = 10,
	PER_TICK_MIN_MOVE_SPEED = 30;
class MoveToLocationController {
	constructor(t, o) {
		(this.QPn = void 0),
			(this.$Pn = void 0),
			(this.XPn = void 0),
			(this.Hte = void 0),
			(this.Hte = t.GetComponent(3)),
			(this.$Pn = new MoveToLocation()),
			this.$Pn.Init(t),
			(this.XPn = o);
	}
	UpdateMove(t) {
		this.XPn?.IsRunning
			? this.XPn?.UpdateMove(t)
			: void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
				this.$Pn?.UpdateMove(t);
	}
	IsMoving() {
		return (
			this.XPn?.IsRunning || void 0 !== this.$Pn?.GetCurrentMoveToLocation()
		);
	}
	IsMovingToLocation() {
		return void 0 !== this.$Pn?.GetCurrentMoveToLocation();
	}
	MoveEnd(t) {
		this.XPn?.IsRunning && this.XPn.MoveEnd(t),
			void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
				(this.$Pn.MoveEnd(t), (this.QPn = void 0));
	}
	StopMove() {
		this.XPn?.IsRunning && this.XPn.StopMove(),
			void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
				(this.$Pn.StopMove(), (this.QPn = void 0));
	}
	StopMoveAlongPath() {
		this.XPn?.StopMove();
	}
	StopMoveToLocation() {
		this.$Pn.StopMove(), (this.QPn = void 0);
	}
	Dispose() {
		this.XPn?.Dispose(), this.$Pn?.Dispose();
	}
	GetCurrentToLocation() {
		return this.XPn?.IsRunning
			? this.XPn.CurrentToLocation
			: void 0 !== this.$Pn?.GetLastMoveToLocation()
				? this.$Pn.GetLastMoveToLocation()
				: void 0;
	}
	MoveToLocation(t, o = !0) {
		var e, i;
		return (
			!!this.$Pn &&
			((e = this.Hte.ActorLocationProxy),
			(i = t.Distance ?? MoveToPointConfig.DefaultDistance),
			Vector_1.Vector.Dist2D(e, t.Position) < i ||
				(o && this.YPn(),
				t.CallbackList || (t.CallbackList = []),
				t.CallbackList.push((t) => {
					this.ZLe(t);
				}),
				this.$Pn.SetMoveToLocation(t)))
		);
	}
	NavigateMoveToLocation(t, o, e = !0) {
		if (!this.$Pn) return !1;
		2 === this.Hte?.WanderDirectionType &&
			(t.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
			(this.QPn = []);
		var i = [],
			n = this.Hte.ActorLocationProxy,
			s = t.Distance ?? MoveToPointConfig.DefaultDistance;
		if (Vector_1.Vector.Dist2D(n, t.Position) < s) return !0;
		var a = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
			this.Hte.Owner.GetWorld(),
			n.ToUeVector(),
			t.Position.ToUeVector(),
			i,
			!0,
			!0,
		);
		if ((!a || 0 === i.length) && o)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"寻路失败或起点终点不在NavMesh上。",
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["EntityId", this.Hte.Entity.Id],
					),
				!1
			);
		if ((e && this.YPn(), 0 < i.length)) {
			Vector_1.Vector.Dist2D(i[0], n) > s &&
				this.QPn.push(MoveToPointConfig.GetTempMovePointConfig(i[0], t));
			for (let o = 1; o < i.length; o++)
				this.QPn.push(MoveToPointConfig.GetTempMovePointConfig(i[o], t));
		}
		0 < this.QPn.length
			? ((a = this.QPn.length - 1),
				this.QPn[a].CallbackList || (this.QPn[a].CallbackList = []),
				this.QPn[a].CallbackList.push((t) => {
					this.ZLe(t);
				}))
			: this.QPn.push(t);
		for (let t = 0; t < this.QPn.length - 1; t++) {
			var r = t + 1;
			this.QPn[t].NextMovePointConfig = this.QPn[r];
		}
		return this.$Pn.SetMoveToLocation(this.QPn[0]);
	}
	YPn() {
		void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
			(this.$Pn.StopMove(), Log_1.Log.CheckWarn()) &&
			Log_1.Log.Warn(
				"AI",
				43,
				"正在移动中，停止移动。",
				["PbDataId", this.Hte.CreatureData.GetPbDataId()],
				["EntityId", this.Hte.Entity.Id],
			);
	}
	ZLe(t) {
		this.QPn = void 0;
	}
}
(exports.MoveToLocationController = MoveToLocationController).DebugDraw = !1;
class MoveToLocation {
	constructor() {
		(this.Jh = void 0),
			(this.Hte = void 0),
			(this.oRe = void 0),
			(this.mBe = void 0),
			(this.Fuo = Rotator_1.Rotator.Create()),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create()),
			(this.JPn = Vector_1.Vector.Create()),
			(this.QYo = Quat_1.Quat.Create()),
			(this.mie = 0),
			(this.nDi = -0),
			(this.XYo = Vector_1.Vector.Create()),
			(this.wDe = 0),
			(this.$Yo = Vector_1.Vector.Create(0, 0, 0)),
			(this.zPn = Vector_1.Vector.Create(0, 0, 0)),
			(this.ZPn = void 0),
			(this.ewn = Vector_1.Vector.Create(0, 0, 0)),
			(this.fYo = 0),
			(this.pYo = 0),
			(this.eJo = void 0),
			(this.twn = void 0);
	}
	GetCurrentMoveToLocation() {
		return this.ZPn?.Position ?? void 0;
	}
	GetLastMoveToLocation() {
		let t = this.ZPn;
		for (; t && t?.NextMovePointConfig; ) t = this.ZPn?.NextMovePointConfig;
		return t?.Position ?? void 0;
	}
	Init(t) {
		(this.Jh = t),
			(this.Hte = this.Jh.GetComponent(3)),
			(this.mBe = this.Jh.GetComponent(89)),
			(this.oRe = this.Jh.GetComponent(160)),
			(this.wDe = this.Hte.CreatureData.GetPbDataId()),
			this.tJo();
	}
	SetMoveToLocation(t) {
		return (
			!!t &&
			(this.ht(),
			this.iwn(t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"开始移动。",
					["PbDataId", this.Hte.CreatureData.GetPbDataId()],
					["EntityId", this.Hte.Entity.Id],
					["Config", t],
				),
			!0)
		);
	}
	UpdateMove(t) {
		this.ZPn &&
			(MoveToLocationController.DebugDraw &&
				GlobalData_1.GlobalData.IsPlayInEditor &&
				this.DYo(),
			(this.mie += t),
			1 < this.mie && ((this.mie = 0), this.LYo()),
			this.UpdateMoveToDirection()
				? (!this.rwn() ||
						(this.ZPn.ResetCondition && !this.ZPn.ResetCondition()) ||
						this.own(t, !1),
					this.MoveEnd(1))
				: this.ZPn.ReturnTimeoutFailed &&
					t > MathCommon_1.MathCommon.KindaSmallNumber &&
					this.xYo(t));
	}
	Dispose() {
		this.StopMove();
	}
	xYo(t) {
		var o = this.nDi;
		if (Math.abs(this.pYo - o) / t > 30 || 0 === this.pYo)
			this.fYo = this.ZPn.ReturnTimeoutFailed;
		else if (((this.fYo -= t), this.fYo <= 0))
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						43,
						"检测到移动行为不符合预期,持续卡住超时,返回移动失败",
						["PbDataId", this.wDe],
						["EntityId", this.Jh.Id],
						["超时时限", this.ZPn.ReturnTimeoutFailed],
					),
				void this.MoveEnd(2)
			);
		this.pYo = o;
	}
	UpdateMoveToDirection() {
		var t;
		return (
			this.oJo(),
			!!this.rJo() ||
				(this.XYo.Normalize(),
				this.mBe &&
				this.mBe.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Climb
					? (this.QYo.DeepCopy(this.Hte.ActorQuatProxy),
						this.QYo.Inverse(this.QYo),
						this.QYo.RotateVector(this.XYo, this.XYo),
						this.Hte.SetInputDirect(this.XYo))
					: ((t = this.ZPn.TurnSpeed),
						this.Hte.SetOverrideTurnSpeed(t),
						this.mBe &&
						this.mBe.MoveState ===
							CharacterUnifiedStateTypes_1.ECharMoveState.Walk
							? (this.ZPn.FaceToPosition &&
									(this.JPn.DeepCopy(this.ZPn.FaceToPosition),
									this.JPn.SubtractionEqual(this.Hte.ActorLocationProxy)),
								AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
									this.Hte,
									this.XYo,
									this.QYo,
									this.RTe,
									this.ZPn.TurnSpeed,
									this.ZPn.UseNearestDirection,
									this.ZPn.FaceToPosition ? this.JPn : void 0,
								))
							: (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
									this.Hte,
									this.XYo,
									t,
									this.ZPn.IsFly,
								),
								this.Hte.SetInputDirect(this.Hte.ActorForwardProxy))),
				!1)
		);
	}
	StopMove() {
		this.ZPn &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"StopMove ClearInput",
					["PbDataId", this.wDe],
					["EntityId", this.Jh.Id],
				),
			this.ht(),
			this.Hte.ClearInput(),
			this.ZPn?.Clear(),
			(this.ZPn = void 0));
	}
	MoveEnd(t) {
		var o = this.ZPn?.NextMovePointConfig ?? void 0;
		this.ZPn?.RunCallbackList(t),
			this.ht(),
			o
				? this.iwn(o)
				: (this.StopMove(), this.ZPn?.Clear(), (this.ZPn = void 0));
	}
	iwn(t) {
		this.zPn.DeepCopy(this.Hte.ActorLocationProxy),
			t instanceof MoveToPointConfig
				? (this.ZPn = t)
				: this.ZPn
					? this.ZPn.DeepCopy(t)
					: (this.ZPn = new MoveToPointConfig(t, this.ewn));
	}
	ht() {
		(this.fYo = 0), (this.pYo = 0), this.zPn.Reset(), this.$Yo.Reset();
	}
	oJo() {
		this.XYo.DeepCopy(this.ZPn.Position),
			this.XYo.SubtractionEqual(this.Hte.ActorLocationProxy),
			this.ZPn.IsFly || (this.XYo.Z = 0),
			(this.nDi = this.XYo.Size());
	}
	rJo() {
		if (this.nDi <= this.ZPn.Distance) return !0;
		this.ZPn.Position.Subtraction(this.zPn, this.jye),
			(this.jye.Z = 0),
			this.RTe.DeepCopy(this.XYo),
			(this.RTe.Z = 0);
		var t = this.RTe.DotProduct(this.jye);
		return (
			t < 0 &&
				(this.nwn(), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug(
					"AI",
					43,
					"经过了目标位置",
					["PbDataId", this.wDe],
					["EntityId", this.Jh.Id],
					["distance", this.nDi],
					["dotProduct", t],
				),
			t < 0
		);
	}
	LYo() {
		var t,
			o = this.Jh.GetComponent(36);
		o &&
			((t = this.ZPn.MoveSpeed),
			this.ZPn.IsFly
				? (o.CharacterMovement.SetMovementMode(5), t && o.SetMaxSpeed(t))
				: (t && o.SetMaxSpeed(t),
					(o = this.ZPn.MoveState) &&
						CharacterUnifiedStateTypes_1.legalMoveStates
							.get(this.mBe.PositionState)
							.has(o) &&
						this.mBe.SetMoveState(o)));
	}
	nwn() {
		this.jye.DeepCopy(this.ZPn.Position),
			this.ZPn.IsFly || (this.jye.Z += this.Hte.HalfHeight),
			this.$Yo.DeepCopy(this.jye),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"更新LastPatrolPoint",
					["PbDataId", this.wDe],
					["EntityId", this.Jh.Id],
					["LastPatrolPoint", this.$Yo],
					["CurrentPoint", this.Hte.ActorLocationProxy],
				);
	}
	own(t, o) {
		var e;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"AI",
				43,
				"Reset目标位置",
				["PbDataId", this.wDe],
				["EntityId", this.Jh.Id],
				["deltaSeconds", t],
				["LastPatrolPoint", this.$Yo],
				["CurrentPoint", this.Hte.ActorLocationProxy],
				[
					"Distance",
					Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
				],
			),
			this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1),
			this.Hte.ClearInput(),
			this.oRe && this.Jh.GetTickInterval() <= 1
				? ((e = this.oRe.GetMeshTransform()),
					this.aJo(o),
					this.oRe.SetModelBuffer(
						e,
						t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
					))
				: this.aJo(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"AI",
					43,
					"Reset目标位置结束",
					["PbDataId", this.wDe],
					["EntityId", this.Jh.Id],
					["ActorLocation", this.Hte.ActorLocationProxy],
					[
						"Distance",
						Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
					],
				),
			this.$Yo.Set(0, 0, 0);
	}
	aJo(t) {
		this.ZPn.IsFly || this.hJo(this.$Yo, this.$Yo),
			t
				? (this.jye.DeepCopy(this.XYo),
					this.jye.ToOrientationRotator(this.Fuo),
					this.Hte.SetActorLocationAndRotation(
						this.$Yo.ToUeVector(),
						this.Fuo.ToUeRotator(),
						"拉回目标点设置坐标",
						!0,
					))
				: this.Hte.SetActorLocation(
						this.$Yo.ToUeVector(),
						"拉回目标点设置坐标",
						!0,
					);
	}
	rwn() {
		return !(
			this.$Yo.Size() < 1 ||
			(Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy) <
				this.ZPn.Distance + 10 &&
				(this.$Yo.Set(0, 0, 0), 1))
		);
	}
	tJo() {
		var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
		(t.bIsSingle = !1),
			(t.bIgnoreSelf = !0),
			t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
			TraceElementCommon_1.TraceElementCommon.SetTraceColor(
				t,
				ColorUtils_1.ColorUtils.LinearGreen,
			),
			TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
				t,
				ColorUtils_1.ColorUtils.LinearRed,
			),
			(this.eJo = t);
	}
	hJo(t, o) {
		this.jye.DeepCopy(t), (this.jye.Z += this.Hte.HalfHeight);
		var e = this.jye,
			i =
				((t =
					(this.RTe.DeepCopy(t),
					(this.RTe.Z += CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
					this.RTe)),
				this.eJo);
		(i.WorldContextObject = this.Hte.Actor),
			(i.Radius = this.Hte.ScaledRadius),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, e),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, t),
			i.ActorsToIgnore.Empty();
		for (const t of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
			i.ActorsToIgnore.Add(t);
		e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
			this.Hte.Actor.CapsuleComponent,
			i,
			PROFILE_KEY,
			PROFILE_KEY,
		);
		var n = i.HitResult;
		if (e && n.bBlockingHit) {
			var s = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
			let t = "";
			var a = n.Actors.Num();
			let e = -1,
				i = "";
			TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, s);
			for (let o = 0; o < a; ++o) {
				var r = n.Actors.Get(o);
				if (
					r?.IsValid() &&
					((t += r.GetName() + ", "), !r.IsA(UE.Character.StaticClass()))
				) {
					(e = o),
						(i = r.GetName()),
						TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, o, s);
					break;
				}
			}
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
						["PbDataId", this.wDe],
						["EntityId", this.Jh.Id],
						["经过修正的位置", s],
						["Actors", t],
						["HitLocationIndex", e],
						["HitLocationName", i],
						["this.ActorComp!.ScaledHalfHeight", this.Hte.ScaledHalfHeight],
						["this.ActorComp!.ScaledRadius", this.Hte.ScaledRadius],
					),
				(s.Z += this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
				(s.Z += 2),
				this.eJo &&
					((this.eJo.WorldContextObject = void 0),
					this.eJo.ActorsToIgnore.Empty()),
				o.DeepCopy(s),
				!0
			);
		}
		return (
			this.eJo &&
				((this.eJo.WorldContextObject = void 0),
				this.eJo.ActorsToIgnore.Empty()),
			!1
		);
	}
	DYo() {
		if (this.ZPn && GlobalData_1.GlobalData.IsPlayInEditor) {
			this.twn ||
				(this.twn = new UE.LinearColor(
					0.5 < Math.random() ? 0 : 1,
					0.5 < Math.random() ? 0 : 1,
					0.5 < Math.random() ? 0 : 1,
					0,
				));
			let o = this.ZPn;
			for (
				UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					this.Hte.ActorLocation,
					30,
					10,
					this.twn,
				);
				o;
			) {
				var t = o.Position;
				UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					t.ToUeVector(),
					30,
					10,
					this.twn,
				),
					(o = o.NextMovePointConfig);
			}
		}
	}
}
exports.MoveToLocation = MoveToLocation;
class MoveToPointConfig {
	constructor(t, o) {
		(this.swn = void 0),
			(this.IsFly = !1),
			(this.ReturnTimeoutFailed = 0),
			(this.Distance = MoveToPointConfig.DefaultDistance),
			(this.TurnSpeed = MoveToPointConfig.DefaultTurnSpeed),
			(this.MoveState = void 0),
			(this.UseNearestDirection = !1),
			(this.MoveSpeed = void 0),
			(this.NextMovePointConfig = void 0),
			(this.FaceToPosition = void 0),
			(this.ResetCondition = void 0),
			(this.CallbackList = void 0),
			(this.swn = o || Vector_1.Vector.Create()),
			this.swn.DeepCopy(t.Position),
			(this.NextMovePointConfig = t.NextMovePointConfig ?? void 0),
			(this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance),
			(this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed),
			(this.MoveState = t.MoveState ?? void 0),
			(this.IsFly = t.IsFly ?? !1),
			(this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
			(this.UseNearestDirection = t.UseNearestDirection ?? !1),
			(this.MoveSpeed = t.MoveSpeed ?? void 0),
			(this.FaceToPosition = t.FaceToPosition ?? void 0),
			(this.CallbackList = []),
			t.CallbackList &&
				0 < t.CallbackList.length &&
				this.CallbackList.push(...t.CallbackList),
			t.ResetCondition && (this.ResetCondition = t.ResetCondition);
	}
	get Position() {
		return this.swn;
	}
	DeepCopy(t) {
		this.swn.DeepCopy(t.Position),
			(this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance),
			(this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed),
			(this.MoveState = t.MoveState ?? void 0),
			(this.IsFly = t.IsFly ?? !1),
			(this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
			(this.UseNearestDirection = t.UseNearestDirection ?? !1),
			(this.MoveSpeed = t.MoveSpeed),
			(this.FaceToPosition = t.FaceToPosition),
			(this.CallbackList = t.CallbackList),
			(this.ResetCondition = t.ResetCondition),
			this.NextMovePointConfig &&
			t.NextMovePointConfig &&
			this.NextMovePointConfig instanceof MoveToPointConfig &&
			this.NextMovePointConfig !== t.NextMovePointConfig
				? this.NextMovePointConfig.DeepCopy(t.NextMovePointConfig)
				: (this.NextMovePointConfig = t.NextMovePointConfig);
	}
	RunCallbackList(t) {
		if (this.CallbackList && 0 !== this.CallbackList.length)
			for (const o of this.CallbackList) o && o(t);
	}
	Clear() {
		this.CallbackList && (this.CallbackList.length = 0),
			(this.ResetCondition = void 0),
			(this.NextMovePointConfig = void 0);
	}
	static GetTempMovePointConfig(t, o) {
		return {
			Position: t,
			IsFly: o.IsFly,
			Distance: o.Distance,
			MoveState: o.MoveState,
			MoveSpeed: o.MoveSpeed,
			TurnSpeed: o.TurnSpeed,
			ReturnTimeoutFailed: o.ReturnTimeoutFailed,
			UseNearestDirection: o.UseNearestDirection,
			FaceToPosition: o.FaceToPosition,
			ResetCondition: o.ResetCondition,
			NextMovePointConfig: void 0,
			CallbackList: void 0,
		};
	}
}
((exports.MoveToPointConfig = MoveToPointConfig).DefaultDistance = 30),
	(MoveToPointConfig.DefaultTurnSpeed = 360);
