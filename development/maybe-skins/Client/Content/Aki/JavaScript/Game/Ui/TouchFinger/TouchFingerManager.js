"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TouchFingerManager = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	TouchFingerData_1 = require("./TouchFingerData"),
	TouchFingerDefine_1 = require("./TouchFingerDefine");
class TouchFingerManager {
	static Initialize() {
		for (
			let e = TouchFingerDefine_1.EFingerIndex.One;
			e < TouchFingerDefine_1.EFingerIndex.Ten;
			e++
		)
			TouchFingerManager.Qmr(e);
	}
	static Qmr(e) {
		var n = new TouchFingerData_1.TouchFingerData(e);
		TouchFingerManager.tCt.set(e, n);
	}
	static GetTouchFingerData(e) {
		return TouchFingerManager.tCt.get(e);
	}
	static StartTouch(e, n) {
		(e = TouchFingerManager.GetTouchFingerData(e)) &&
			!e.IsInTouch() &&
			(TouchFingerManager.CurrentTouchFingerCount++,
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("ControlScreen", 8, "开始触碰屏幕", [
					"FingerCount",
					TouchFingerManager.CurrentTouchFingerCount,
				]),
			e.StartTouch(n));
	}
	static EndTouch(e) {
		(e = TouchFingerManager.GetTouchFingerData(e)) &&
			e.IsInTouch() &&
			((TouchFingerManager.CurrentTouchFingerCount = Math.max(
				TouchFingerManager.CurrentTouchFingerCount - 1,
				0,
			)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("ControlScreen", 8, "结束触碰屏幕", [
					"FingerCount",
					TouchFingerManager.CurrentTouchFingerCount,
				]),
			e) &&
			e.EndTouch();
	}
	static MoveTouch(e, n) {
		(e = TouchFingerManager.GetTouchFingerData(e)) && e.MoveTouch(n);
	}
	static GetTouchPosition(e) {
		if ((e = TouchFingerManager.GetTouchFingerData(e)) && e.IsInTouch())
			return e.GetTouchPosition();
	}
	static GetLastTouchPosition(e) {
		if ((e = TouchFingerManager.GetTouchFingerData(e)) && e.IsInTouch())
			return e.GetLastTouchPosition();
	}
	static GetTouchFingerCount() {
		return TouchFingerManager.CurrentTouchFingerCount;
	}
	static GetFingerExpandCloseValue(e, n) {
		var o, r, t;
		(e = TouchFingerManager.GetTouchFingerData(e)),
			(n = TouchFingerManager.GetTouchFingerData(n));
		return e &&
			n &&
			n.IsInTouch() &&
			n.IsInTouch() &&
			((o = e.GetLastTouchPosition()), (r = n.GetLastTouchPosition()), o) &&
			r &&
			((e = e.GetTouchPosition()), (n = n.GetTouchPosition()), e) &&
			n
			? (t = e.X - n.X) * t +
					(t = e.Y - n.Y) * t +
					(t = e.Z - n.Z) * t -
					((e = o.X - r.X) * e + (n = o.Y - r.Y) * n + (t = o.Z - r.Z) * t)
			: 0;
	}
	static GetFingerExpandCloseType(e, n) {
		let o,
			r = 0;
		(e = TouchFingerManager.GetTouchFingerData(e)),
			(n = TouchFingerManager.GetTouchFingerData(n));
		var t =
				((e && n) || (o = TouchFingerDefine_1.EFingerExpandCloseType.None),
				(n.IsInTouch() && n.IsInTouch()) ||
					(o = TouchFingerDefine_1.EFingerExpandCloseType.None),
				e.GetLastTouchPosition()),
			i = n.GetLastTouchPosition();
		(t && i) || (o = TouchFingerDefine_1.EFingerExpandCloseType.None),
			(e = e.GetTouchPosition()),
			(n = n.GetTouchPosition());
		return (
			(r =
				((e =
					((e && n) || (o = TouchFingerDefine_1.EFingerExpandCloseType.None),
					UE.KismetMathLibrary.Vector_DistanceSquared(e, n))) -
					(n = UE.KismetMathLibrary.Vector_DistanceSquared(t, i))) /
				n),
			e < n && (o = TouchFingerDefine_1.EFingerExpandCloseType.Close),
			n < e && (o = TouchFingerDefine_1.EFingerExpandCloseType.Expand),
			Math.abs(r) <= TouchFingerDefine_1.FINGER_TOUCHDEAD_ZONE &&
				((r = 0), (o = TouchFingerDefine_1.EFingerExpandCloseType.None)),
			{ State: o, ChangeRate: r }
		);
	}
	static GetFingerDirection(e) {
		var n;
		if ((e = TouchFingerManager.GetTouchFingerData(e)) && e.IsInTouch())
			return (n = e.GetLastTouchPosition())
				? { X: (e = e.GetTouchPosition()).X - n.X, Y: e.Y - n.Y }
				: { X: 0, Y: 0 };
	}
}
((exports.TouchFingerManager = TouchFingerManager).tCt = new Map()),
	(TouchFingerManager.CurrentTouchFingerCount = 0);
