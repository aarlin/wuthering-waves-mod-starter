"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProxyLru = void 0);
const Log_1 = require("../Common/Log"),
	Lru_1 = require("./Lru");
class ProxyLru {
	constructor(t, e, r = void 0, i = void 0) {
		(this.G9 = void 0),
			(this.L7 = new WeakMap()),
			(this.D7 = new WeakMap()),
			(this.R7 = void 0),
			(this.U7 = !0),
			(this.A7 = {
				has: (t, e) => Reflect.has(t, e),
				ownKeys: (t) => Reflect.ownKeys(t),
				get: (t, e, r) => {
					var i,
						e = Reflect.get(t, e);
					return (
						e &&
						("object" == (i = typeof e)
							? this.P7(t, r, e)
							: "function" == i
								? this.x7(t, r, e)
								: e)
					);
				},
				deleteProperty: (t, e) => (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Core",
							1,
							"容器中的对象不允许删除属性",
							["target", t],
							["property", e],
						),
					!1
				),
				isExtensible: (t) => (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 1, "容器中的对象不允许扩展", ["target", t]),
					!1
				),
				preventExtensions: (t) => (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 1, "容器中的对象不允许阻止扩展", [
							"target",
							t,
						]),
					!1
				),
				getPrototypeOf: (t) => Reflect.getPrototypeOf(t),
				setPrototypeOf: (t, e) => (
					e
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Core",
								1,
								"容器中的对象不允许修改原型",
								["target", t],
								["prototype", e],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 1, "容器中的对象不允许修改原型", [
								"target",
								t,
							]),
					!1
				),
			}),
			(this.G9 = new Lru_1.Lru(t, e, r)),
			(this.R7 = i),
			(this.U7 = ProxyLru.ProxyLruEnable);
	}
	get Enable() {
		return this.G9.Enable;
	}
	set Enable(t) {
		this.G9.Enable = t;
	}
	get Size() {
		return this.G9.Size;
	}
	get Capacity() {
		return this.G9.Capacity;
	}
	set Capacity(t) {
		this.G9.Capacity = t;
	}
	get HitRate() {
		return this.G9.HitRate;
	}
	get UsedAvg() {
		return this.G9.UsedAvg;
	}
	get ThresholdUsedRate() {
		return this.G9.ThresholdUsedRate;
	}
	Create(t) {
		return this.U7 ? this.w7(t, this.G9.Create(t)) : this.G9.Create(t);
	}
	Get(t) {
		var e = this.G9.Get(t);
		return this.U7 && e ? this.w7(t, e) : e;
	}
	Put(t) {
		if (this.U7) {
			var e = this.L7.get(t);
			if (!e)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 1, "对象不在维护列表中", ["value", t]),
					!1
				);
			var r = this.D7.get(t);
			if (!r)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 1, "对象不存在所属代理表", ["value", t]),
					!1
				);
			this.D7.delete(t);
			for (const i of r.values()) this.D7.delete(i.proxy), i.revoke();
			return r.clear(), e.revoke(), this.L7.delete(t), this.G9.Put(e.Value);
		}
		return this.G9.Put(t);
	}
	Clear() {
		this.G9.Clear();
	}
	w7(t, e) {
		var r = Proxy.revocable(e, this.A7),
			t = ((r.Key = t), (r.Value = e), r.proxy);
		return this.L7.set(t, r), this.D7.set(t, new Map()), t;
	}
	P7(t, e, r) {
		if (this.D7.has(r)) return r;
		var i = this.D7.get(e);
		if (i) {
			var o = i.get(r);
			if (!o) {
				if (!this.R7?.(t, r)) return r;
				(o = Proxy.revocable(r, this.A7)), i.set(r, o), this.D7.set(o.proxy, i);
			}
			return o.proxy;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Core", 1, "对象不存在所属代理表", ["receiver", e]);
	}
	x7(r, i, o) {
		return (...t) => {
			var e,
				t = Reflect.apply(o, r, t);
			return (
				t &&
				("object" == (e = typeof t)
					? this.P7(r, i, t)
					: "function" == e
						? this.x7(r, i, t)
						: t)
			);
		};
	}
	GetCount(t) {
		return this.G9.GetCount(t);
	}
}
(exports.ProxyLru = ProxyLru).ProxyLruEnable = !1;
//# sourceMappingURL=ProxyLru.js.map
