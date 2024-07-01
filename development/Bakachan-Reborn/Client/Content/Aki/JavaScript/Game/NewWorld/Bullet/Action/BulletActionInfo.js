"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInfoAttachActor =
		exports.BulletActionInfoDestroyBullet =
		exports.BulletActionInfoSummonBullet =
		exports.BulletActionInfoSimple =
		exports.BulletActionInfoBase =
			void 0);
const Log_1 = require("../../../../Core/Common/Log");
class BulletActionInfoBase {
	constructor(t) {
		(this.IsInPool = !1), (this.Index = 0), (this.Type = t);
	}
	Clear() {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Bullet", 18, "BulletActionInfo need override clear()");
	}
}
class BulletActionInfoSimple extends (exports.BulletActionInfoBase =
	BulletActionInfoBase) {
	Clear() {}
}
exports.BulletActionInfoSimple = BulletActionInfoSimple;
class BulletActionInfoSummonBullet extends BulletActionInfoBase {
	constructor() {
		super(...arguments),
			(this.ChildrenType = void 0),
			(this.Victim = void 0),
			(this.IsStayInCharacter = !1),
			(this.ParentImpactPoint = void 0),
			(this.ParentLastPosition = void 0);
	}
	Clear() {
		(this.ChildrenType = void 0),
			(this.Victim = void 0),
			(this.IsStayInCharacter = !1),
			(this.ParentImpactPoint = void 0),
			(this.ParentLastPosition = void 0);
	}
}
exports.BulletActionInfoSummonBullet = BulletActionInfoSummonBullet;
class BulletActionInfoDestroyBullet extends BulletActionInfoBase {
	constructor() {
		super(...arguments), (this.SummonChild = !1), (this.DestroyReason = void 0);
	}
	Clear() {
		(this.SummonChild = !1), (this.DestroyReason = void 0);
	}
}
exports.BulletActionInfoDestroyBullet = BulletActionInfoDestroyBullet;
class BulletActionInfoAttachActor extends BulletActionInfoBase {
	constructor() {
		super(...arguments),
			(this.IsParentActor = !1),
			(this.Actor = void 0),
			(this.SocketName = void 0),
			(this.LocationRule = void 0),
			(this.RotationRule = void 0),
			(this.ScaleRule = void 0),
			(this.WeldSimulatedBodies = !1);
	}
	Clear() {
		(this.IsParentActor = !1),
			(this.Actor = void 0),
			(this.SocketName = void 0),
			(this.LocationRule = void 0),
			(this.RotationRule = void 0),
			(this.ScaleRule = void 0),
			(this.WeldSimulatedBodies = !1);
	}
}
exports.BulletActionInfoAttachActor = BulletActionInfoAttachActor;
