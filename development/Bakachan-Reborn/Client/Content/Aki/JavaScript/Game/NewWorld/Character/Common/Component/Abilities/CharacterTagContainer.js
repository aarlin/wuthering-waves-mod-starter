"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TagContainer = exports.channelDebugName = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
exports.channelDebugName = {
	1: "Tag",
	2: "Buff",
	3: "关卡服务器",
	4: "动画",
	5: "玩家编队",
	6: "Frozen",
};
class TagContainer {
	constructor() {
		(this.BKo = new Map()),
			(this.bKo = new Map()),
			(this.qKo = new Map()),
			(this.GKo = new Set()),
			(this.NKo = new Set()),
			(this.OKo = void 0);
	}
	GetAllExactTags() {
		return this.bKo.keys();
	}
	GetAllChannels() {
		return this.BKo.keys();
	}
	BindTsTagContainer(t) {
		if ((this.OKo = t)) {
			for (const a of this.bKo.keys()) {
				var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(a);
				e && t.UpdateTagMap(e, this.bKo.get(a) ?? 0);
			}
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Character", 20, "绑定UE Actor并复制Tag", [
					"tags",
					this.bKo,
				]);
		}
	}
	Clear() {
		return (
			this.bKo.clear(),
			this.BKo.clear(),
			this.qKo.clear(),
			this.GKo.clear(),
			this.NKo.clear(),
			!(this.OKo = void 0)
		);
	}
	ClearObject() {
		return this.Clear();
	}
	kKo(t, e) {
		if (!e) return [];
		const a = this.bKo.get(t) ?? 0,
			o = Math.max(0, a + e);
		e = o - a;
		var r = [];
		if (a === o) return [];
		o <= 0 ? this.bKo.delete(t) : this.bKo.set(t, o);
		let s = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(t);
		for (r.push([t, o, a, !0]); s; ) {
			const t = this.qKo.get(s) ?? 0,
				a = Math.max(0, t + e);
			a <= 0 ? this.qKo.delete(s) : this.qKo.set(s, a),
				r.push([s, a, t, !1]),
				(s = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(s));
		}
		return (
			(t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) &&
				this.OKo?.UpdateTagMap(t, e),
			r
		);
	}
	FKo(t) {
		if (t && !(t.length <= 0))
			for (var [e, a, o, r] of t) {
				if (r)
					for (const r of this.NKo)
						try {
							r(e, a, o);
						} catch (t) {
							t instanceof Error
								? Log_1.Log.CheckError() &&
									Log_1.Log.ErrorWithStack(
										"Character",
										20,
										"执行Tag监听回调时出错",
										t,
										["error", t.message],
									)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error("Character", 20, "执行Tag监听回调时出错", [
										"error",
										t,
									]);
						}
				for (const r of this.GKo)
					try {
						r(e, a, o);
					} catch (t) {
						t instanceof Error
							? Log_1.Log.CheckError() &&
								Log_1.Log.ErrorWithStack(
									"Character",
									20,
									"执行Tag监听回调时出错",
									t,
									["error", t.message],
								)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Character", 20, "执行Tag监听回调时出错", [
									"error",
									t,
								]);
					}
			}
	}
	AddExactTag(t, e) {
		let a = this.BKo.get(t);
		a || this.BKo.set(t, (a = new Map())),
			a.set(e, (a.get(e) ?? 0) + 1),
			(t = this.kKo(e, 1)),
			this.FKo(t);
	}
	RemoveTag(t, e) {
		var a = this.BKo.get(t);
		if (a) {
			const i = a.get(e) ?? 0;
			a.delete(e);
			var o = this.kKo(e, -i) ?? [];
			if (0 < this.qKo.get(e)) {
				var r = [];
				for (const t of a.keys())
					GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e) && r.push(t);
				for (const t of r) {
					const e = a.get(t) ?? 0;
					a.delete(t);
					var s = this.kKo(t, -e);
					s && o.push(...s);
				}
			}
			0 === a.size && this.BKo.delete(t), this.FKo(o);
		}
	}
	RemoveExactTag(t, e) {
		var a = this.BKo.get(t);
		if (a) {
			var o = a.get(e) ?? 0;
			let r;
			0 < o && ((r = this.kKo(e, -o)), a.delete(e)),
				0 === a.size && this.BKo.delete(t),
				this.FKo(r);
		}
	}
	UpdateExactTag(t, e, a) {
		let o = this.BKo.get(t);
		if (!o) {
			if (!(0 < a)) return;
			this.BKo.set(t, (o = new Map()));
		}
		var r = o.get(e) ?? 0;
		0 < (a = Math.max(0, r + a)) ? o.set(e, a) : o.delete(e),
			(e = this.kKo(e, a - r));
		0 === o.size && this.BKo.delete(t), this.FKo(e);
	}
	ContainsTag(t) {
		return this.bKo.has(t) || this.qKo.has(t);
	}
	ContainsExactTag(t) {
		return this.bKo.has(t);
	}
	GetRowTagCount(t, e) {
		return this.BKo.get(t)?.get(e) ?? 0;
	}
	GetTagCount(t) {
		return (this.bKo.get(t) ?? 0) + (this.qKo.get(t) ?? 0);
	}
	GetExactTagCount(t) {
		return this.bKo.get(t) ?? 0;
	}
	AddAnyTagListener(t) {
		this.GKo.add(t);
	}
	RemoveAnyTagListener(t) {
		this.GKo.delete(t);
	}
	AddAnyExactTagListener(t) {
		this.NKo.add(t);
	}
	RemoveExactAnyTagListener(t) {
		this.NKo.delete(t);
	}
	GetDebugString() {
		return (
			"汇总tag:\n" +
			this.GetExactTagsDebugString() +
			"\n\n父tag:\n" +
			[...this.qKo.entries()]
				.map(
					([t, e]) =>
						GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` * ${e}\n`,
				)
				.sort((t, e) => t.localeCompare(e))
				.join("")
		);
	}
	GetExactTagsDebugString() {
		return [...this.bKo.entries()]
			.map(([t, e]) => {
				let a =
					GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${e}(`;
				for (const e of this.BKo.keys()) {
					var o = this.BKo.get(e)?.get(t);
					o && (a += exports.channelDebugName[e] + " x " + o);
				}
				return a + ")\n";
			})
			.sort((t, e) => t.localeCompare(e))
			.join("");
	}
}
exports.TagContainer = TagContainer;
