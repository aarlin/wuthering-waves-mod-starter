"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneComponentPool = void 0);
const MeshComponentUtils_1 = require("./MeshComponentUtils");
class SceneComponentPool {
	constructor() {
		(this.nYo = new Array()),
			(this.sYo = new Array()),
			(this.AttachComponentInternal = void 0),
			(this.ActorInternal = void 0),
			(this.MaxPoolSize = 0);
	}
	ActiveComponent(o) {}
	CleanComponent(o) {}
	CreateComponent() {}
	GetComponents(o, t = !0, e = !1) {
		o = o > this.MaxPoolSize ? this.MaxPoolSize : o;
		let n = t ? 0 : o;
		var s = new Array();
		if (t) {
			let l = o;
			if ((t = this.sYo.length) < o) (l = t), (n = o - t);
			else {
				var h = t - o;
				for (let o = 0; o < h; ++o) {
					var i = this.sYo.pop();
					this.BasePoolPush(i);
				}
			}
			for (let o = 0; o < l; ++o)
				this.PoolPushInternal(this.sYo[o], s, !1),
					e && this.CleanComponent(this.sYo[o]);
		}
		if (0 < n) {
			let o = 0;
			n > (t = this.nYo.length) && ((o = n - t), (n = t));
			for (let o = 0; o < n; ++o) {
				var l = this.nYo.pop();
				this.PoolPushInternal(l, s, !1), this.UsedPoolPush(l);
			}
			for (let t = 0; t < o; ++t) {
				var r = this.CreateComponent();
				this.PoolPushInternal(r, s, !1), this.UsedPoolPush(r);
			}
		}
		for (const o of s) this.ActiveComponent(o);
		return s;
	}
	BackComponent(o) {
		let t = !0;
		for (const n of o) {
			var e;
			this.sYo.concat(n)
				? ((e = this.sYo.indexOf(n)), this.nYo.push(n), this.sYo.slice(e, 1))
				: (t = !1);
		}
		return t;
	}
	Init(o, t, e, n, s = !1, h = !1) {
		if (t && e && 0 < o) {
			(this.ActorInternal = e),
				(this.MaxPoolSize = o),
				(this.AttachComponentInternal = t);
			var i = o < (e = n.length) ? o : e;
			for (let o = 0; o < i; ++o) {
				var l = n[o];
				if (
					(MeshComponentUtils_1.MeshComponentUtils.RelativeAttachComponentOnSafe(
						l,
						this.AttachComponentInternal,
					),
					this.nYo.push(),
					!this.PoolPush(l, s, h))
				)
					break;
			}
		}
	}
	CheckPoolRange() {
		return this.nYo.length + this.sYo.length < this.MaxPoolSize;
	}
	PoolPush(o, t = !1, e = !0) {
		return (
			!!this.CheckPoolRange() &&
			(t ? this.BasePoolPush(o, e) : this.UsedPoolPush(o, e), !0)
		);
	}
	BasePoolPush(o, t = !0) {
		this.PoolPushInternal(o, this.nYo, t);
	}
	UsedPoolPush(o, t = !1) {
		this.PoolPushInternal(o, this.sYo, t);
	}
	PoolPushInternal(o, t, e = !0) {
		t.push(o), e && this.CleanComponent(o);
	}
	Shrink() {
		for (const o of this.nYo) o.K2_DestroyComponent(this.ActorInternal);
		this.nYo.splice(0, this.nYo.length);
	}
	GetUsedLength() {
		return this.sYo.length;
	}
}
exports.SceneComponentPool = SceneComponentPool;
