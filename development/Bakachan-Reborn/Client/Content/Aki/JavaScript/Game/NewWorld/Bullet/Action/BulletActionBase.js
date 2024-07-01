"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionTest = exports.BulletActionBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	BulletConstant_1 = require("../BulletConstant");
class BulletActionBase {
	constructor(t) {
		(this.IsInPool = !1),
			(this.Index = 0),
			(this.IsFinish = !1),
			(this.BulletInfo = void 0),
			(this.ActionInfo = void 0),
			(this.gW = void 0),
			(this.Type = t),
			BulletConstant_1.BulletConstant.OpenAllActionStat && (this.gW = void 0);
	}
	Execute(t, e) {
		(this.BulletInfo = t), (this.ActionInfo = e), this.OnExecute();
	}
	OnExecute() {}
	Tick(t) {
		this.OnTick(t);
	}
	OnTick(t) {}
	AfterTick(t) {}
	GetActionInfo() {
		return this.ActionInfo;
	}
	Clear() {
		(this.IsFinish = !1),
			(this.BulletInfo = void 0),
			(this.ActionInfo = void 0);
	}
}
class BulletActionTest extends (exports.BulletActionBase = BulletActionBase) {
	OnExecute() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Bullet", 18, "BulletActionTest", [
				"BulletId",
				this.BulletInfo.BulletRowName,
			]);
	}
}
exports.BulletActionTest = BulletActionTest;
