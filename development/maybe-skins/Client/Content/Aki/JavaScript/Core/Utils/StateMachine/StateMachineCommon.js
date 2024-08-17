"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StateMachineCommon = void 0);
const Log_1 = require("../../Common/Log");
class StateMachineCommon {
	constructor(t, i, s = void 0) {
		(this.Parent = s),
			(this.FirstState = void 0),
			(this.kh = new Map()),
			(this.Gz = !1),
			(this.Nz = !1),
			(this.CurrentNode = void 0),
			(this.Owner = t),
			(this.State = i);
	}
	get HasSubNode() {
		return this.Gz;
	}
	get Activated() {
		return this.Nz;
	}
	get CurrentLeafNode() {
		return this.CurrentNode ? this.CurrentNode.CurrentLeafNode : this;
	}
	get Root() {
		return this.Parent ? this.Parent.Root : this;
	}
	Tick(t) {
		this.CurrentNode && this.CurrentNode.Tick(t), this.OnTick(t);
	}
	Start(...t) {
		this.Parent && (this.Parent.Start(), (this.Parent.CurrentNode = this)),
			this.Enter(void 0, !0, !1, ...t);
	}
	Enter(t, i = !0, s = !0, ...h) {
		(this.Nz = !0),
			this.OnActivate(t, ...h),
			i && this.OnEnter(t, ...h),
			s &&
				this.Gz &&
				this.FirstState &&
				((this.CurrentNode = this.GetState(this.FirstState)),
				this.CurrentNode
					? (this.CurrentNode.Enter(void 0, i, !0, ...h),
						this.OnSwitchState && this.OnSwitchState(void 0, this.CurrentNode))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"StateMachine",
							15,
							"状态机切换失败，子节点查找失败",
						));
	}
	Oz() {
		this.OnReEnter();
	}
	Exit(t = void 0, i = !0, s = !0, ...h) {
		s &&
			this.CurrentNode &&
			(this.OnSwitchState && this.OnSwitchState(this.CurrentNode, void 0),
			this.CurrentNode.Exit(t, i, s, ...h)),
			this.OnDeactivate(t, ...h),
			this.OnExit(t, ...h),
			(this.Nz = !1),
			(this.CurrentNode = void 0);
	}
	Clear() {
		for (const t of this.kh.values()) t.Clear();
		this.OnClear(),
			this.kh.clear(),
			(this.Parent = void 0),
			(this.FirstState = void 0);
	}
	CanReEnter() {
		return !1;
	}
	OnTick(t) {}
	OnEnter(t) {}
	OnReEnter() {}
	OnExit(t) {}
	OnClear() {}
	OnActivate(t) {}
	OnDeactivate(t) {}
	OnSwitchState(t, i) {}
	GetState(t) {
		var i = this.kh.get(t);
		return (
			i ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 12, "状态不存在", ["state", t])),
			i
		);
	}
	AddState(t, i) {
		this.FirstState || (this.FirstState = t);
		i = new i(this.Owner, t, this);
		this.kh.has(t)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("StateMachine", 15, "状态重复添加", ["state", t])
			: this.kh.set(t, i),
			(this.Gz = !0);
	}
	AddStateInstance(t, i) {
		this.FirstState || (this.FirstState = t),
			this.kh.has(t)
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 15, "状态重复添加", ["state", t])
				: this.kh.set(t, i),
			(this.Gz = !0);
	}
	Switch(t, i = !0, s = !0, ...h) {
		var e, o;
		return void 0 === this.CurrentNode
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("StateMachine", 15, "状态机没有启动", ["state", t]),
				!1)
			: (e = this.GetState(t))
				? t === this.CurrentNode.State
					? !!this.CurrentNode.CanReEnter() && (this.CurrentNode.Oz(), !0)
					: ((o = this.CurrentNode).Exit(e, i, s, ...h),
						(this.CurrentNode = e).Enter(o, i, s, ...h),
						this.OnSwitchState && this.OnSwitchState(o, e),
						!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"StateMachine",
							15,
							"状态机切换失败，目标节点不存在",
							["state", t],
						),
					!1);
	}
}
exports.StateMachineCommon = StateMachineCommon;
//# sourceMappingURL=StateMachineCommon.js.map
