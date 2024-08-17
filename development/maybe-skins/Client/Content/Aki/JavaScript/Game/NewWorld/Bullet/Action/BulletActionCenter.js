"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionContainer = exports.BulletActionCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletActionAfterInit_1 = require("./BulletActionAfterInit"),
	BulletActionAttachActor_1 = require("./BulletActionAttachActor"),
	BulletActionAttachParentEffect_1 = require("./BulletActionAttachParentEffect"),
	BulletActionBase_1 = require("./BulletActionBase"),
	BulletActionChild_1 = require("./BulletActionChild"),
	BulletActionDestroyBullet_1 = require("./BulletActionDestroyBullet"),
	BulletActionInfo_1 = require("./BulletActionInfo"),
	BulletActionInitBullet_1 = require("./BulletActionInitBullet"),
	BulletActionInitCollision_1 = require("./BulletActionInitCollision"),
	BulletActionInitHit_1 = require("./BulletActionInitHit"),
	BulletActionInitMove_1 = require("./BulletActionInitMove"),
	BulletActionInitRender_1 = require("./BulletActionInitRender"),
	BulletActionSummonBullet_1 = require("./BulletActionSummonBullet"),
	BulletActionSummonEntity_1 = require("./BulletActionSummonEntity"),
	BulletActionTimeScale_1 = require("./BulletActionTimeScale"),
	BulletActionUpdateAttackerFrozen_1 = require("./BulletActionUpdateAttackerFrozen"),
	BulletActionUpdateEffect_1 = require("./BulletActionUpdateEffect"),
	BulletActionUpdateLiveTime_1 = require("./BulletActionUpdateLiveTime");
class BulletActionCenter {
	constructor() {
		this.M4o = void 0;
	}
	Init() {
		this.LTe();
	}
	Clear() {
		this.M4o = void 0;
	}
	LTe() {
		(this.M4o = new Array(17)),
			this.IQi(
				0,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionBase_1.BulletActionTest,
			),
			this.IQi(
				1,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionInitBullet_1.BulletActionInitBullet,
			),
			this.IQi(
				2,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionInitHit_1.BulletActionInitHit,
			),
			this.IQi(
				3,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionInitMove_1.BulletActionInitMove,
			),
			this.IQi(
				4,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionInitRender_1.BulletActionInitRender,
				!0,
			),
			this.IQi(
				5,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionTimeScale_1.BulletActionTimeScale,
				!0,
			),
			this.IQi(
				9,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionAfterInit_1.BulletActionAfterInit,
			),
			this.IQi(
				6,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionInitCollision_1.BulletActionInitCollision,
			),
			this.IQi(
				7,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionUpdateEffect_1.BulletActionUpdateEffect,
				!0,
			),
			this.IQi(
				15,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionUpdateAttackerFrozen_1.BulletActionUpdateAttackerFrozen,
				!0,
			),
			this.IQi(
				8,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionUpdateLiveTime_1.BulletActionUpdateLiveTime,
				!0,
			),
			this.IQi(
				10,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionChild_1.BulletActionChild,
				!0,
			),
			this.IQi(
				11,
				BulletActionInfo_1.BulletActionInfoSummonBullet,
				BulletActionSummonBullet_1.BulletActionSummonBullet,
			),
			this.IQi(
				12,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionSummonEntity_1.BulletActionSummonEntity,
			),
			this.IQi(
				13,
				BulletActionInfo_1.BulletActionInfoDestroyBullet,
				BulletActionDestroyBullet_1.BulletActionDestroyBullet,
			),
			this.IQi(
				14,
				BulletActionInfo_1.BulletActionInfoAttachActor,
				BulletActionAttachActor_1.BulletActionAttachActor,
			),
			this.IQi(
				16,
				BulletActionInfo_1.BulletActionInfoSimple,
				BulletActionAttachParentEffect_1.BulletActionAttachParentEffect,
				!0,
			);
	}
	IQi(t, e, i, o = !1) {
		var l;
		this.M4o[t] ||
			((l = new BulletActionContainer()).Init(t, e, i, o), (this.M4o[t] = l));
	}
	GetBulletActionContainer(t) {
		return this.M4o[t];
	}
	CreateBulletActionInfo(t) {
		return this.GetBulletActionContainer(t).GetActionInfo();
	}
	RecycleBulletActionInfo(t) {
		this.GetBulletActionContainer(t.Type).RecycleActionInfo(t);
	}
	CreateBulletAction(t) {
		return this.GetBulletActionContainer(t).GetAction();
	}
	RecycleBulletAction(t) {
		this.GetBulletActionContainer(t.Type).RecycleAction(t);
	}
}
exports.BulletActionCenter = BulletActionCenter;
class BulletActionContainer {
	constructor() {
		(this.S9 = 0),
			(this.S4o = void 0),
			(this.E4o = void 0),
			(this.y4o = !1),
			(this.I4o = void 0),
			(this.DQi = void 0),
			(this.T4o = void 0),
			(this.L4o = void 0),
			(this.D4o = !1);
	}
	Init(t, e, i, o = !1) {
		(this.S9 = t),
			(this.S4o = e),
			(this.E4o = i),
			(this.y4o = o),
			(this.D4o = this.S4o === BulletActionInfo_1.BulletActionInfoSimple),
			(this.I4o = new Array()),
			(this.DQi = new Array()),
			((t = this.R4o()).IsInPool = !0),
			this.DQi.push(t),
			(this.T4o = new Array()),
			(this.L4o = new Array()),
			((e = this.dZ()).IsInPool = !0),
			this.L4o.push(e);
	}
	get ActionType() {
		return this.S9;
	}
	R4o() {
		var t = new this.S4o(this.S9);
		return (t.Index = this.I4o.length), this.I4o.push(t), t;
	}
	GetActionInfo() {
		var t;
		return this.D4o
			? this.DQi[0]
			: this.DQi.length <= 0
				? this.R4o()
				: (((t = this.DQi.pop()).IsInPool = !1), t);
	}
	dZ() {
		var t = new this.E4o(this.S9);
		return (t.Index = this.T4o.length), this.T4o.push(t), t;
	}
	GetAction() {
		var t;
		return this.y4o
			? this.L4o.length <= 0
				? this.dZ()
				: (((t = this.L4o.pop()).IsInPool = !1), t)
			: this.L4o[0];
	}
	RecycleActionInfo(t) {
		this.D4o ||
			(t.IsInPool
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 18, "BulletActionInfo重复入池")
				: (t.Clear(), (t.IsInPool = !0), this.DQi.push(this.I4o[t.Index])));
	}
	RecycleAction(t) {
		var e = t.GetActionInfo();
		if (
			(this.RecycleActionInfo(e),
			t.Clear(),
			BulletConstant_1.BulletConstant.OpenClearCheck)
		) {
			for (const t in e) {
				var i = e[t],
					o = typeof i;
				("number" == o && 0 === i) ||
					("boolean" == o && !1 === i) ||
					(void 0 !== i &&
						"Type" !== t &&
						"Index" !== t &&
						"IsInPool" !== t &&
						"function" != o &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							18,
							"BulletActionInfo回收时，该变量不为undefined",
							["type", e.Type],
							["key", t],
						));
			}
			for (const e in t) {
				var l = t[e],
					n = typeof l;
				("number" == n && 0 === l) ||
					("boolean" == n && !1 === l) ||
					(void 0 !== l &&
						"Type" !== e &&
						"Index" !== e &&
						"IsInPool" !== e &&
						"Stat" !== e &&
						"TickStat" !== e &&
						"function" != n &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							18,
							"BulletAction回收时，该变量不为undefined",
							["type", t.Type],
							["key", e],
						));
			}
		}
		this.y4o &&
			(t.IsInPool
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 18, "BulletAction重复入池")
				: ((t.IsInPool = !0), this.L4o.push(this.T4o[t.Index])));
	}
}
exports.BulletActionContainer = BulletActionContainer;
