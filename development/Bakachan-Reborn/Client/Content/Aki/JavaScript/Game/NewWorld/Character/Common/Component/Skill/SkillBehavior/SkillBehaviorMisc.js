"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.compare =
		exports.getValidLocation =
		exports.downTrace =
		exports.forwardTrace =
		exports.getLocationAndDirection =
		exports.getEndSkillBehaviorParamList =
		exports.CONTEXT =
		exports.paramMap =
		exports.angles =
		exports.queryExtent =
			void 0);
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
	ColorUtils_1 = require("../../../../../../Utils/ColorUtils"),
	CharacterActorComponent_1 = require("../../CharacterActorComponent");
let forwardLineTrace, downLineTrace;
(exports.queryExtent = new UE.Vector(1, 1, 500)),
	(exports.angles = [0, 270, 90, 180]),
	(exports.paramMap = new Map()),
	(exports.CONTEXT = "SkillBehaviorAction.SetLocation");
const tempVector = Vector_1.Vector.Create();
function getEndSkillBehaviorParamList(e) {
	return (
		exports.paramMap.has(e) || exports.paramMap.set(e, []),
		exports.paramMap.get(e)
	);
}
function getLocationAndDirection(e) {
	return [e.K2_GetActorLocation(), e.GetActorForwardVector()];
}
function setupLineTrace(e, r, t, o) {
	(e.bIsSingle = !0),
		(e.bIgnoreSelf = !0),
		(e.DrawTime = 5),
		TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, r),
		TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, t),
		o instanceof Array
			? o.forEach((r) => {
					e.AddObjectTypeQuery(r);
				})
			: e.SetTraceTypeQuery(o);
}
function getLineTrace(e, r, t) {
	let o;
	return (
		0 === t
			? (downLineTrace ||
					setupLineTrace(
						(downLineTrace = UE.NewObject(UE.TraceLineElement.StaticClass())),
						ColorUtils_1.ColorUtils.LinearBlue,
						ColorUtils_1.ColorUtils.LinearYellow,
						QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
					),
				(o = downLineTrace))
			: 1 === t &&
				(forwardLineTrace ||
					setupLineTrace(
						(forwardLineTrace = UE.NewObject(
							UE.TraceLineElement.StaticClass(),
						)),
						ColorUtils_1.ColorUtils.LinearGreen,
						ColorUtils_1.ColorUtils.LinearRed,
						[
							QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
							QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
							QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet,
						],
					),
				(o = forwardLineTrace)),
		r ? o.SetDrawDebugTrace(2) : o.SetDrawDebugTrace(0),
		(o.WorldContextObject = e),
		o.ClearCacheData(),
		o
	);
}
function backward(e, r, t, o) {
	var a = tempVector;
	t.Subtraction(r, a), a.Normalize(), a.Multiply(e, a), o.Subtraction(a, o);
}
function forwardTrace(e, r, t, o) {
	o = getLineTrace(e.Actor, o, 1);
	var a =
		(TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
		TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, t),
		TraceElementCommon_1.TraceElementCommon.LineTrace(
			o,
			exports.CONTEXT + ".ForwardTrace",
		));
	o = o.HitResult;
	return a && o.bBlockingHit
		? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(o, 0, t),
			r.Equals(t) ? void 0 : (backward(e.ScaledRadius, r, t, t), [!0, t]))
		: [!1, t];
}
function downTrace(e, r, t) {
	var o = tempVector;
	o.Set(r.X, r.Y, r.Z + CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
		(t = getLineTrace(e.Actor, t, 0)),
		TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, r),
		TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, o),
		(r = TraceElementCommon_1.TraceElementCommon.LineTrace(
			t,
			exports.CONTEXT + ".DownTrace",
		)),
		(t = t.HitResult);
	return r && t.bBlockingHit
		? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, o),
			(o.Z += e.ScaledHalfHeight),
			[!0, o])
		: [!1, void 0];
}
function getValidLocation(e, r, t, o, a) {
	return Vector_1.Vector.Distance(r, t) < e.ScaledRadius
		? (backward(e.ScaledRadius, r, t, r), r)
		: (r.Addition(t, o).Division(2, o),
			(downTrace(e, o, a)[0] ? r : t).DeepCopy(o),
			getValidLocation(e, r, t, o, a));
}
function compare(e, r, t, o, a) {
	switch (e) {
		case 0:
			return t < r;
		case 1:
			return t <= r;
		case 2:
			return r === t;
		case 3:
			return r < t;
		case 4:
			return r <= t;
		case 5:
			return o <= r && r <= a;
		default:
			return !1;
	}
}
(exports.getEndSkillBehaviorParamList = getEndSkillBehaviorParamList),
	(exports.getLocationAndDirection = getLocationAndDirection),
	(exports.forwardTrace = forwardTrace),
	(exports.downTrace = downTrace),
	(exports.getValidLocation = getValidLocation),
	(exports.compare = compare);
