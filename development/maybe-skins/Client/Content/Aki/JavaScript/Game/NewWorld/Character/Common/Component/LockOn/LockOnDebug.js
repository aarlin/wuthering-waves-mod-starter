"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockOnDebug = exports.LockOnDebugData = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ARROW_SIZE = 15;
class LockOnDebugData {
	constructor(e) {
		(this.LAe = e),
			(this.ShowTip = void 0),
			(this.ColorType = 1),
			(this.Due = Vector_1.Vector.Create());
	}
	DrawDebug(e) {
		var t = EntitySystem_1.EntitySystem.Get(this.LAe.EntityHandle.Id);
		let o;
		switch (
			(this.LAe.SocketName
				? this.Due.DeepCopy(this.eYo(t, this.LAe.SocketName)?.GetLocation())
				: this.Due.DeepCopy(t.GetComponent(1).ActorLocationProxy),
			this.ColorType)
		) {
			case 0:
				o = LockOnDebugData.tYo;
				break;
			case 2:
				o = LockOnDebugData.iYo;
				break;
			case 1:
				o = LockOnDebugData.Rut;
				break;
			case 3:
				o = LockOnDebugData.oYo;
		}
		UE.KismetSystemLibrary.DrawDebugArrow(
			GlobalData_1.GlobalData.World,
			e.GetComponent(1)?.ActorLocationProxy.ToUeVector(),
			this.Due.ToUeVector(),
			15,
			o,
		),
			this.ShowTip &&
				UE.KismetSystemLibrary.DrawDebugString(
					GlobalData_1.GlobalData.World,
					this.Due.ToUeVector(),
					this.ShowTip,
					void 0,
					o,
				);
	}
	eYo(e, t) {
		e = e.GetComponent(3)?.Actor;
		return e?.IsValid() &&
			t &&
			((e = e.Mesh),
			(t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
			e?.DoesSocketExist(t))
			? e.GetSocketTransform(t, 0)
			: MathUtils_1.MathUtils.DefaultTransform;
	}
}
((exports.LockOnDebugData = LockOnDebugData).tYo = new UE.LinearColor(
	1,
	0,
	0,
	1,
)),
	(LockOnDebugData.Rut = new UE.LinearColor(0, 1, 0, 1)),
	(LockOnDebugData.iYo = new UE.LinearColor(0, 0, 1, 1)),
	(LockOnDebugData.oYo = new UE.LinearColor(1, 1, 0, 1));
class LockOnDebug {
	static Clear() {
		LockOnDebug.rYo.clear();
	}
	static Push(e) {
		var t;
		LockOnDebug.IsShowDebugLine &&
			((t = new LockOnDebugData(e)), LockOnDebug.rYo.set(e, t));
	}
	static SetDebugString(e, t, o, a, r) {
		LockOnDebug.IsShowDebugLine &&
			(e = LockOnDebug.rYo.get(e)) &&
			((e.ShowTip =
				"角度：" + t + "\n距离：" + o + "\n移动方向：" + a.ToString()),
			r) &&
			(e.ShowTip += "\n实际方向：" + r.ToString());
	}
	static SetDebugArrow(e) {
		LockOnDebug.IsShowDebugLine &&
			(e = LockOnDebug.rYo.get(e)) &&
			(e.ColorType = 0);
	}
	static Tick(e) {
		if (LockOnDebug.IsShowDebugLine)
			for (var [t, o] of LockOnDebug.rYo)
				t.EntityHandle?.Valid ? o.DrawDebug(e) : LockOnDebug.rYo.delete(t);
	}
}
((exports.LockOnDebug = LockOnDebug).IsShowDebugLine = !1),
	(LockOnDebug.rYo = new Map());
