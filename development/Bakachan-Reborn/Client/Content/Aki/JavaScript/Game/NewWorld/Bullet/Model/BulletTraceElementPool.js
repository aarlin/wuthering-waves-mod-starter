"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletTraceElementPool = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../Utils/ColorUtils");
class BulletTraceElementPool {
	static GetTraceBoxElement(e, t, r) {
		return this.UHo(UE.TraceBoxElement.StaticClass(), this.AHo, e, t, r);
	}
	static GetTraceLineElement(e, t, r) {
		return this.UHo(UE.TraceLineElement.StaticClass(), this.PHo, e, t, r);
	}
	static GetTraceSphereElement(e, t, r) {
		return this.UHo(UE.TraceSphereElement.StaticClass(), this.xHo, e, t, r);
	}
	static UHo(e, t, r, l, o) {
		if (0 < t.length) {
			const e = t.pop();
			(t = UE.NewArray(UE.BuiltinByte)), (t = (0, puerts_1.$ref)(t));
			e.SetObjectTypesQuery(t);
			for (let t = 0, l = r.Num(); t < l; t++) {
				var a = r.Get(t);
				o?.has(a) || e.AddObjectTypeQuery(a);
			}
			return (
				Info_1.Info.IsBuildDevelopmentOrDebug &&
					((t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l)),
					e.SetDrawDebugTrace(t ? 2 : 0),
					t) &&
					(TraceElementCommon_1.TraceElementCommon.SetTraceColor(
						e,
						ColorUtils_1.ColorUtils.LinearGreen,
					),
					TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
						e,
						ColorUtils_1.ColorUtils.LinearRed,
					)),
				e
			);
		}
		const n = this.wHo(e, r, o);
		return (
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				((t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l)),
				n.SetDrawDebugTrace(t ? 2 : 0),
				t) &&
				(TraceElementCommon_1.TraceElementCommon.SetTraceColor(
					n,
					ColorUtils_1.ColorUtils.LinearGreen,
				),
				TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
					n,
					ColorUtils_1.ColorUtils.LinearRed,
				)),
			n
		);
	}
	static RecycleTraceBoxElement(e) {
		e && (e.ClearCacheData(), this.AHo.push(e));
	}
	static RecycleTraceLineElement(e) {
		e && (e.ClearCacheData(), this.PHo.push(e));
	}
	static RecycleTraceSphereElement(e) {
		e && (e.ClearCacheData(), this.xHo.push(e));
	}
	static wHo(e, t, r, l = !1) {
		var o = UE.NewObject(e);
		o.WorldContextObject = GlobalData_1.GlobalData.World;
		for (let e = 0, l = t.Num(); e < l; e++) {
			var a = t.Get(e);
			r?.has(a) || o.AddObjectTypeQuery(a);
		}
		return (o.bTraceComplex = !1), (o.bIgnoreSelf = !0), (o.bIsSingle = l), o;
	}
	static NewTraceElementByTraceChannel(e, t, r = !1) {
		return (
			((e = UE.NewObject(e)).WorldContextObject =
				GlobalData_1.GlobalData.World),
			e.SetTraceTypeQuery(t),
			(e.bTraceComplex = !1),
			(e.bIgnoreSelf = !0),
			(e.bIsSingle = r),
			e
		);
	}
	static Clear() {
		(this.AHo.length = 0), (this.PHo.length = 0), (this.xHo.length = 0);
	}
}
((exports.BulletTraceElementPool = BulletTraceElementPool).AHo = new Array()),
	(BulletTraceElementPool.PHo = new Array()),
	(BulletTraceElementPool.xHo = new Array());
