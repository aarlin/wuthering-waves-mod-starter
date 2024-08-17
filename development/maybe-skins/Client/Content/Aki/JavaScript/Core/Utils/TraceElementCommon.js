"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TraceElementCommon = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("./FNameUtil"),
	OPEN_PROFILE_TEST = !0,
	NO_PROFILE_KEY = "";
class TraceElementCommon {
	static LineTrace(t, e) {
		return OPEN_PROFILE_TEST
			? UE.KuroTraceLibrary.LineTrace(t, e)
			: UE.KuroTraceLibrary.LineTrace(t, NO_PROFILE_KEY);
	}
	static BoxTrace(t, e) {
		return OPEN_PROFILE_TEST
			? UE.KuroTraceLibrary.BoxTrace(t, e)
			: UE.KuroTraceLibrary.BoxTrace(t, NO_PROFILE_KEY);
	}
	static CapsuleTrace(t, e) {
		return OPEN_PROFILE_TEST
			? UE.KuroTraceLibrary.CapsuleTrace(t, e)
			: UE.KuroTraceLibrary.CapsuleTrace(t, NO_PROFILE_KEY);
	}
	static SphereTrace(t, e) {
		return OPEN_PROFILE_TEST
			? UE.KuroTraceLibrary.SphereTrace(t, e)
			: UE.KuroTraceLibrary.SphereTrace(t, NO_PROFILE_KEY);
	}
	static ShapeTrace(t, e, E, a) {
		E = FNameUtil_1.FNameUtil.GetDynamicFName(E);
		return OPEN_PROFILE_TEST
			? UE.KuroTraceLibrary.ShapeTrace(t, e, E, a)
			: UE.KuroTraceLibrary.ShapeTrace(t, e, E, NO_PROFILE_KEY);
	}
	static SetStartLocation(t, e) {
		t.SetStartLocation(e.X, e.Y, e.Z);
	}
	static SetEndLocation(t, e) {
		t.SetEndLocation(e.X, e.Y, e.Z);
	}
	static SetTraceColor(t, e) {
		t.SetTraceColor(e.R, e.G, e.B, e.A);
	}
	static SetTraceHitColor(t, e) {
		t.SetTraceHitColor(e.R, e.G, e.B, e.A);
	}
	static SetBoxHalfSize(t, e) {
		t.SetBoxHalfSize(e.X, e.Y, e.Z);
	}
	static SetBoxOrientation(t, e) {
		t.SetBoxOrientation(e.Pitch, e.Yaw, e.Roll);
	}
	static GetHitLocation(t, e, E) {
		t &&
			t.bBlockingHit &&
			((E.X = t.LocationX_Array.Get(e)),
			(E.Y = t.LocationY_Array.Get(e)),
			(E.Z = t.LocationZ_Array.Get(e)));
	}
	static GetImpactPoint(t, e, E) {
		t.bBlockingHit &&
			((E.X = t.ImpactPointX_Array.Get(e)),
			(E.Y = t.ImpactPointY_Array.Get(e)),
			(E.Z = t.ImpactPointZ_Array.Get(e)));
	}
	static GetImpactNormal(t, e, E) {
		t &&
			t.bBlockingHit &&
			((E.X = t.ImpactNormalX_Array.Get(e)),
			(E.Y = t.ImpactNormalY_Array.Get(e)),
			(E.Z = t.ImpactNormalZ_Array.Get(e)));
	}
	static IsHitOthers(E, a, r) {
		if (E.bBlockingHit) {
			var t = E.Actors.Num();
			for (let e = 0; e < t; ++e) {
				let t = E.Actors.Get(e);
				if (t) for (; t; ) t !== a && t !== r && (t = t.GetAttachParentActor());
				return !0;
			}
		}
		return !1;
	}
}
exports.TraceElementCommon = TraceElementCommon;
//# sourceMappingURL=TraceElementCommon.js.map
