"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DebugDrawManager = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../GlobalData"),
	RenderDataManager_1 = require("../Data/RenderDataManager");
class EffectDebugDrawInfo {
	constructor() {
		(this.Index = 0),
			(this.Type = void 0),
			(this.VectorA = void 0),
			(this.ColorA = void 0),
			(this.NumberA = 0),
			(this.BoxA = void 0);
	}
}
class DebugDrawManager {
	constructor() {
		(this.DebugDrawMap = void 0), (this.Counter = 0);
	}
	static EnsureInstance() {
		this.Instance ||
			((this.Instance = new DebugDrawManager()),
			(this.Instance.Counter = 0),
			(this.Instance.DebugDrawMap = new Map()));
	}
	static AddDebugLineFromPlayer(e, a, t) {
		this.EnsureInstance();
		var n = new EffectDebugDrawInfo();
		return (
			(n.Index = this.Instance.Counter),
			(n.Type = 0),
			(n.VectorA = e),
			(n.ColorA = a),
			(n.NumberA = t),
			this.Instance.DebugDrawMap.set(n.Index, n),
			this.Instance.Counter++,
			n.Index
		);
	}
	static AddDebugBox(e, a, t) {
		this.EnsureInstance();
		var n = new EffectDebugDrawInfo();
		return (
			(n.Index = this.Instance.Counter),
			(n.Type = 1),
			(n.ColorA = a),
			(n.NumberA = t),
			(n.BoxA = e),
			this.Instance.DebugDrawMap.set(n.Index, n),
			this.Instance.Counter++,
			n.Index
		);
	}
	static RemoveDebugDraw(e) {
		this.Instance && this.Instance.DebugDrawMap.delete(e);
	}
	static ClearDebugDraw() {
		this.Instance && this.Instance.DebugDrawMap.clear();
	}
	static Initialize() {}
	static Tick(e) {
		this.Instance &&
			this.Instance.DebugDrawMap.forEach((e, a) => {
				switch (e.Type) {
					case 0:
						UE.KismetSystemLibrary.DrawDebugLine(
							GlobalData_1.GlobalData.World,
							RenderDataManager_1.RenderDataManager.Get()
								.GetCurrentCharacterPosition()
								.ToUeVector(),
							e.VectorA.ToUeVector(),
							e.ColorA,
							0.01,
							e.NumberA,
						);
						break;
					case 1:
						UE.KismetSystemLibrary.DrawDebugBox(
							GlobalData_1.GlobalData.World,
							e.BoxA.Min.op_Addition(e.BoxA.Max).op_Division(2),
							e.BoxA.Max.op_Subtraction(e.BoxA.Min).op_Division(2),
							e.ColorA,
							void 0,
							0.01,
							e.NumberA,
						);
				}
			});
	}
	static Destroy() {
		this.Instance && (this.Instance = void 0);
	}
}
(exports.DebugDrawManager = DebugDrawManager).Instance = void 0;
