"use strict";
var CharacterLockOnComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, r, o) {
			var i,
				a = arguments.length,
				n =
					a < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, r))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				n = Reflect.decorate(t, e, r, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(n = (a < 3 ? i(n) : 3 < a ? i(e, r, n) : i(e, r)) || n);
			return 3 < a && n && Object.defineProperty(e, r, n), n;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterLockOnComponent =
		exports.LockOnInfo =
		exports.ShowTargetInfo =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	Time_1 = require("../../../../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
	CameraController_1 = require("../../../../../Camera/CameraController"),
	CameraUtility_1 = require("../../../../../Camera/CameraUtility"),
	FightCameraLogicComponent_1 = require("../../../../../Camera/FightCameraLogicComponent"),
	TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	StatDefine_1 = require("../../../../../Common/StatDefine"),
	Global_1 = require("../../../../../Global"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	CharacterController_1 = require("../../../CharacterController"),
	CampUtils_1 = require("../../Blueprint/Utils/CampUtils"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	LockOnDebug_1 = require("./LockOnDebug"),
	PROFILE_KEY = "CharacterLockOnComponent_IsBlock",
	DELAY_TIME = 1e3,
	CHECK_COUNT = 3,
	RESET_FOCUS_TIME = 0.6,
	RESET_TARGETS_ISLOCK_TIME = 1e4,
	DEFAULT_LOCKON_CONFIG_ID = 0,
	OFFSET = 250;
class ShowTargetInfo {
	constructor() {
		(this.ShowTarget = void 0), (this.SocketName = ""), (this.LastSetTime = -0);
	}
}
exports.ShowTargetInfo = ShowTargetInfo;
class LockOnInfo {
	constructor() {
		(this.EntityHandle = void 0), (this.SocketName = "");
	}
	Copy(t) {
		(this.EntityHandle = t.EntityHandle), (this.SocketName = t.SocketName);
	}
	Equal(t) {
		return (
			this.EntityHandle?.Id === t.EntityHandle?.Id &&
			this.SocketName === t.SocketName
		);
	}
	Different(t) {
		return (
			this.EntityHandle !== t.EntityHandle ||
			(this.SocketName !== t.SocketName && !!this.SocketName)
		);
	}
}
exports.LockOnInfo = LockOnInfo;
class CustomizedLockedQueue {
	constructor() {
		this.Z$o = [];
	}
	Has(t) {
		return !!t && this.Z$o.some((e) => e.Equal(t));
	}
	Push(t) {
		t && !this.Has(t) && this.Z$o.push(t);
	}
	Pop() {
		return this.Z$o.shift();
	}
	Clear() {
		this.Z$o.length = 0;
	}
}
let CharacterLockOnComponent = (CharacterLockOnComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.ActorComp = void 0),
			(this.NextUpdateTime = 0),
			(this.ResetTargetLocation = Vector_1.Vector.Create()),
			(this.ResetAddRotator = Rotator_1.Rotator.Create()),
			(this.o$r = void 0),
			(this.r$r = void 0),
			(this.n$r = ""),
			(this.s$r = void 0),
			(this.a$r = void 0),
			(this.h$r = 0),
			(this.Xte = void 0),
			(this.mbr = void 0),
			(this.PSo = void 0),
			(this.l$r = void 0),
			(this._$r = void 0),
			(this.u$r = void 0),
			(this.c$r = !1),
			(this.f7o = Vector_1.Vector.Create()),
			(this.Tz = Vector_1.Vector.Create()),
			(this.Dz = Quat_1.Quat.Create()),
			(this.Xyn = Vector2D_1.Vector2D.Create()),
			(this.m$r = Vector_1.Vector.Create()),
			(this.d$r = Vector_1.Vector.Create()),
			(this.C$r = 0),
			(this.g$r = 0),
			(this.f$r = !1),
			(this.p$r = 0),
			(this.uoe = void 0),
			(this.v$r = (t) => {
				this.o$r?.EntityHandle?.Id === t && this.xDn();
			}),
			(this.zpe = (t, e) => {
				this.o$r?.EntityHandle === e && this.xDn();
			}),
			(this.W3r = (t) => {
				(t = t.GetComponent(29)),
					(this.c$r = t.c$r),
					this.E$r(t.o$r),
					(this.s$r = t.s$r),
					this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
			}),
			(this.y$r = void 0),
			(this.$Vs = void 0),
			(this.T$r = void 0),
			(this.L$r = void 0),
			(this.D$r = (t, e) => {
				var r;
				e
					? this.M$r && (this.a$r = this.o$r)
					: ((e = this.a$r?.EntityHandle?.Entity),
						this.a$r &&
							e?.Valid &&
							(e = e.GetComponent(3))?.Valid &&
							(r =
								ModelManager_1.ModelManager?.CameraModel?.FightCamera
									?.LogicComponent)?.CheckPositionInScreen(
								e.ActorLocationProxy,
								r.CameraAdjustController.CheckInScreenMinX,
								r.CameraAdjustController.CheckInScreenMaxX,
								r.CameraAdjustController.CheckInScreenMinY,
								r.CameraAdjustController.CheckInScreenMaxY,
							) &&
							(this.M$r
								? (this.E$r(this.a$r),
									this.SetShowTarget(
										this.o$r.EntityHandle,
										this.o$r.SocketName,
									),
									CharacterLockOnComponent_1.R$r.Push(this.o$r))
								: this.EnterLockDirection(),
							(this.a$r = void 0)));
			}),
			(this.A$r = !1),
			(this.cVr = Vector_1.Vector.Create()),
			(this.U$r = void 0),
			(this.P$r = !1);
	}
	E$r(t) {
		var e = this.o$r;
		(this.o$r = t),
			(e?.EntityHandle === t?.EntityHandle &&
				e?.SocketName === t?.SocketName) ||
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						29,
						"CharacterLockOnComponent.SetCurrentInfo",
						["Me", this.Entity.Id],
						["Target", t?.EntityHandle?.Id],
						["TargetSocket", t?.SocketName],
					));
	}
	GetCurrentTarget() {
		return this.o$r?.EntityHandle;
	}
	GetCurrentTargetSocketName() {
		return this.o$r?.SocketName ?? "";
	}
	GetTargetInfo() {
		return (
			(this.u$r.ShowTarget = this.ShowTarget),
			(this.u$r.SocketName = this.ShowTargetSocket),
			(this.u$r.LastSetTime = this.h$r),
			this.u$r
		);
	}
	get ShowTarget() {
		return this.r$r;
	}
	get ShowTargetSocket() {
		return this.n$r;
	}
	SetShowTarget(t, e = "") {
		this.h$r = Time_1.Time.WorldTime;
		var r = t?.Entity?.GetComponent(3);
		if (this.ShowTarget !== t || this.ShowTargetSocket !== e) {
			if (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						29,
						"CharacterLockOnComponent.SetShowTarget",
						["Me", this.Entity.Id],
						["Target", t?.Id],
						["TargetSocket", e],
					),
				void 0 === t)
			)
				return (
					(this.r$r = void 0),
					(this.n$r = ""),
					GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
						void 0,
					),
					!1
				);
			(this.r$r = t),
				(this.n$r = e),
				r &&
					GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(
						r.Actor,
					);
		}
		return !0;
	}
	x$r(t, e = "") {
		var r, o;
		return (
			!this.M$r &&
			!this.Xte.HasTag(2066208190) &&
			(t?.Valid && t.Entity.Active
				? (r = t.Entity.GetComponent(3))
					? e
						? !!(o = r.LockOnParts.get(e)) &&
							!!o.SoftLockValid &&
							this.SetShowTarget(t, e)
						: !r.LockOnParts.size && this.SetShowTarget(t, e)
					: this.SetShowTarget(t, e)
				: this.SetShowTarget(void 0))
		);
	}
	static get Dependencies() {
		return [158];
	}
	xDn() {
		this.c$r
			? this.ForceLookAtTarget(void 0, !1, !0)
			: this.M$r
				? this.S$r(!0)
				: (this.E$r(void 0), this.SetShowTarget(void 0));
	}
	OnInitData() {
		return (
			(this.u$r = new ShowTargetInfo()), (this.U$r = new UE.Vector2D(0, 0)), !0
		);
	}
	OnInit() {
		return (
			(this.NextUpdateTime = 0),
			(this.y$r = void 0),
			(this.$Vs = void 0),
			(this.T$r = void 0),
			!(this.L$r = void 0)
		);
	}
	OnStart() {
		this.ActorComp = this.Entity.CheckGetComponent(3);
		var t = this.Entity.GetComponent(0);
		return (
			this.SetLockOnConfig(
				t.GetRoleConfig().LockOnDefaultId,
				t.GetRoleConfig().LockOnLookOnId,
			),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			(this.mbr = this.Entity.CheckGetComponent(158)),
			(this.PSo = this.Entity.CheckGetComponent(52)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.v$r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			this.Xte.ListenForTagAddOrRemove(483118073, this.D$r),
			this.koe(),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.v$r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			!0
		);
	}
	koe() {
		(this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.uoe.WorldContextObject = this.ActorComp.Actor),
			(this.uoe.bIsSingle = !0),
			(this.uoe.bIgnoreSelf = !0),
			this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
			this.f$r &&
				((this.uoe.DrawTime = 5),
				this.uoe.SetDrawDebugTrace(2),
				TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					this.uoe,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					this.uoe,
					ColorUtils_1.ColorUtils.LinearRed,
				));
	}
	SetLockOnConfig(t, e) {
		0 !== t &&
			(this.l$r = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t)),
			0 !== e &&
				(this._$r =
					ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e));
	}
	OnTick(t) {
		this.w$r(),
			this.XVs(),
			this.Ii(t),
			this.b$r(t),
			this.q$r(),
			LockOnDebug_1.LockOnDebug.Tick(this.Entity);
	}
	Ii(t) {
		this.j$r(this.o$r?.EntityHandle)
			? (this.M$r || this.c$r) &&
				((this.g$r += t),
				this.g$r < 1e3 ||
					((this.g$r = 0),
					this.J4r(this.o$r)
						? (this.C$r++, this.C$r >= 3 && (this.YVs(), (this.C$r = 0)))
						: (this.C$r = 0)))
			: this.YVs();
	}
	YVs() {
		this.E$r(void 0),
			this.SetShowTarget(void 0),
			this.ExitLockDirection(),
			this.ForceLookAtTarget(void 0, !1);
	}
	b$r(t) {
		this.M$r &&
			((this.p$r += t),
			this.p$r < 1e4 ||
				((this.p$r = 0),
				CharacterLockOnComponent_1.R$r.Clear(),
				CharacterLockOnComponent_1.R$r.Push(this.o$r)));
	}
	SelectSoftLockTarget(t = 0, e = 0, r = 4, o = !1) {
		if (!this.M$r && !this.c$r)
			if (0 !== e) this.o$r || this.SelectSoftLockTarget();
			else {
				let e = this.l$r;
				0 !== t &&
					(e = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t)),
					this.G$r(e, r),
					o &&
						this.x$r(
							this.GetCurrentTarget(),
							this.GetCurrentTargetSocketName(),
						);
			}
	}
	G$r(t, e) {
		var r = this.N$r(t, !1);
		let o;
		(o = o || this.O$r(this.k$r(r, !1), e, !1, t.ToleranceAngle)),
			this.E$r(o),
			o?.EntityHandle?.Valid && LockOnDebug_1.LockOnDebug.SetDebugArrow(o);
	}
	O$r(t, e, r, o) {
		let i,
			a = !1;
		switch (e) {
			case 0:
				(a = !this.P$r),
					(this.P$r = !1),
					(i = this.cVr.IsNearlyZero() ? this.F$r() : this.cVr);
				break;
			case 1:
				i = this.ActorComp.ActorForwardProxy;
				break;
			case 2:
				(i = this.F$r()), (a = !0);
				break;
			case 3:
				break;
			case 4:
				i = this.F$r();
		}
		let n,
			s,
			h = Number.MAX_VALUE,
			c = Number.MAX_VALUE;
		for (const e of t) {
			switch (this.V$r(e, r, a)) {
				case 0:
					continue;
				case 1:
					break;
				case 2:
					return (
						LockOnDebug_1.LockOnDebug.SetDebugString(e, 0, 0, this.cVr, i), e
					);
			}
			this.GetSkillBoneLocation(e.EntityHandle, e.SocketName, this.f7o);
			var l = this.ActorComp.ActorLocationProxy,
				C = Vector_1.Vector.Dist(l, this.f7o);
			let t = 0;
			i &&
				(this.Tz.DeepCopy(i),
				this.Tz.Normalize(),
				this.Tz.Multiply(250, this.Tz),
				l.Subtraction(this.Tz, this.Tz),
				this.f7o.Subtraction(this.Tz, this.f7o),
				(t = this.H$r(i, this.f7o))),
				t < o
					? (!n || C < h) && ((n = e), (h = C))
					: (!s || C < c) && ((s = e), (c = C)),
				LockOnDebug_1.LockOnDebug.SetDebugString(e, t, C, this.cVr, i);
		}
		return n || s;
	}
	V$r(t, e, r) {
		return e && CharacterLockOnComponent_1.R$r.Has(t)
			? 0
			: r && this.j$r(this.o$r?.EntityHandle) && this.o$r?.Equal(t)
				? 2
				: 1;
	}
	F$r() {
		var t = Vector_1.Vector.Create();
		return (
			CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(
				Vector_1.Vector.ForwardVectorProxy,
				t,
			),
			t
		);
	}
	H$r(t, e, r = !1) {
		return (
			Math.acos(
				r
					? t.DotProduct(e) / Math.sqrt(t.SizeSquared() * e.SizeSquared())
					: t.CosineAngle2D(e),
			) * MathUtils_1.MathUtils.RadToDeg
		);
	}
	ForceLookAtTarget(t, e, r = !1) {
		var o = this.c$r;
		if (e) {
			if (
				((this.c$r = !0),
				this.M$r &&
					(this.c$r || (this.s$r = this.o$r), !t?.Different(this.o$r)))
			)
				return;
			this.mbr.SetDirectionState(
				CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
			),
				this.E$r(t),
				this.SetShowTarget(t?.EntityHandle, t?.SocketName);
		} else
			this.c$r &&
				!t?.Different(this.o$r) &&
				(this.j$r(this.s$r?.EntityHandle) && r
					? (this.E$r(this.s$r),
						this.SetShowTarget(this.s$r.EntityHandle, this.s$r.SocketName),
						CharacterLockOnComponent_1.R$r.Push(this.s$r),
						this.mbr.SetDirectionState(
							CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
						))
					: (this.M$r && this.j$r(this.o$r?.EntityHandle)) ||
						(this.E$r(void 0),
						this.SetShowTarget(void 0),
						this.mbr.SetDirectionState(
							CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
						)),
				(this.c$r = !1),
				(this.s$r = void 0));
		o !== this.c$r &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				29,
				"CharacterLockOnComponent.ForceLookAtTarget",
				["isLookAt", e],
				["Me", this.Entity.Id],
				["Target", t?.EntityHandle?.Id],
				["TargetSocket", t?.SocketName],
			);
	}
	EnterLockDirection() {
		if (this.c$r)
			(this.s$r = void 0), CharacterLockOnComponent_1.R$r.Push(this.o$r);
		else {
			if (this.M$r) return;
			if (this.Xte.HasTag(428837378)) return;
			if (this.Xte.HasTag(2066208190)) return;
			if (
				CameraController_1.CameraController.FightCamera.LogicComponent
					.IsDisableResetFocus
			)
				return;
			if ((this.S$r(!0), !this.o$r)) return void this.ResetFocus();
			this.C$r = 0;
		}
		this.mbr.SetDirectionState(
			CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection,
		);
	}
	ExitLockDirection() {
		this.M$r &&
			(this.c$r
				? (this.mbr.SetDirectionState(
						CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection,
					),
					(this.s$r = void 0))
				: (this.SetShowTarget(void 0),
					CharacterLockOnComponent_1.R$r.Clear(),
					this.mbr.SetDirectionState(
						CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
					)));
	}
	ResetFocus() {
		CameraController_1.CameraController.FightCamera.LogicComponent
			.IsDisableResetFocus ||
			!ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus ||
			this.c$r ||
			this.M$r ||
			CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
				CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(),
				0.6,
			);
	}
	ResetPitch(t = 0.6, e = void 0) {
		var r =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"InitialCameraPitch",
				),
			o =
				CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.ToUeRotator().Euler();
		r = Rotator_1.Rotator.Create(r, o.Z, o.X);
		CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
			r,
			t,
			e,
		);
	}
	W$r(t) {
		return (
			!!t?.Valid &&
			((t = t.Entity.GetComponent(0).GetEntityType()),
			!![
				Protocol_1.Aki.Protocol.wks.Proto_Monster,
				Protocol_1.Aki.Protocol.wks.Proto_Npc,
				Protocol_1.Aki.Protocol.wks.Proto_Player,
				Protocol_1.Aki.Protocol.wks.Proto_Vision,
			].includes(t))
		);
	}
	XVs() {
		var t;
		this.c$r ||
			(this.Xte.HasTag(2066208190)
				? this.YVs()
				: this.o$r?.EntityHandle?.Valid &&
					(this.M$r
						? ((t = this.f7o),
							this.GetSkillBoneLocation(
								this.o$r.EntityHandle,
								this.o$r.SocketName,
								t,
							),
							(this.K$r(this.o$r.EntityHandle) ||
								this.Q$r(this._$r, this.o$r.EntityHandle, t)) &&
								this.ExitLockDirection())
						: (this.X$r(this.o$r.EntityHandle) ||
								this.Q$r(
									this._$r,
									this.o$r.EntityHandle,
									this.o$r.EntityHandle.Entity.GetComponent(1)
										.ActorLocationProxy,
								)) &&
							(this.E$r(void 0), this.SetShowTarget(void 0))));
	}
	GetSkillBoneLocation(t, e, r) {
		var o = t?.Entity?.GetComponent(1);
		o
			? (t = t?.Entity?.GetComponent(3)?.Actor)?.IsValid() &&
				e &&
				((t = t.Mesh),
				(e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
				t?.DoesSocketExist(e))
				? r.FromUeVector(t.GetSocketTransform(e, 0).GetLocation())
				: r.DeepCopy(o.ActorLocationProxy)
			: r.Reset();
	}
	LockOnSpecifyTarget(t) {
		var e;
		this.M$r ||
			this.c$r ||
			(this.j$r(t) &&
				(((e = new LockOnInfo()).EntityHandle = t),
				this.E$r(e),
				this.SetShowTarget(t)));
	}
	j$r(t) {
		var e;
		return !(
			!t?.Valid ||
			!t?.IsInit ||
			!t?.Entity?.Active ||
			((e = t.Entity.GetComponent(1)) && e.ActorLocationProxy.ContainsNaN()) ||
			(e = t.Entity.GetComponent(0))?.GetRemoveState() ||
			!e?.GetVisible() ||
			((e = t.Entity.GetComponent(185)) &&
				e.HasAnyTag([1008164187, -1243968098]))
		);
	}
	J4r(t) {
		this.m$r.FromUeVector(
			Global_1.Global.CharacterCameraManager.K2_GetActorLocation(),
		);
		var e = t.EntityHandle.Entity.GetComponent(1);
		return (
			t.SocketName
				? this.GetSkillBoneLocation(t.EntityHandle, t.SocketName, this.d$r)
				: (this.d$r.DeepCopy(e.ActorLocationProxy),
					(t =
						t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()
							?.LockOffset) &&
						((t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
						this.d$r.Addition(t, this.d$r))),
			this.TraceDetectBlock(this.m$r, this.d$r, e.Owner)
		);
	}
	TraceDetectBlock(t, e, r) {
		return (
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e),
			!(
				!TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.uoe,
					PROFILE_KEY,
				) || !this.uoe.HitResult.bBlockingHit
			) &&
				((t = this.uoe.HitResult.Actors.Get(0)),
				(e =
					ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(
						t,
					)),
				r !== t) &&
				r !== e
		);
	}
	S$r(t) {
		t && CharacterLockOnComponent_1.R$r.Clear();
		for (
			var e = this.N$r(this._$r, !0);
			e.length && e.every((t) => CharacterLockOnComponent_1.R$r.Has(t));
		)
			CharacterLockOnComponent_1.R$r.Pop();
		(t = this.O$r(this.k$r(e, !0), 4, !0, this._$r.ToleranceAngle)),
			this.E$r(t),
			t
				? (CharacterLockOnComponent_1.R$r.Push(t),
					this.SetShowTarget(t.EntityHandle, t.SocketName),
					(this.p$r = 0),
					t?.EntityHandle?.Valid && LockOnDebug_1.LockOnDebug.SetDebugArrow(t))
				: (this.SetShowTarget(void 0), this.ExitLockDirection());
	}
	N$r(t, e) {
		LockOnDebug_1.LockOnDebug.Clear();
		var r = [],
			o = Vector_1.Vector.Create();
		CameraController_1.CameraController.CameraRotator &&
			CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(
				Vector_1.Vector.ForwardVectorProxy,
				o,
			),
			(o.Z = 0),
			o.Normalize(MathUtils_1.MathUtils.SmallNumber);
		for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
			if (this.j$r(o) && o.Id !== this.Entity.Id) {
				var i = o.Entity.GetComponent(0)?.GetEntityType(),
					a = CharacterController_1.CharacterController.GetActor(o);
				if (a?.IsValid()) {
					var n = a,
						s = ((a = a instanceof TsBaseCharacter_1.default), this.W$r(o));
					if (s) {
						if (
							2 !==
							CampUtils_1.CampUtils.GetCampRelationship(
								n.Camp,
								this.ActorComp.Actor.Camp,
							)
						)
							continue;
						if (!n || !a) continue;
					} else {
						if (e) continue;
						if (i !== Protocol_1.Aki.Protocol.wks.Proto_SceneItem) continue;
						if (((n = o.Entity.GetComponent(102)?.LockRange), !n || -1 === n))
							continue;
						if (
							n * n <
							Vector_1.Vector.DistSquared(
								o.Entity.GetComponent(1).ActorLocationProxy,
								this.ActorComp.ActorLocationProxy,
							)
						)
							continue;
					}
					if (e ? !this.K$r(o) : !this.X$r(o)) {
						if (
							((a = o.Entity.GetComponent(3)), 0 < (a?.LockOnParts?.size ?? 0))
						) {
							let e = !1;
							i = a.LockOnParts.values();
							var h = this.f7o;
							for (const r of i)
								if (
									(this.GetSkillBoneLocation(o, r.BoneNameString, h),
									!(e = this.Q$r(t, o, h)))
								)
									break;
							if (e) continue;
						} else if (
							this.Q$r(t, o, o.Entity.GetComponent(1).ActorLocationProxy)
						)
							continue;
						if (s)
							if (((n = o.Entity.GetComponent(3)), n?.LockOnParts.size)) {
								var c,
									l = o.Entity.GetComponent(58),
									C = o.Entity.GetComponent(33);
								for ([, c] of n.LockOnParts)
									if (
										(e ? c.HardLockValid : c.SoftLockValid) &&
										(!C || !C.IgnoreSocketName.has(c.BoneNameString))
									) {
										if (l && c.EnablePartName) {
											var m = l.PartMapByBone.get(c.EnablePartName);
											if (m && !m.Active) continue;
										}
										((m = new LockOnInfo()).EntityHandle = o),
											(m.SocketName = c.BoneNameString),
											LockOnDebug_1.LockOnDebug.Push(m),
											this.J4r(m) || r.push(m);
									}
							} else
								((a = new LockOnInfo()).EntityHandle = o),
									LockOnDebug_1.LockOnDebug.Push(a),
									this.J4r(a) || r.push(a);
						else
							((i = new LockOnInfo()).EntityHandle = o),
								LockOnDebug_1.LockOnDebug.Push(i),
								this.J4r(i) || r.push(i);
					}
				}
			}
		return r;
	}
	k$r(t, e) {
		var r = t.filter((t) =>
			t.EntityHandle?.Entity?.GetComponent(185)?.HasTag(1659143519),
		);
		return e
			? r.every((t) => CharacterLockOnComponent_1.R$r.Has(t))
				? t
				: r
			: r.length
				? r
				: t;
	}
	K$r(t) {
		return (
			!!t?.Valid &&
			!!(t = t.Entity?.GetComponent(185))?.Valid &&
			(t.HasAnyTag([-1243968098, -620990172]) ||
				this.Xte.HasAnyTag([-620990172, 63495198]))
		);
	}
	X$r(t) {
		return (
			!!t?.Valid &&
			!!(t = t.Entity?.GetComponent(185))?.Valid &&
			(t.HasAnyTag([-1243968098, -1092371289]) ||
				this.Xte.HasAnyTag([-1092371289, 63495198]))
		);
	}
	Q$r(t, e, r) {
		return (
			!this.$$r(t, this.ActorComp.ActorLocationProxy, r) &&
			!this.Y$r(e, r, this.ActorComp.ActorLocationProxy)
		);
	}
	$$r(t, e, r) {
		var o = e.Z - r.Z;
		return (
			!(o < -t.UpDistance || o > t.DownDistance) &&
			(Vector_1.Vector.DistSquared(e, r) <= t.Distance * t.Distance ||
				(!!(o = this.ActorComp.Actor.Controller) &&
					((o = ((o.GetControlRotation().Yaw % 360) + 360) % 360),
					!(
						Vector_1.Vector.DistSquared(e, r) >
						t.SectorRadius * t.SectorRadius
					) &&
						(r
							.Subtraction(e, this.f7o)
							.Normalize(MathUtils_1.MathUtils.SmallNumber),
						(r = (180 * Math.atan2(this.f7o.Y, this.f7o.X)) / Math.PI),
						(180 < (e = Math.abs(((360 + r) % 360) - o)) ? 360 - e : e) <=
							t.SectorAngle / 2))))
		);
	}
	Y$r(t, e, r) {
		var o;
		return (
			!!t.Entity?.GetComponent(185)?.HasAnyTag([-336338240, -164894127]) &&
			!!(t = t.Entity.GetComponent(3))?.LockOnConfig &&
			!(
				(o = e.Z - r.Z) < -t.LockOnConfig.UpDistance ||
				o > t.LockOnConfig.DownDistance ||
				Vector_1.Vector.DistSquared(e, r) >
					t.LockOnConfig.Distance * t.LockOnConfig.Distance
			)
		);
	}
	q$r() {
		var t = this.M$r;
		this.A$r !== t &&
			(CombatMessage_1.CombatNet.Call(
				t ? 20063 : 16772,
				this.Entity,
				(t
					? Protocol_1.Aki.Protocol.RNn
					: Protocol_1.Aki.Protocol.xNn
				).create(),
			),
			(this.A$r = t));
	}
	RefreshCurrentLockState(t) {
		var e;
		this.o$r?.EntityHandle === t &&
			(t = t?.Entity?.GetComponent(3)) &&
			(e = this.o$r?.SocketName) &&
			t.LockOnParts.has(e) &&
			((t = t.LockOnParts.get(e)).HardLockValid || this.ExitLockDirection(),
			t.SoftLockValid || this.SetShowTarget(void 0));
	}
	get M$r() {
		return this.Xte.HasTag(-1150819426);
	}
	w$r() {
		var t = this.PSo.GetMoveDirectionCache(),
			[e] = this.PSo.GetCameraInput();
		(0 === e && this.U$r.Equals(t, MathUtils_1.MathUtils.SmallNumber)) ||
			(this.U$r?.Set(t.X, t.Y),
			this.cVr.DeepCopy(this.ActorComp.InputDirectProxy),
			this.U$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) ||
			(this.P$r = !0),
			this.SpeedUpCleanTarget() && (this.P$r = !0);
	}
	SpeedUpCleanTarget() {
		var t = this.Entity.GetComponent(161);
		return !(
			!(
				t?.Valid &&
				t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD
			) || this.Xte.HasTag(-1371021686)
		);
	}
	ResetTarget() {
		!this.c$r && this.M$r && this.S$r(!1);
	}
	ChangeShowTarget(t, e, r) {
		if (this.c$r || !this.M$r) return !1;
		var o,
			i,
			a,
			n = this.N$r(this._$r, !0),
			s = this.ActorComp.ActorLocationProxy,
			h =
				(this.GetSkillBoneLocation(
					this.o$r.EntityHandle,
					this.o$r.SocketName,
					this.f7o,
				),
				this.Tz.DeepCopy(s),
				(this.Tz.Z = this.f7o.Z),
				this.f7o.SubtractionEqual(s),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					this.f7o,
					Vector_1.Vector.UpVectorProxy,
					this.Dz,
				),
				this.Dz.Inverse(this.Dz),
				t.SizeSquared());
		let c,
			l = MathUtils_1.MathUtils.LargeNumber;
		for (const s of n)
			!this.j$r(s.EntityHandle) ||
				s.Equal(this.o$r) ||
				(this.GetSkillBoneLocation(s.EntityHandle, s.SocketName, this.f7o),
				this.f7o.SubtractionEqual(this.Tz),
				this.Dz.RotateVector(this.f7o, this.f7o),
				Math.abs(this.f7o.X) < MathUtils_1.MathUtils.SmallNumber &&
					Math.abs(this.f7o.Y) < MathUtils_1.MathUtils.SmallNumber) ||
				((o =
					Math.atan2(this.f7o.Y, this.f7o.X) * MathUtils_1.MathUtils.RadToDeg),
				(i =
					Math.asin(this.f7o.Z / this.f7o.Size()) *
					MathUtils_1.MathUtils.RadToDeg),
				(this.Xyn.X = o),
				(this.Xyn.Y = i),
				(a = this.Xyn.DotProduct(t)) < 0) ||
				((a =
					(e *
						(Math.acos(a / Math.sqrt(this.Xyn.SizeSquared() * h)) *
							MathUtils_1.MathUtils.RadToDeg)) /
						180 +
					r * Math.sqrt(o * o + i * i)) < l &&
					((l = a), (c = s)));
		return (
			!!c && (this.E$r(c), this.SetShowTarget(c.EntityHandle, c.SocketName), !0)
		);
	}
});
(CharacterLockOnComponent.R$r = new CustomizedLockedQueue()),
	(CharacterLockOnComponent = CharacterLockOnComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(29)],
			CharacterLockOnComponent,
		)),
	(exports.CharacterLockOnComponent = CharacterLockOnComponent);
