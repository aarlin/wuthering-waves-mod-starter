"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PC_CHECK_RANGE = 6e3,
	PC_CHECK_RANGE_SQUARED = 36e6,
	MOBILE_CHECK_RANGE = 3e3,
	MOBILE_CHECK_RANGE_SQUARED = 9e6,
	DITHER_STEP = 0.33,
	DITHER_MAX = 1,
	DITHER_MIN = 0,
	MILLISECOND_TO_SECOND = 0.001;
class SimpleNpcController extends ControllerBase_1.ControllerBase {
	static get wtr() {
		return 0 < this.Btr.size;
	}
	static OnInit() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("UiCommon", 28, "初始化SimpleNpcController"),
			this.OnAddEvents(),
			!0
		);
	}
	static OnClear() {
		return this.OnRemoveEvents(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnReceivePlayerVar,
			SimpleNpcController.btr,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WeatherChange,
				SimpleNpcController.dIe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetImageQuality,
				SimpleNpcController.qtr,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WeatherChange,
			SimpleNpcController.dIe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetImageQuality,
				SimpleNpcController.qtr,
			);
	}
	static OnLeaveLevel() {
		return (
			this.Gtr.clear(), this.Ntr.clear(), this.Otr.clear(), this.ktr.clear(), !0
		);
	}
	static Add(t) {
		this.Gtr.add(t);
		var e = Global_1.Global.BaseCharacter;
		e && this.Ftr(t, e.CharacterActorComponent.ActorLocationProxy, !1),
			this.CheckNpcShowState(t, !0),
			this.Vtr(t);
	}
	static Remove(t) {
		this.Gtr.delete(t),
			this.Ntr.delete(t),
			this.Otr.delete(t),
			this.ktr.delete(t);
	}
	static SetClearOutState(t, e) {
		let r = !1;
		if (
			(e && !this.Btr.has(t)
				? (this.Btr.add(t), (r = !0))
				: !e && this.Btr.has(t) && (this.Btr.delete(t), (r = !0)),
			r)
		)
			for (const t of this.Ntr)
				this.CheckNpcShowState(t, !0, !1), t.ChangeLogicRangeState(!1);
	}
	static OnTick(t) {
		this.Htr(t), this.jtr(t);
	}
	static GetSimpleNpcListByRange(t) {
		var e = new Array(),
			r = Global_1.Global.BaseCharacter;
		if (r) {
			var o = t * t,
				i = r.CharacterActorComponent.ActorLocationProxy;
			for (const t of this.Gtr) {
				var a = t.SelfLocationProxy;
				o < Vector_1.Vector.DistSquared(i, a) || e.push(t);
			}
		}
		return e;
	}
	static Wtr() {
		ModelManager_1.ModelManager.PlatformModel.IsPc()
			? (this.Ktr = 36e6)
			: (this.Ktr = 9e6),
			this.Qtr();
	}
	static UpdateDistanceLogic() {
		var t = Global_1.Global.BaseCharacter;
		if (t) {
			this.gU || (this.Wtr(), (this.gU = !0));
			var e = t.CharacterActorComponent.ActorLocationProxy;
			for (const t of this.Gtr) this.Ftr(t, e);
		}
	}
	static Ftr(t, e, r = !0) {
		var o;
		t.IsNotUnload &&
			((o = t.SelfLocationProxy),
			(e = Vector_1.Vector.DistSquared(e, o)) > this.Ktr
				? this.Xtr(t, !1, r)
				: this.Xtr(t, !0, r),
			(t.TempDistanceSquared = e));
	}
	static Xtr(t, e, r = !0) {
		var o = t.IsInLogicRange;
		t.ChangeLogicRangeState(e),
			o !== e &&
				(t.SetTickEnabled(e),
				t.SetMainShadowEnabled(e),
				!o && e
					? (this.Ntr.add(t), r && this.CheckNpcShowState(t, !1))
					: o && !e && this.Ntr.delete(t));
	}
	static $tr(t) {
		(t.CurDither = 0),
			(t.IsNotUnload = !0),
			t.SetDitherEffect(0, 1),
			this.Otr.add(t),
			this.ktr.delete(t);
	}
	static Ytr(t) {
		(t.CurDither = 1),
			(t.IsNotUnload = !1),
			t.SetDitherEffect(1, 1),
			this.ktr.add(t),
			this.Otr.delete(t);
	}
	static Htr(t) {
		if (!(this.Otr.size <= 0)) {
			let e;
			for (const r of this.Otr)
				(r.CurDither += 0.33 * t * 0.001),
					(r.CurDither = MathUtils_1.MathUtils.Clamp(r.CurDither, 0, 1)),
					r.SetDitherEffect(r.CurDither, 1),
					MathUtils_1.MathUtils.IsNearlyEqual(r.CurDither, 1) &&
						(e = void 0 === e ? [] : e).push(r);
			if (void 0 !== e) for (const t of e) this.Otr.delete(t);
		}
	}
	static jtr(t) {
		if (!(this.ktr.size <= 0)) {
			let e;
			for (const r of this.ktr)
				(r.CurDither -= 0.33 * t * 0.001),
					(r.CurDither = MathUtils_1.MathUtils.Clamp(r.CurDither, 0, 1)),
					r.SetDitherEffect(r.CurDither, 1),
					MathUtils_1.MathUtils.IsNearlyEqual(r.CurDither, 0) &&
						(e = void 0 === e ? [] : e).push(r);
			if (void 0 !== e) for (const t of e) this.ktr.delete(t);
		}
	}
	static Jtr(t, e) {
		(t.CurDither = e ? 1 : 0),
			(t.IsNotUnload = e),
			t.SetDitherEffect(t.CurDither, 1),
			this.Otr.delete(t),
			this.ktr.delete(t);
	}
	static CheckNpcShowState(t, e, r = !0) {
		var o = !this.wtr && this.ztr(t);
		(o && !t.IsLodShow) ||
			(r
				? e
					? o
						? this.$tr(t)
						: this.Jtr(t, o)
					: t.IsNotUnload && !o
						? this.Ytr(t)
						: !t.IsNotUnload && o && this.$tr(t)
				: this.Jtr(t, o));
	}
	static ztr(t) {
		var e = ModelManager_1.ModelManager.WeatherModel;
		if (!e) return !0;
		let r = !0;
		switch (e.CurrentWeatherId) {
			case 1:
				t.DisappearOnSunny && (r = !1);
				break;
			case 2:
				t.DisappearOnCloudy && (r = !1);
				break;
			case 3:
				t.DisappearOnRainy && (r = !1);
				break;
			case 4:
				t.DisappearOnThunderRain && (r = !1);
				break;
			case 5:
				t.DisappearOnSnowy && (r = !1);
		}
		return r;
	}
	static Ztr() {
		for (const t of this.Gtr)
			t.FilterFlowWorldState(
				ModelManager_1.ModelManager.WorldModel.WorldStateMap,
			);
	}
	static Qtr() {
		for (const t of this.Gtr) this.Vtr(t);
	}
	static Vtr(t) {
		t.IsLodShow
			? t.IsNotUnload || this.$tr(t)
			: t.IsNotUnload && (this.Ytr(t), t.ChangeLogicRangeState(!1));
	}
}
((exports.SimpleNpcController = SimpleNpcController).Gtr = new Set()),
	(SimpleNpcController.Ntr = new Set()),
	(SimpleNpcController.Otr = new Set()),
	(SimpleNpcController.ktr = new Set()),
	(SimpleNpcController.Btr = new Set()),
	(SimpleNpcController.Ktr = 0),
	(SimpleNpcController.gU = !1),
	(SimpleNpcController.dIe = () => {
		for (const t of SimpleNpcController.Ntr)
			SimpleNpcController.CheckNpcShowState(t, !1);
	}),
	(SimpleNpcController.btr = () => {
		SimpleNpcController.Ztr();
	}),
	(SimpleNpcController.qtr = () => {
		SimpleNpcController.Qtr();
	});
