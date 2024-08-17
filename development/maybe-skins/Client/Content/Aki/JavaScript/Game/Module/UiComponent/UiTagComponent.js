"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTagComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class UiTagComponent {
	constructor() {
		(this.PPo = new Map()), (this.xPo = new Map());
	}
	AddTagById(t, ...e) {
		if (void 0 !== t) {
			let o = 0;
			this.PPo.has(t) && (o = this.PPo.get(t)),
				this.PPo.set(t, o + 1),
				this.wPo(t, o, o + 1, ...e);
		}
	}
	ReduceTagById(t, ...e) {
		var o;
		void 0 !== t &&
			this.PPo.has(t) &&
			0 !== (o = this.PPo.get(t)) &&
			(1 === o ? this.PPo.delete(t) : this.PPo.set(t, o - 1),
			this.wPo(t, o, o - 1, ...e));
	}
	RemoveTagById(t, ...e) {
		var o;
		void 0 !== t &&
			this.PPo.has(t) &&
			((o = this.PPo.get(t)), this.PPo.delete(t), this.wPo(t, o, 0, ...e));
	}
	ContainsTagById(t) {
		return this.PPo.has(t);
	}
	ContainsTagByName(t) {
		return (
			!!(t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)) &&
			this.ContainsTagById(t)
		);
	}
	GetTagCountById(t) {
		return void 0 === t ? 0 : this.PPo.get(t) ?? 0;
	}
	wPo(t, e, o, ...s) {
		void 0 !== t &&
			e !== o &&
			(0 === e) != (0 === o) &&
			this.BPo(t, 0 < o, this.xPo.get(t), ...s);
	}
	BPo(t, e, o, ...s) {
		if (void 0 !== t && void 0 !== o) {
			var a = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
			for (const i of [...o])
				try {
					i(t, e, ...s);
				} catch (t) {
					t instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Event",
								44,
								"tag事件回调执行异常",
								t,
								["tag", a],
								["error", t.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								44,
								"tag事件回调执行异常",
								["tag", a],
								["error", t],
							);
				}
		}
	}
	AddListener(t, e) {
		let o = this.xPo.get(t);
		o || this.xPo.set(t, (o = new Set())), o.add(e);
	}
	RemoveListener(t, e) {
		(t = this.xPo.get(t)) && t.delete(e);
	}
	RemoveAllTag() {
		for (const t of this.PPo.keys()) this.RemoveTagById(t);
	}
}
exports.UiTagComponent = UiTagComponent;
