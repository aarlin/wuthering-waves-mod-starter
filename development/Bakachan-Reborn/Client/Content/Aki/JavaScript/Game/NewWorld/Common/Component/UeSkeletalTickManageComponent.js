"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, i) {
		var n,
			s = arguments.length,
			r =
				s < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, o))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, o, i);
		else
			for (var c = e.length - 1; 0 <= c; c--)
				(n = e[c]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, o, r) : n(t, o)) || r);
		return 3 < s && r && Object.defineProperty(t, o, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UeSkeletalTickManageComponent = exports.UeSkeletalTickController =
		void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
	PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	Global_1 = require("../../../Global");
class UeSkeletalTickController {
	static AddManager(e) {
		this.Managers.add(e);
	}
	static DeleteManager(e) {
		this.Managers.delete(e);
	}
	static TickManagers(e) {
		for (const t of this.Managers) t.Active && t.ProxyTick(e);
	}
	static AfterTickManagers(e) {
		for (const t of this.Managers) t.Active && t.AfterProxyTick(e);
	}
}
(exports.UeSkeletalTickController = UeSkeletalTickController).Managers =
	new Set();
let UeSkeletalTickManageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.jsn = !1),
			(this.Hte = void 0),
			(this.b3r = -1),
			(this.Wsn = !1),
			(this.Ksn = 0),
			(this.Qsn = void 0),
			(this.TickType = 0),
			(this.Xsn = new Array()),
			(this.$sn = new Array());
	}
	get TickMode() {
		return this.Ksn;
	}
	set TickMode(e) {
		if (this.Ksn !== e) {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						6,
						"Set Skeletal TickMode",
						["Entity", this.Entity.Id],
						["TickMode", e],
					),
				1 === (this.Ksn = e))
			) {
				for (const e of this.Xsn)
					TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, e);
				for (const e of this.$sn)
					TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, e);
			} else {
				for (const e of this.Xsn)
					e
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Test",
								6,
								"HasSkeletalMesh",
								["EntityId", this.Entity.Id],
								["Actor", this.Hte?.Owner?.GetName()],
								["SkelMesh", e.GetName()],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Test",
								6,
								"NoSkeletalMesh",
								["EntityId", this.Entity.Id],
								["Actor", this.Hte?.Owner?.GetName()],
							),
						TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(e);
				for (const e of this.$sn)
					e
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Test",
								6,
								"HasSkeletalMesh",
								["EntityId", this.Entity.Id],
								["Actor", this.Hte?.Owner?.GetName()],
								["SkelMesh", e.GetName()],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Test",
								6,
								"NoSkeletalMesh",
								["EntityId", this.Entity.Id],
								["Actor", this.Hte?.Owner?.GetName()],
							),
						TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(e);
			}
			if (
				(1 === e || 2 === e
					? UeSkeletalTickController.AddManager(this)
					: UeSkeletalTickController.DeleteManager(this),
				4 === e)
			) {
				for (const e of this.Xsn)
					e.SetTickGroup(1),
						e.SetComponentTickEnabled(this.Active),
						e.SetKuroOnlyTickOutside(!1);
				for (const e of this.$sn)
					e.SetTickGroup(1),
						e.SetComponentTickEnabled(this.Active),
						e.SetKuroOnlyTickOutside(!1);
			} else {
				for (const e of this.Xsn)
					e.SetTickGroup(0),
						e.SetComponentTickEnabled(!1),
						e.SetKuroOnlyTickOutside(!0);
				for (const e of this.$sn)
					e.SetTickGroup(4),
						e.SetComponentTickEnabled(!1),
						e.SetKuroOnlyTickOutside(!0);
			}
		}
	}
	static get Dependencies() {
		return [1];
	}
	OnInit() {
		return !0;
	}
	OnActivate() {
		this.Hte = this.Entity.GetComponent(1);
		var e = this.Hte.Owner.K2_GetComponentsByClass(
				UE.SkeletalMeshComponent.StaticClass(),
			),
			t = e.Num();
		for (let i = 0; i < t; ++i) {
			var o = e.Get(i);
			o instanceof UE.SkeletalMeshComponent &&
				(o.MasterPoseComponent ? this.$sn : this.Xsn).push(o);
		}
		PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest
			? (this.TickMode = 1)
			: this.Ysn(),
			(this.TickType = 1),
			(this.Qsn = void 0);
	}
	OnEnd() {
		(this.TickMode = 0), (this.TickType = 0);
		for (const e of this.Xsn) e.SetComponentTickEnabled(!1);
		return !0;
	}
	OnTick(e) {
		if ((this.Ysn(), 3 === this.TickMode)) {
			this.b3r = Time_1.Time.Frame;
			var t =
				e *
				MathUtils_1.MathUtils.MillisecondToSecond *
				this.TimeDilation *
				(this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
			for (const e of this.Xsn)
				(2 === this.TickType && !this.CheckMainMesh(e)) ||
					e.KuroTickComponentOutside(t);
			if (2 !== this.TickType)
				for (const e of this.$sn) e.KuroTickComponentOutside(t);
		}
	}
	OnAfterTick(e) {
		if (this.jsn && ((this.jsn = !1), this.b3r !== Time_1.Time.Frame)) {
			var t = this.Hte.Owner.CustomTimeDilation,
				o = e * MathUtils_1.MathUtils.MillisecondToSecond * t;
			for (const e of this.Xsn) e.KuroTickComponentOutside(o);
		}
	}
	ProxyTick(e) {
		if (1 === this.TickType || 2 === this.TickType) {
			this.b3r = Time_1.Time.Frame;
			var t =
				e *
				this.TimeDilation *
				(this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
			for (const e of this.Xsn)
				(2 === this.TickType && !this.CheckMainMesh(e)) ||
					(e
						? e.KuroTickComponentOutside(t)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Test",
								6,
								"NoSkeletalMesh",
								["EntityId", this.Entity.Id],
								["Actor", this.Hte?.Owner?.GetName()],
							));
		}
	}
	AfterProxyTick(e) {
		if (1 === this.TickType) {
			this.b3r = Time_1.Time.Frame;
			var t =
				e *
				this.TimeDilation *
				(this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1);
			for (const e of this.$sn)
				e
					? e.KuroTickComponentOutside(t)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Test",
							6,
							"NoSkeletalMesh",
							["EntityId", this.Entity.Id],
							["Actor", this.Hte?.Owner?.GetName()],
						);
		}
	}
	OnEnable() {
		if ((3 !== this.TickMode && (this.jsn = !0), 4 === this.TickMode))
			for (const e of this.Xsn) e.SetComponentTickEnabled(!0);
	}
	OnDisable() {
		if (4 === this.TickMode)
			for (const e of this.Xsn) e.SetComponentTickEnabled(!1);
	}
	SetTakeOverTick(e) {
		(this.Wsn = e), this.Ysn();
	}
	SetLodBias(e) {
		for (const t of this.Xsn) t.SetLODBias(e);
	}
	SetSkeletalMeshTickType(e) {
		var t;
		return (
			this.TickType !== e &&
				((t = this.Hte?.CreatureData.GetPbDataId()),
				(this.TickType = e),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Character",
					51,
					"[SetSkeletalMeshTickType] 设置SkeletalMeshTickType",
					["Type", e],
					["PbDataId", t],
				),
			!0
		);
	}
	CheckMainMesh(e) {
		return !!e.IsValid() && "CharacterMesh0" === e.GetName();
	}
	Ysn() {
		this.Wsn
			? (this.TickMode = 3)
			: this.IsMainRole()
				? (this.TickMode = 2)
				: (this.TickMode = 1);
	}
	IsMainRole() {
		return this.Hte?.Owner === Global_1.Global.BaseCharacter;
	}
};
__decorate(
	[(0, PerformanceDecorators_1.TickEntitySkeletonProxyPerformance)()],
	UeSkeletalTickManageComponent.prototype,
	"ProxyTick",
	null,
),
	__decorate(
		[(0, PerformanceDecorators_1.TickEntitySkeletonProxyPerformance)()],
		UeSkeletalTickManageComponent.prototype,
		"AfterProxyTick",
		null,
	),
	(UeSkeletalTickManageComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(99)],
		UeSkeletalTickManageComponent,
	)),
	(exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent);
