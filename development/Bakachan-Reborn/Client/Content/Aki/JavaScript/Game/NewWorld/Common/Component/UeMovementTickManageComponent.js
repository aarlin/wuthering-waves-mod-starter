"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			s = arguments.length,
			r =
				s < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, o, n);
		else
			for (var h = e.length - 1; 0 <= h; h--)
				(i = e[h]) && (r = (s < 3 ? i(r) : 3 < s ? i(t, o, r) : i(t, o)) || r);
		return 3 < s && r && Object.defineProperty(t, o, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UeMovementTickManageComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils");
let UeMovementTickManageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.s3o = void 0),
			(this.oRe = void 0),
			(this.Osn = void 0),
			(this.ksn = void 0),
			(this.Fsn = Vector_1.Vector.Create()),
			(this.Vsn = !1),
			(this.Frozen = !1),
			(this.Hsn = 0),
			(this.OnEntityBudgetTickEnableChange = (e) => {
				this.oRe?.Valid && e && this.oRe.ConsumeRootMotion();
			});
	}
	static get Dependencies() {
		return [3];
	}
	get ForbiddenTickPose() {
		return this.Vsn;
	}
	set ForbiddenTickPose(e) {
		this.Vsn !== e && ((this.Vsn = e), (this.s3o.bForbiddenTickPose = e));
	}
	OnInit() {
		return !0;
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(3)),
			(this.Osn = this.Entity.GetComponent(36)),
			(this.s3o = this.Hte.Owner.GetComponentByClass(
				UE.CharacterMovementComponent.StaticClass(),
			)),
			(this.ksn = this.Entity.GetComponent(27)),
			!!this.s3o &&
				(this.s3o.SetKuroOnlyTickOutside(!0),
				this.s3o.SetComponentTickEnabled(!1),
				(this.oRe = this.Entity.GetComponent(160)),
				(this.ForbiddenTickPose = 1 < this.Entity.GetTickInterval()),
				(this.Hsn = Time_1.Time.Frame),
				!0)
		);
	}
	OnDisable() {
		this.Hte?.Actor && (this.Hte.Actor.BasedMovement.MovementBase = void 0),
			this.Hte?.IsRoleAndCtrlByMe &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Movement",
					6,
					"UeMovementTickManageComponent Disable",
					["Entity", this.Entity.Id],
					["DisableInfo", this.DumpDisableInfo()],
				);
	}
	OnEnable() {
		this.Hte?.IsRoleAndCtrlByMe &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Enable", [
				"Entity",
				this.Entity.Id,
			]),
			(this.Hsn = Time_1.Time.Frame);
	}
	OnTick(e) {
		var t, o, n;
		this.Hte?.IsRoleAndCtrlByMe &&
			1 < Time_1.Time.Frame - this.Hsn &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Movement",
				6,
				"[b1057126] 角色更新异常",
				["DebugLastTickFrame", this.Hsn],
				["Current", Time_1.Time.Frame],
			),
			(this.Hsn = Time_1.Time.Frame),
			this.s3o &&
				(this.ksn && this.ksn.MarkDebugRecord("移动组件更新前 "),
				this.Osn.ConsumeForceFallingSpeed(),
				(t = this.Hte.Owner.CustomTimeDilation),
				this.Osn.CanMove &&
					!this.Osn.IsSpecialMove &&
					((o = 1 < this.Entity.GetTickInterval()),
					(this.ForbiddenTickPose = o || this.Frozen),
					o && this.oRe?.Valid && this.Hte.Owner.WasRecentlyRenderedOnScreen()
						? ((n = this.oRe.GetMeshTransform()),
							this.Fsn.DeepCopy(this.Hte.ActorLocationProxy),
							this.s3o.KuroTickComponentOutside(
								e * MathUtils_1.MathUtils.MillisecondToSecond * t,
							),
							this.Hte.ResetAllCachedTime(),
							this.Fsn.Equals(this.Hte.ActorLocationProxy) ||
								this.oRe.SetModelBuffer(n, e))
						: ((n = o ? e : Time_1.Time.DeltaTime),
							this.s3o.KuroTickComponentOutside(
								n * MathUtils_1.MathUtils.MillisecondToSecond * t,
							),
							this.Hte.ResetAllCachedTime())),
				this.Osn.ApplyForceSpeedAndRecordSpeed(),
				this.ksn) &&
				this.ksn.MarkDebugRecord("移动组件更新后");
	}
};
(UeMovementTickManageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(98)],
	UeMovementTickManageComponent,
)),
	(exports.UeMovementTickManageComponent = UeMovementTickManageComponent);
