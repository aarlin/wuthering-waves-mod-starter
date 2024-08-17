"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, i, n, e) {
		var s,
			o = arguments.length,
			r =
				o < 3
					? i
					: null === e
						? (e = Object.getOwnPropertyDescriptor(i, n))
						: e;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(t, i, n, e);
		else
			for (var h = t.length - 1; 0 <= h; h--)
				(s = t[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(i, n, r) : s(i, n)) || r);
		return 3 < o && r && Object.defineProperty(i, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityComponent = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	PerformanceDecorators_1 = require("../Performance/PerformanceDecorators"),
	Entity_1 = require("./Entity");
class EntityComponent {
	constructor() {
		(this.UnResetPropertySet = void 0),
			(this.PW = void 0),
			(this.vW = 0),
			(this.DW = new Map()),
			(this.m6 = void 0),
			(this._W = void 0),
			(this.uW = void 0),
			(this.cW = void 0),
			(this.mW = void 0),
			(this.dW = void 0),
			(this.xW = void 0),
			(this.wW = void 0),
			(this.BW = void 0),
			(this.bW = void 0),
			(this.qW = !1),
			(this.GW = !1),
			(this.oW = !1),
			(this.NW = !1),
			(this.rW = !1),
			(this.OW = !1),
			(this.kW = !1),
			(this.OnEntityWasRecentlyRenderedOnScreenChange = void 0),
			(this.OnEntityBudgetTickEnableChange = void 0),
			(this.qW = this.OnEnable !== EntityComponent.prototype.OnEnable),
			(this.GW = this.OnDisable !== EntityComponent.prototype.OnDisable),
			(this.oW = this.OnTick !== EntityComponent.prototype.OnTick),
			(this.NW = this.OnForceTick !== EntityComponent.prototype.OnForceTick),
			(this.rW = this.OnAfterTick !== EntityComponent.prototype.OnAfterTick),
			(this.OW =
				this.OnForceAfterTick !== EntityComponent.prototype.OnForceAfterTick),
			(this.kW =
				this.OnChangeTimeDilation !==
				EntityComponent.prototype.OnChangeTimeDilation);
		var t = this.constructor.name;
		let i = void 0;
		EntityComponent.UW.has(t)
			? (i = EntityComponent.UW.get(t))
			: ((i = [
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
					void 0,
				]),
				EntityComponent.UW.set(t, i)),
			([
				this.m6,
				this._W,
				this.uW,
				this.cW,
				this.mW,
				this.dW,
				this.xW,
				this.wW,
				this.BW,
				this.bW,
			] = i);
	}
	static get Dependencies() {}
	get Valid() {
		return !!this.Entity && this.Entity.IsCreate && !this.Entity.IsClear;
	}
	AW() {
		this.DW.clear(), (this.vW = 0), (this.PW = void 0);
	}
	get Entity() {
		return this.PW;
	}
	get Active() {
		return 0 === this.DW.size;
	}
	get NeedTick() {
		return this.oW;
	}
	get NeedForceTick() {
		return this.NW;
	}
	get NeedAfterTick() {
		return this.rW;
	}
	get NeedForceAfterTick() {
		return this.OW;
	}
	get TimeDilation() {
		return this.Entity.TimeDilation;
	}
	FW(t, i) {
		try {
			if (!t())
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件生命周期执行失败",
							["name", i],
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
						),
					!1
				);
		} catch (t) {
			return (
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Entity",
							1,
							"组件生命周期执行异常",
							t,
							["name", i],
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件生命周期执行异常",
							["name", i],
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t],
						),
				!1
			);
		}
		return !0;
	}
	VW(t, i, n) {
		return this.FW(t, n);
	}
	Create(t, i) {
		return (
			(this.PW = t),
			this.OnCreate === EntityComponent.prototype.OnCreate ||
				this.VW(() => this.OnCreate(i), this.m6, this.Create.name)
		);
	}
	Respawn(t, i) {
		return (
			(this.PW = t),
			this.OnCreate === EntityComponent.prototype.OnCreate ||
				this.VW(() => this.OnCreate(i), this.m6, this.Create.name)
		);
	}
	RespawnNew(t) {
		return (this.PW = t), !0;
	}
	InitData(t) {
		return this.OnInitData(t);
	}
	Init() {
		return (
			this.OnInit === EntityComponent.prototype.OnInit ||
			this.VW(() => this.OnInit(), this._W, this.OnInit.name)
		);
	}
	Deinit() {
		return (
			this.OnDeinit === EntityComponent.prototype.OnDeinit ||
			this.VW(() => this.OnDeinit(), this._W, this.OnDeinit.name)
		);
	}
	Clear() {
		var t;
		return this.OnClear === EntityComponent.prototype.OnClear
			? (this.AW(), !0)
			: ((t = this.VW(() => this.OnClear(), this.uW, this.OnClear.name)),
				this.AW(),
				t);
	}
	Start() {
		return (
			this.OnStart === EntityComponent.prototype.OnStart ||
			this.VW(() => !!this.OnStart(), this.cW, this.OnStart.name)
		);
	}
	Activate() {
		this.OnActivate !== EntityComponent.prototype.OnActivate &&
			this.VW(() => (this.OnActivate(), !0), this.dW, this.OnActivate.name);
	}
	End() {
		return (
			this.OnEnd === EntityComponent.prototype.OnEnd ||
			this.VW(() => this.OnEnd(), this.mW, this.OnEnd.name)
		);
	}
	Enable(t, i) {
		return t && this.DW.delete(t)
			? (this.qW &&
					this.Active &&
					this.FW(() => (this.OnEnable(), !0), this.OnEnable.name),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						1,
						"组件激活失败句柄不存在",
						["EntityId", this.Entity.Id],
						["EntityName", this.constructor.name],
						["Handle", t],
						["Reason", i],
					),
				!1);
	}
	Disable(t) {
		t
			? t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					3,
					"Disable的Reason字符串长度必须大于等于限制字符数量",
					["Component", this.constructor.name],
					["Reason", t],
					["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT],
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", [
					"Component",
					this.constructor.name,
				]);
		var i = this.Active,
			n = ++this.vW;
		return (
			this.DW.set(n, t),
			this.GW &&
				i &&
				this.FW(() => (this.OnDisable(t), !0), this.OnDisable.name),
			n
		);
	}
	Tick(t) {
		if (this.Active) {
			this.xW;
			try {
				this.OnTick(t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Entity",
							1,
							"组件 Tick 异常",
							t,
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件 Tick 异常",
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t],
						);
			}
		}
	}
	ForceTick(t) {
		if (this.Active)
			try {
				this.OnForceTick(t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Entity",
							1,
							"组件 ForceTick 异常",
							t,
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件 ForceTick 异常",
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t],
						);
			}
	}
	AfterTick(t) {
		if (this.Active)
			try {
				this.OnAfterTick(t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Entity",
							1,
							"组件 AfterTick 异常",
							t,
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件 AfterTick 异常",
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t],
						);
			}
	}
	ForceAfterTick(t) {
		if (this.Active)
			try {
				this.OnForceAfterTick(t);
			} catch (t) {
				t instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Entity",
							1,
							"组件 ForceAfterTick 异常",
							t,
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							1,
							"组件 ForceAfterTick 异常",
							["Id", this.Entity.Id],
							["entity", this.Entity.constructor.name],
							["component", this.constructor.name],
							["error", t],
						);
			}
	}
	SetTimeDilation(t) {
		this.kW &&
			this.FW(
				() => (this.OnChangeTimeDilation(t), !0),
				this.OnChangeTimeDilation.name,
			);
	}
	OnCreate(t) {
		return !0;
	}
	OnInitData(t) {
		return !0;
	}
	OnInit(t) {
		return !0;
	}
	OnDeinit(t) {
		return !0;
	}
	OnClear() {
		return !0;
	}
	OnStart() {
		return !0;
	}
	OnActivate() {}
	OnEnd() {
		return !0;
	}
	OnEnable() {}
	OnDisable(t) {}
	OnTick(t) {}
	OnForceTick(t) {}
	OnAfterTick(t) {}
	OnForceAfterTick(t) {}
	OnChangeTimeDilation(t) {}
	toString() {
		return `[object ${this.constructor.name}(Id=${this.Entity?.Id})${this.Valid ? "" : "(D)"}]`;
	}
	DumpDisableInfo() {
		var t,
			i,
			n = new Array();
		let e = "";
		for ([t, i] of this.DW)
			n.push(
				`${e}{Component:${this.constructor.name},Handle:${t},Reason:${i}}`,
			),
				(e = " ");
		return n.join("");
	}
	AddUnResetProperty(...t) {
		this.UnResetPropertySet || (this.UnResetPropertySet = new Set());
		for (const i of t)
			this.UnResetPropertySet.has(i) || this.UnResetPropertySet.add(i);
	}
}
(EntityComponent.Id = -1),
	(EntityComponent.UW = new Map()),
	__decorate(
		[(0, PerformanceDecorators_1.EntityComponentTickPerformanceEx)(!0)],
		EntityComponent.prototype,
		"Tick",
		null,
	),
	__decorate(
		[(0, PerformanceDecorators_1.EntityComponentTickPerformanceEx)(!1)],
		EntityComponent.prototype,
		"AfterTick",
		null,
	),
	(exports.EntityComponent = EntityComponent);
//# sourceMappingURL=EntityComponent.js.map
