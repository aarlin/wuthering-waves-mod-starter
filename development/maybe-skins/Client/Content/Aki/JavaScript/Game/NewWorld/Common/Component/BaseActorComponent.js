"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, r) {
		var i,
			n = arguments.length,
			a =
				n < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, o, r);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(i = t[s]) && (a = (n < 3 ? i(a) : 3 < n ? i(e, o, a) : i(e, o)) || a);
		return 3 < n && a && Object.defineProperty(e, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseActorComponent = exports.DisableEntityHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Entity_1 = require("../../../../Core/Entity/Entity"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	CycleCounter_1 = require("../../../../Core/Performance/CycleCounter"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Quat_1 = require("../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class DisableEntityHandle {
	constructor(t) {
		(this.S9 = t), (this.vW = 0), (this.DW = new Map());
	}
	get Empty() {
		return 0 === this.DW.size;
	}
	Disable(t, e) {
		return (
			t
				? t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"Disable的Reason字符串长度必须大于等于限制字符数量",
						["ConstructorName", e],
						["Reason", t],
						["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", [
						"ConstructorName",
						e,
					]),
			(e = ++this.vW),
			this.DW.set(e, t),
			e
		);
	}
	Enable(t, e) {
		return this.DW.get(t)
			? this.DW.delete(t)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						1,
						"激活句柄不存在",
						["Type", this.S9],
						["ConstructorName", e],
						["handle", t],
					),
				!1);
	}
	Clear() {
		this.DW.clear();
	}
	DumpDisableInfo() {
		var t,
			e,
			o = new Array();
		let r = "";
		for ([t, e] of this.DW)
			o.push(`${r}{Type:${this.S9},Handle:${t},Reason:${e}}`), (r = " ");
		return o.join("");
	}
}
exports.DisableEntityHandle = DisableEntityHandle;
let BaseActorComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorInternal = void 0),
			(this.CachedActorTransform = void 0),
			(this.CachedActorLocation = Vector_1.Vector.Create()),
			(this.CachedActorRotation = Rotator_1.Rotator.Create(0, 0, 0)),
			(this.CachedActorScale = Vector_1.Vector.Create()),
			(this.CachedActorQuat = Quat_1.Quat.Create(0, 0, 0, 1)),
			(this.CachedActorForward = Vector_1.Vector.Create(1, 0, 0)),
			(this.CachedActorRight = Vector_1.Vector.Create(0, 1, 0)),
			(this.CachedActorUp = Vector_1.Vector.Create(0, 0, 1)),
			(this.CachedLocationTime = -1),
			(this.CachedForwardTime = -1),
			(this.CachedScaleTime = -1),
			(this.CachedRotationTime = -1),
			(this.CachedTransformTime = -1),
			(this.CachedRightTime = -1),
			(this.CachedUpTime = -1),
			(this.CachedDesiredActorLocation = Vector_1.Vector.Create()),
			(this.IsChangingLocation = !1),
			(this.CreatureDataInternal = void 0),
			(this.DebugMovementComp = void 0),
			(this.onn = !0),
			(this.rnn = !0),
			(this.IsInSequenceBinding = !1),
			(this.DisableActorHandle = void 0),
			(this.DisableCollisionHandle = void 0),
			(this.DisableTickHandle = void 0),
			(this.nnn = void 0),
			(this.snn = void 0),
			(this.ann = void 0),
			(this.hnn = void 0),
			(this.lnn = void 0),
			(this._nn = void 0),
			(this.LastActorLocation = Vector_1.Vector.Create());
	}
	get IsAutonomousProxy() {
		return this.onn;
	}
	get IsMoveAutonomousProxy() {
		return this.rnn;
	}
	OnCreate() {
		return (
			(this.DisableActorHandle = new DisableEntityHandle(
				"SetActorHiddenInGame",
			)),
			(this.DisableCollisionHandle = new DisableEntityHandle(
				"SetActorEnableCollision",
			)),
			(this.DisableTickHandle = new DisableEntityHandle("SetActorTickEnabled")),
			this.AddUnResetProperty(
				"DisableActorHandle",
				"DisableCollisionHandle",
				"DisableTickHandle",
			),
			!0
		);
	}
	OnInitData(t) {
		return (
			this.CachedActorForward.Set(1, 0, 0),
			this.CachedActorRight.Set(0, 1, 0),
			this.CachedActorUp.Set(0, 0, 1),
			!0
		);
	}
	OnActivate() {
		this.ActorInternal.Kuro_SetRole(this.rnn ? 2 : 1),
			this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
	}
	OnAfterTick(t) {
		this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
	}
	SetAutonomous(t, e = void 0) {
		(this.onn = t),
			this.SetMoveAutonomous(void 0 === e ? t : e, "切换逻辑主控");
	}
	SetMoveAutonomous(t, e = 0) {
		(this.rnn = t), this.ActorInternal?.Kuro_SetRole(this.rnn ? 2 : 1);
	}
	InitCreatureData() {
		return (
			(this.CreatureDataInternal = this.Entity.GetComponent(0)),
			!!this.CreatureDataInternal?.Valid ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 3, "creature数据加载失败。"),
				!1)
		);
	}
	get CreatureData() {
		return this.CreatureDataInternal;
	}
	get ActorQuat() {
		return this.ActorQuatProxy.ToUeQuat();
	}
	get ActorQuatProxy() {
		return (
			this.CachedRotationTime < Time_1.Time.Frame &&
				this.ActorInternal?.IsValid() &&
				((this.CachedRotationTime = Time_1.Time.Frame),
				this.CachedActorRotation.DeepCopy(
					this.ActorInternal.K2_GetActorRotation(),
				),
				this.CachedActorRotation.Quaternion(this.CachedActorQuat)),
			this.CachedActorQuat
		);
	}
	get ActorRotationProxy() {
		return (
			this.CachedRotationTime < Time_1.Time.Frame &&
				this.ActorInternal?.IsValid() &&
				((this.CachedRotationTime = Time_1.Time.Frame),
				this.CachedActorRotation.DeepCopy(
					this.ActorInternal.K2_GetActorRotation(),
				),
				this.CachedActorRotation.Quaternion(this.CachedActorQuat)),
			this.CachedActorRotation
		);
	}
	get ActorRotation() {
		return this.ActorRotationProxy.ToUeRotator();
	}
	get ActorScaleProxy() {
		return (
			this.CachedScaleTime <= 0 &&
				this.ActorInternal?.IsValid() &&
				((this.CachedScaleTime = 1),
				this.CachedActorScale.FromUeVector(
					this.ActorInternal.GetActorScale3D(),
				)),
			this.CachedActorScale
		);
	}
	get ActorScale() {
		return this.ActorScaleProxy.ToUeVector();
	}
	get ActorTransform() {
		return (
			this.CachedTransformTime < Time_1.Time.Frame &&
				this.ActorInternal?.IsValid() &&
				((this.CachedTransformTime = Time_1.Time.Frame),
				(this.CachedActorTransform = this.ActorInternal.GetTransform())),
			this.CachedActorTransform
		);
	}
	get ActorLocation() {
		return this.ActorLocationProxy.ToUeVector();
	}
	get ActorLocationProxy() {
		return this.IsChangingLocation
			? this.CachedDesiredActorLocation
			: (this.CachedLocationTime < Time_1.Time.Frame &&
					this.ActorInternal?.IsValid() &&
					((this.CachedLocationTime = Time_1.Time.Frame),
					this.unn(!0),
					this.CachedActorLocation.FromUeVector(
						this.ActorInternal.K2_GetActorLocation(),
					),
					this.unn(!1)),
				this.CachedActorLocation);
	}
	unn(t) {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			(Object.defineProperty(this.CachedActorLocation.Tuple, "0", {
				writable: t,
			}),
			Object.defineProperty(this.CachedActorLocation.Tuple, "1", {
				writable: t,
			}),
			Object.defineProperty(this.CachedActorLocation.Tuple, "2", {
				writable: t,
			}));
	}
	get ActorLocationProxyNoUpdate() {
		return this.CachedLocationTime <= 0
			? this.ActorLocationProxy
			: this.CachedActorLocation;
	}
	get ActorForwardProxy() {
		return (
			this.CachedForwardTime < Time_1.Time.Frame &&
				((this.CachedForwardTime = Time_1.Time.Frame),
				this.ActorQuatProxy.RotateVector(
					Vector_1.Vector.ForwardVectorProxy,
					this.CachedActorForward,
				)),
			this.CachedActorForward
		);
	}
	get ActorRight() {
		return this.ActorRightProxy.ToUeVector();
	}
	get ActorRightProxy() {
		return (
			this.CachedRightTime < Time_1.Time.Frame &&
				((this.CachedRightTime = Time_1.Time.Frame),
				this.ActorQuatProxy.RotateVector(
					Vector_1.Vector.RightVectorProxy,
					this.CachedActorRight,
				)),
			this.CachedActorRight
		);
	}
	get ActorForward() {
		return this.ActorForwardProxy.ToUeVector();
	}
	get ActorUpProxy() {
		return (
			this.CachedUpTime < Time_1.Time.Frame &&
				((this.CachedUpTime = Time_1.Time.Frame),
				this.ActorQuatProxy.RotateVector(
					Vector_1.Vector.UpVectorProxy,
					this.CachedActorUp,
				)),
			this.CachedActorUp
		);
	}
	get ActorUp() {
		return this.ActorUpProxy.ToUeVector();
	}
	GetRadius() {
		return 0;
	}
	get Owner() {
		if (this.ActorInternal?.IsValid()) return this.ActorInternal;
	}
	get SkeletalMesh() {}
	HasMesh() {
		return !1;
	}
	OnTeleport() {
		this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
	}
	SetActorLocation(t, e = "unknown", o = !0) {
		if (
			(CycleCounter_1.CycleCounter.Start("TS_SetActorLocation"),
			!MathUtils_1.MathUtils.IsValidVector(t))
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"SetActorLocation的value无效",
						["value", t],
						["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					),
				!1
			);
		let r = !1;
		return (
			this.ActorInternal?.IsValid() &&
				(this.CachedDesiredActorLocation.FromUeVector(t),
				(this.IsChangingLocation = !0),
				(r = this.ActorInternal.K2_SetActorLocation(t, o, void 0, !0)),
				(this.IsChangingLocation = !1),
				this.DebugMovementComp) &&
				this.DebugMovementComp.MarkDebugRecord(e + ".SetActorLocation", 1),
			this.ResetLocationCachedTime(),
			this.OnTeleport(),
			CycleCounter_1.CycleCounter.Stop("TS_SetActorLocation"),
			this.ActorInternal?.IsValid() &&
				ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Test",
					58,
					"[SetActorLocation]",
					["location:", t],
					["owner", this?.Owner.GetName()],
				),
			r
		);
	}
	TeleportTo(t, e, o = "unknown") {
		if (
			(CycleCounter_1.CycleCounter.Start("TS_TeleportTo"),
			!MathUtils_1.MathUtils.IsValidVector(t) ||
				!MathUtils_1.MathUtils.IsValidRotator(e))
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"TeleportTo的location无效",
						["location", t],
						["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					),
				!1
			);
		let r = !1;
		return (
			this.ActorInternal?.IsValid() &&
				(this.CachedDesiredActorLocation.FromUeVector(t),
				(this.IsChangingLocation = !0),
				(r = this.ActorInternal.K2_KuroTeleportTo(t, e)),
				(this.IsChangingLocation = !1),
				this.DebugMovementComp) &&
				this.DebugMovementComp.MarkDebugRecord(o + ".TeleportTo", 1),
			this.ResetLocationCachedTime(),
			this.OnTeleport(),
			CycleCounter_1.CycleCounter.Stop("TS_TeleportTo"),
			this.ActorInternal?.IsValid() &&
				ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Test",
					58,
					"[TeleportTo]",
					["location:", t],
					["owner", this?.Owner],
				),
			r
		);
	}
	ResetLocationCachedTime() {
		(this.CachedTransformTime = -1), (this.CachedLocationTime = -1);
	}
	SetActorRotation(t, e = "unknown", o = !0) {
		CycleCounter_1.CycleCounter.Start("TS_SetActorRotation");
		let r = !1;
		return (
			this.ActorInternal?.IsValid() &&
				((r = this.ActorInternal.K2_KuroSetActorRotation(t, o, !1)),
				this.DebugMovementComp) &&
				this.DebugMovementComp.MarkDebugRecord(e + ".SetActorRotation", 1),
			this.cnn(),
			CycleCounter_1.CycleCounter.Stop("TS_SetActorRotation"),
			r
		);
	}
	cnn() {
		(this.CachedTransformTime = 0),
			(this.CachedRotationTime = 0),
			(this.CachedUpTime = 0),
			(this.CachedRightTime = 0),
			(this.CachedForwardTime = 0);
	}
	SetActorLocationAndRotation(t, e, o = "unknown", r = !1) {
		var i;
		return (
			CycleCounter_1.CycleCounter.Start("TS_SetActorLocationAndRotation"),
			MathUtils_1.MathUtils.IsValidVector(t)
				? (!1,
					this.CachedDesiredActorLocation.FromUeVector(t),
					(this.IsChangingLocation = !0),
					(i = this.ActorInternal.K2_SetActorLocationAndRotation(
						t,
						e,
						r,
						void 0,
						!0,
					)),
					(this.IsChangingLocation = !1),
					this.ResetTransformCachedTime(),
					this.OnTeleport(),
					this.DebugMovementComp &&
						this.DebugMovementComp.MarkDebugRecord(
							o + ".SetActorLocationAndRotation",
							1,
						),
					CycleCounter_1.CycleCounter.Stop("TS_SetActorLocationAndRotation"),
					ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Test",
							58,
							"[SetActorLocationAndRotation]",
							["location:", t],
							["rotation:", e],
							["owner", this?.Owner],
						),
					i)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"SetActorLocationAndRotation的location无效",
							["location", t],
							["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
						),
					!1)
		);
	}
	SetActorTransform(t, e = "unknown", o = !0) {
		let r = !1;
		var i = t.GetLocation();
		return MathUtils_1.MathUtils.IsValidVector(i)
			? (this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
				this.ActorLocationProxy.Equals(this.CachedDesiredActorLocation)
					? (r = this.SetActorRotation(t.GetRotation().Rotator()))
					: ((this.IsChangingLocation = !0),
						(r = this.ActorInternal.K2_SetActorTransform(t, o, void 0, !0)),
						(this.IsChangingLocation = !1)),
				this.DebugMovementComp &&
					this.DebugMovementComp.MarkDebugRecord(e + ".SetActorTransform", 1),
				this.ResetTransformCachedTime(),
				this.OnTeleport(),
				r)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"SetActorTransform的value参数",
						["value", t],
						["Location", i],
						["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					),
				!1);
	}
	AddActorWorldOffset(t, e = "unknown", o = !0) {
		this.ActorInternal.K2_AddActorWorldOffset(t, o, void 0, !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(e + ".AddActorWorldOffset", 1),
			this.ResetLocationCachedTime();
	}
	AddActorLocalOffset(t, e = "unknown", o = !0) {
		this.ActorInternal.K2_AddActorLocalOffset(t, o, void 0, !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(e + ".AddActorLocalOffset", 1),
			this.ResetLocationCachedTime();
	}
	AddActorWorldRotation(t, e = "unknown", o = !1) {
		this.ActorInternal.K2_AddActorWorldRotation(t, o, void 0, !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(e + ".AddActorWorldRotation", 1),
			this.cnn();
	}
	AddActorLocalRotation(t, e = "unknown", o = !1) {
		this.ActorInternal.K2_AddActorLocalRotation(t, o, void 0, !1),
			this.DebugMovementComp &&
				this.DebugMovementComp.MarkDebugRecord(e + ".AddActorLocalRotation", 1),
			this.cnn();
	}
	ResetTransformCachedTime() {
		(this.CachedTransformTime = 0),
			(this.CachedLocationTime = 0),
			(this.CachedRotationTime = 0),
			(this.CachedUpTime = 0),
			(this.CachedRightTime = 0),
			(this.CachedForwardTime = 0);
	}
	ResetAllCachedTime() {
		(this.CachedTransformTime = -1),
			(this.CachedLocationTime = -1),
			(this.CachedRotationTime = -1),
			(this.CachedUpTime = -1),
			(this.CachedRightTime = -1),
			(this.CachedForwardTime = -1);
	}
	OnSetActorActive(t, e) {
		t
			? (this.EnableActor(this.hnn),
				this.EnableCollision(this.lnn),
				this.EnableTick(this._nn),
				(this.hnn = void 0),
				(this.lnn = void 0),
				(this._nn = void 0))
			: ((this.hnn = this.DisableActor(e)),
				(this.lnn = this.DisableCollision(e)),
				(this._nn = this.DisableTick(e)));
	}
	SetSequenceBinding(t) {
		this.IsInSequenceBinding = t;
	}
	GetSequenceBinding() {
		return this.IsInSequenceBinding;
	}
	DisableActor(t) {
		var e = this.DisableActorHandle.Disable(t, this.constructor.name);
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"DisableActor",
					["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					["PbDataId", this.CreatureData?.GetPbDataId()],
					["Handle", e],
					["Reason", t],
				),
			this.ActorInternal?.IsValid() &&
				!this.ActorInternal.bHidden &&
				(this.ActorInternal.SetActorHiddenInGame(!0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSetActorHidden,
					this.Entity.Id,
					!1,
				)),
			e
		);
	}
	DisableCollision(t) {
		var e = this.DisableCollisionHandle.Disable(t, this.constructor.name);
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"DisableCollision",
					["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					["PbDataId", this.CreatureData?.GetPbDataId()],
					["Handle", e],
					["Reason", t],
				),
			this.ActorInternal?.IsValid() &&
				this.ActorInternal.bActorEnableCollision &&
				this.ActorInternal.SetActorEnableCollision(!1),
			e
		);
	}
	DisableTick(t) {
		return (
			(t = this.DisableTickHandle.Disable(t, this.constructor.name)),
			this.ActorInternal?.IsValid() &&
				this.ActorInternal.IsActorTickEnabled() &&
				this.ActorInternal.SetActorTickEnabled(!1),
			t
		);
	}
	EnableActor(t) {
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"EnableActor",
					["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					["PbDataId", this.CreatureData?.GetPbDataId()],
					["Handle", t],
				),
			(t = this.DisableActorHandle.Enable(t, this.constructor.name)) &&
				this.ActorInternal?.IsValid() &&
				this.ActorInternal.bHidden !== !this.DisableActorHandle.Empty)
		) {
			const t = () => {
				var t = this.DisableActorHandle.Empty;
				this.ActorInternal.SetActorHiddenInGame(!t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSetActorHidden,
						this.Entity.Id,
						t,
					);
			};
			this.Entity.GetComponent(99)
				? TimerSystem_1.TimerSystem.Next(() => {
						this.ActorInternal?.IsValid() && t();
					})
				: t();
		}
		return t;
	}
	EnableCollision(t) {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"EnableCollision",
					["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
					["PbDataId", this.CreatureData?.GetPbDataId()],
					["Handle", t],
				),
			(t = this.DisableCollisionHandle.Enable(t, this.constructor.name)) &&
				this.ActorInternal?.IsValid() &&
				this.ActorInternal.bActorEnableCollision !==
					this.DisableCollisionHandle.Empty &&
				this.ActorInternal.SetActorEnableCollision(
					this.DisableCollisionHandle.Empty,
				),
			t
		);
	}
	EnableTick(t) {
		return (
			(t = this.DisableTickHandle.Enable(t, this.constructor.name)) &&
				this.ActorInternal?.IsValid() &&
				this.ActorInternal.IsActorTickEnabled() !==
					this.DisableTickHandle.Empty &&
				this.ActorInternal.SetActorTickEnabled(this.DisableTickHandle.Empty),
			t
		);
	}
	DumpDisableActorInfo() {
		return this.DisableActorHandle.DumpDisableInfo();
	}
	DumpDisableCollisionInfo() {
		return this.DisableCollisionHandle.DumpDisableInfo();
	}
	DumpDisableTickInfo() {
		return this.DisableTickHandle.DumpDisableInfo();
	}
	SetActorVisible(t, e) {
		t
			? this.nnn && (this.EnableActor(this.nnn), (this.nnn = void 0))
			: this.nnn || (this.nnn = this.DisableActor(e));
	}
	SetCollisionEnable(t, e) {
		t
			? this.snn && (this.EnableCollision(this.snn), (this.snn = void 0))
			: this.snn || (this.snn = this.DisableCollision(e));
	}
	SetTickEnable(t, e) {
		t
			? this.ann && (this.EnableTick(this.ann), (this.ann = void 0))
			: this.ann || (this.ann = this.DisableTick(e));
	}
	OnClear() {
		return (
			this.unn(!0),
			this.CreatureDataInternal &&
				(this.CreatureDataInternal.Reset(),
				(this.CreatureDataInternal = void 0)),
			this.DisableActorHandle.Clear(),
			this.DisableCollisionHandle.Clear(),
			this.DisableTickHandle.Clear(),
			this.ResetAllCachedTime(),
			!0
		);
	}
	GetSocketTransform(t) {
		return this.ActorTransform;
	}
	GetSocketLocation(t) {
		return this.ActorLocation;
	}
};
(BaseActorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(1)],
	BaseActorComponent,
)),
	(exports.BaseActorComponent = BaseActorComponent);
