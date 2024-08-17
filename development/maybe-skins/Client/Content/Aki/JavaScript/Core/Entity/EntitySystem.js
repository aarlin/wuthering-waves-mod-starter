"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntitySystem = void 0);
const Stats_1 = require("../Common/Stats"),
	GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
	ObjectSystem_1 = require("../Object/ObjectSystem"),
	BINARY_SEARCH_THREADHOLD = 4;
class TickEntityGroup {
	constructor(t) {
		(this.Priority = t), (this.Entities = new Map());
	}
}
class TickEntityManager {
	constructor() {
		(this.jW = new Map()),
			(this.WW = new Array()),
			(this.KW = new Map()),
			(this.QW = !1),
			(this.XW = new Array()),
			(this.$W = new Array());
	}
	Add(t, e) {
		this.KW.set(t.Id, e), this.QW ? this.XW.push(t) : this.YW(t, e);
	}
	YW(t, e) {
		let i = this.jW.get(e);
		i ||
			((i = new TickEntityGroup(e)),
			this.jW.set(e, i),
			this.WW.splice(this.JW(e), 0, i)),
			i.Entities.set(t.Id, t);
	}
	JW(e) {
		var i = this.WW.length;
		if (i < BINARY_SEARCH_THREADHOLD) {
			for (let t = 0; t < i; ++t) if (this.WW[t].Priority < e) return t;
			return i;
		}
		if (this.WW[0].Priority < e) return 0;
		let t = 0,
			s = i;
		for (; 1 < s - t; ) {
			var r = (t + s) >> 1;
			this.WW[r].Priority > e ? (t = r) : (s = r);
		}
		return s;
	}
	Delete(t) {
		var e = this.KW.get(t);
		void 0 !== e && (this.QW ? this.$W.push(t) : this.zW(t, e));
	}
	zW(t, e) {
		this.KW.delete(t), this.jW.get(e).Entities.delete(t);
	}
	ForceTick(t) {
		this.QW = !0;
		for (const e of this.WW)
			for (const i of e.Entities.values())
				i.Valid && i.IsInit && i.ForceTick(t);
		(this.QW = !1), this.eK();
	}
	Tick(t) {
		if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
			this.QW = !0;
			for (const e of this.WW)
				for (const i of e.Entities.values()) i.Valid && i.IsInit && i.Tick(t);
			(this.QW = !1), this.eK();
		}
	}
	ForceAfterTick(t) {
		this.QW = !0;
		for (const e of this.WW)
			for (const i of e.Entities.values())
				i.Valid && i.IsInit && i.ForceAfterTick(t);
		(this.QW = !1), this.eK();
	}
	AfterTick(t) {
		if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
			this.QW = !0;
			for (const e of this.WW)
				for (const i of e.Entities.values())
					i.Valid && i.IsInit && i.AfterTick(t);
			(this.QW = !1), this.eK();
		}
	}
	eK() {
		for (const i of this.XW) {
			var t;
			i.Valid && void 0 !== (t = this.KW.get(i.Id)) && this.YW(i, t);
		}
		this.XW.length = 0;
		for (const s of this.$W) {
			var e = this.KW.get(s);
			void 0 !== e && this.zW(s, e);
		}
		this.$W.length = 0;
	}
	Clear() {
		this.jW.clear(), (this.WW.length = 0);
	}
}
(TickEntityManager.ZW = void 0),
	(TickEntityManager.gW = void 0),
	(TickEntityManager.tK = void 0),
	(TickEntityManager.fW = void 0);
class EntitySystem {
	constructor() {}
	static Initialize() {
		return this.iK.Clear(), this.oK.Clear(), !0;
	}
	static Create(t, e = 0, i) {
		t = ObjectSystem_1.ObjectSystem.Create(t);
		if (t.Create(i))
			return (
				t.TickComponentManager.NeedTick && this.iK.Add(t, e),
				t.TickComponentManager.NeedAfterTick && this.oK.Add(t, e),
				t
			);
		ObjectSystem_1.ObjectSystem.Destroy(t);
	}
	static CreateExternal(t, e, i = 0, s) {
		return (
			!!ObjectSystem_1.ObjectSystem.CreateExternal(e) &&
			(e.Create(s)
				? (e.TickComponentManager.NeedTick && this.iK.Add(e, i),
					e.TickComponentManager.NeedAfterTick && this.oK.Add(e, i),
					!0)
				: (ObjectSystem_1.ObjectSystem.Destroy(e), !1))
		);
	}
	static Respawn(t, e = !1, i = 0, s) {
		return !(
			(!e && !ObjectSystem_1.ObjectSystem.CreateExternal(t)) ||
			!t.Respawn(s) ||
			(t.TickComponentManager.NeedTick && this.iK.Add(t, i),
			t.TickComponentManager.NeedAfterTick && this.oK.Add(t, i),
			0)
		);
	}
	static InitData(t, e) {
		return t.InitData(e);
	}
	static Init(t) {
		return !!t.Init() || (ObjectSystem_1.ObjectSystem.Destroy(t), !1);
	}
	static Start(t) {
		return !!t.Start() || (ObjectSystem_1.ObjectSystem.Destroy(t), !1);
	}
	static Activate(t) {
		t.Activate();
	}
	static Destroy(t) {
		return !(
			!ObjectSystem_1.ObjectSystem.Destroy(t) ||
			(GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				t.UnregisterFromGameBudgetController(),
			t.TickComponentManager.NeedTick && this.iK.Delete(t.Id),
			t.TickComponentManager.NeedAfterTick && this.oK.Delete(t.Id),
			!t.End()) ||
			!t.Clear()
		);
	}
	static DeSpawn(t) {
		return !(
			!ObjectSystem_1.ObjectSystem.Destroy(t) ||
			(GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
				t.UnregisterFromGameBudgetController(),
			t.TickComponentManager.NeedTick && this.iK.Delete(t.Id),
			t.TickComponentManager.NeedAfterTick && this.oK.Delete(t.Id),
			!t.End()) ||
			!t.Clear()
		);
	}
	static Get(t) {
		var e =
			ObjectSystem_1.ObjectSystem.Objects[
				t >>> ObjectSystem_1.ObjectSystem.VersionDigit
			];
		if (e && e.Id === t) return e;
	}
	static GetComponent(t, e) {
		return this.Get(t)?.GetComponent(e);
	}
	static ForceTick(t) {
		this.iK.ForceTick(t);
	}
	static Tick(t) {
		this.iK.Tick(t);
	}
	static ForceAfterTick(t) {
		this.iK.ForceAfterTick(t);
	}
	static AfterTick(t) {
		this.oK.AfterTick(t);
	}
}
((exports.EntitySystem = EntitySystem).iK = new TickEntityManager()),
	(EntitySystem.oK = new TickEntityManager());
//# sourceMappingURL=EntitySystem.js.map
