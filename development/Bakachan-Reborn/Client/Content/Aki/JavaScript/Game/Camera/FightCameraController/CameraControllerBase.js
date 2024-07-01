"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraControllerBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class CameraControllerBase {
	constructor(e) {
		(this.BreakModifyArmLength = !1),
			(this.BreakModifyCameraOffset = !1),
			(this.BreakModifyArmRotation = !1),
			(this.BreakModifyFov = !1),
			(this.u1e = !0),
			(this.c1e = new Set()),
			(this.m1e = new Map()),
			(this.$ = new Map()),
			(this.d1e = new Map()),
			(this.C1e = new Map()),
			(this.g1e = new Set()),
			(this.OnChangeRole = (e, t) => {}),
			(this.Camera = e),
			this.OnInit();
	}
	SetConfigMap(e, t) {
		this.$.has(e) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", e]),
			this.g1e.has(t) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", t]),
			this.$.set(e, t),
			this.g1e.add(t);
	}
	SetCurveConfigMap(e, t) {
		this.C1e.has(e) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Camera", 6, "重复注册了Key", ["Key", e]),
			this.g1e.has(t) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Camera", 6, "重复注册了Value", ["value", t]),
			this.C1e.set(e, t),
			this.g1e.add(t);
	}
	f1e(e, t) {
		this[e] = t;
	}
	p1e(e, t) {
		this[e] = t;
	}
	SetDefaultConfigs(e, t) {
		for (let t = 0; t < e.Num(); t++) {
			var r = e.GetKey(t);
			this.m1e.set(e.GetKey(t), e.Get(r));
		}
		for (let e = 0; e < t.Num(); e++) {
			var i = t.GetKey(e);
			this.d1e.set(
				t.GetKey(e),
				CurveUtils_1.CurveUtils.CreateCurveByStruct(t.Get(i)),
			);
		}
	}
	SetConfigs(e, t) {
		if (e) {
			for (var [r, i] of e) (r = this.$.get(r)), this.f1e(r, i);
			for (var [a, s] of this.$)
				void 0 === this[s] &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							6,
							"CameraController缺少配置",
							["CameraType", this.constructor],
							["key", a],
							["value", s],
						),
					this.f1e(s, 1));
		}
		if (t) {
			for (var [o, n] of t) (o = this.C1e.get(o)), this.p1e(o, n);
			for (var [h, C] of this.C1e)
				void 0 === this[C] &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							6,
							"CameraController缺少曲线配置",
							["CameraType", this.constructor.name],
							["key", h],
							["value", C],
						),
					this.p1e(C, CurveUtils_1.CurveUtils.CreateCurve(0)));
		}
	}
	ResetDefaultConfig() {
		this.SetConfigs(this.m1e, this.d1e);
	}
	ResetBreakModifyInfo() {
		(this.BreakModifyArmLength = !1),
			(this.BreakModifyCameraOffset = !1),
			(this.BreakModifyArmRotation = !1),
			(this.BreakModifyFov = !1);
	}
	UpdateBreakModifyInfo() {
		this.Camera.IsModifiedArmLength && (this.BreakModifyArmLength = !0),
			this.Camera.IsModifiedCameraOffset && (this.BreakModifyCameraOffset = !0),
			this.Camera.IsModifiedArmRotation && (this.BreakModifyArmRotation = !0),
			this.Camera.IsModifiedFov && (this.BreakModifyFov = !0);
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.OnChangeRole,
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.OnChangeRole,
		);
	}
	OnInit() {}
	OnEnable() {}
	OnDisable() {}
	UpdateCustomEnableCondition() {
		return !0;
	}
	UpdateInternal(e) {}
	UpdateDeactivateInternal(e) {}
	Lock(e) {
		var t = this.IsActivate;
		this.c1e.add(e), !this.IsActivate && t && this.OnDisable();
	}
	Unlock(e) {
		var t = this.IsActivate;
		this.c1e.delete(e), this.IsActivate && !t && this.OnEnable();
	}
	Update(e) {
		var t = this.IsActivate;
		(this.u1e = this.UpdateCustomEnableCondition()),
			this.IsActivate !== t &&
				(this.IsActivate ? this.OnEnable() : this.OnDisable()),
			this.IsActivate
				? this.UpdateInternal(e)
				: this.UpdateDeactivateInternal(e);
	}
	get IsActivate() {
		return this.u1e && 0 === this.c1e.size;
	}
	GetConfigMapValue(e) {
		return String(this.$.get(e));
	}
}
exports.CameraControllerBase = CameraControllerBase;
